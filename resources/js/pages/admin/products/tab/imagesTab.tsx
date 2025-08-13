import { useState, FormEvent, useEffect, useRef, MouseEvent } from 'react';
import { router, useForm } from '@inertiajs/react';

import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';

interface ProductImage {
    id?: number; 
    product_id?: number | null;
    product_variant_id?: number | null;
    image: string;
    order?: number;
    is_thumbnail?: boolean;
    created_at?: string;
    updated_at?: string;
}

interface ImagesTabProps {
    productId?: number; // O ID do produto é opcional para o formulário de criação
    existingImages: ProductImage[];
}

export default function ImagesTab({ productId, existingImages }: ImagesTabProps) {
    const { data, setData, post, delete: deleteImage, processing, errors, reset } = useForm({
        images: [] as File[],
    });

    // IMAGEM JÁ CADASTRADA *****************
    const [imagesWithOrder, setImagesWithOrder] = useState<ProductImage[]>(existingImages);
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
    const [reorder, setReorder] = useState(false)
    
    useEffect(() => {
        setImagesWithOrder(existingImages);
    }, [existingImages]); // O array de dependências monitora a mudança dos props

    const handleDeleteExistImage = (imageId: number) => {
        // retira a imagem da lista 
        deleteImage(route('admin.products.images.delete',{ product: productId, image: imageId }), {
             onSuccess: () => {
                // 💡 Aqui você pode fazer algo antes de recarregar
                setImagesWithOrder(existingImages.filter(image => image.id !== imageId));
            },
        });
    };

    const handleOrderChange = (imageId: number, order: number) => {
        setImagesWithOrder(prevImages =>
            prevImages.map(img => 
                img.id === imageId ? { ...img, order: order } : img
            )
        );
        setReorder(true)
       
    };

    const handleSaveOrderImages = () => {
        const dataToSend = imagesWithOrder.map(image => ({
            id: image.id,
            order: image.order,
            product_id: image.product_id
        }))

        router.put(route('admin.products.images.reorder', {product: productId}),{
            image_ids: dataToSend,
        },{
            onSuccess: () => {
                console.log('order alterados!!')
                setReorder(false)
                router.reload()
            }
        });
    }
    
    //*************************************************** */
    // NOVA IMAGEM ****
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Cria URLs de preview quando os arquivos são selecionados
    useEffect(() => {
        if (data.images.length > 0) {
            const urls = data.images.map(image => URL.createObjectURL(image));
            setImagePreviews(urls);
            // Limpeza: revoga as URLs para evitar vazamento de memória
            return () => urls.forEach(url => URL.revokeObjectURL(url));
        } else {
            setImagePreviews([]);
        }
    }, [data.images]);

    const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
        const newFiles = (e.currentTarget as HTMLInputElement).files;
        if(!newFiles) return;

        const filesToAdd: File[] = [];
        const existingFileNamesAndSizes = data.images.map(file => ({ name: file.name, size: file.size }));
        
        for (const newFile of Array.from(newFiles)) {
            // 💡 Verifica se o arquivo já existe no array
            const isDuplicate = existingFileNamesAndSizes.some(
                existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size
            );

            if (!isDuplicate) {
                filesToAdd.push(newFile);
            }
        }
        
        setData('images', [...data.images, ...filesToAdd]);
    };

    const handleRemoveImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        setData('images', newImages);
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (data.images.length > 0) {
            post(route('admin.products.images.store', { product: productId }), {
                onSuccess: () => {
                    reset('images');
                },
            });
        }
    };

    return (
        <div>
            {/* Lista de Imagens Existentes */}
            <div className="mb-8">
                <div className='flex items-center gap-2.5'>
                    <h5 className="font-medium text-gray-700 mb-2">Imagens Cadastradas</h5>
                    { reorder && (
                        <Button
                            type="button"
                            className='cursor-pointer'
                            onClick={() => handleSaveOrderImages()}
                        >
                            Reordenar
                        </Button>
                    )}
                </div>
                <div className="flex flex-wrap gap-4 mt-2.5">
                    <>
                    {imagesWithOrder.length > 0 ? (
                        <>
                        { imagesWithOrder.map((image) => (
                            <div key={image.id}>
                            <div key={image.id} className={`relative w-32 h-32 border rounded-md overflow-hidden ${imagesToDelete.includes(image.id!) ? 'opacity-50' : ''}`}>
                                {/* <img src={`/storage/images/${image.image.replace('public/', '')}`} alt={`Produto ${image.id!}`} className="w-full h-full object-cover" /> */}
                                <img src={`/storage/${image.image}`} alt={`Produto ${image.id!}`} className="w-full h-full object-cover" />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className="cursor-pointer absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                        &times;
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta ação não pode ser desfeita. Isso irá deletar permanentemente esta "*imagem*" do banco de dados.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction 
                                                onClick={() => handleDeleteExistImage(image.id!)}
                                                className="bg-amber-800 hover:bg-amber-600">
                                                Deletar
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                            <div className='flex items-center w-32 gap-1 mt-1'>
                                <Label htmlFor={`image_order${image.id}`}>Order:</Label>
                                 <Input
                                    id={`image_order${image.id}`}
                                    type="number"
                                    value={image.order ?? 0}
                                    onChange={(e) => handleOrderChange(image.id!, parseInt(e.target.value))}
                                />
                            </div>

                            </div>
                        ))}
                        </>
                    ):(
                        <p className='text-sm text-gray-500'>Nenhuma imagem cadastrada!</p>
                    )}
                    </>
                </div>
            </div>
            
            {/* Formulário para adicionar Novas Imagens */}
            <form onSubmit={handleSubmit} className="mb-8">
                <h5 className="font-medium text-gray-700 mb-2">Adicionar Imagens</h5>
                <div className="flex items-center space-x-4">
                    <input
                        type="file"
                        id="files"
                        className="hidden"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        className="
                            inline-flex items-center justify-center
                            px-4 py-2
                            text-sm font-medium
                            bg-white text-gray-900
                            border border-gray-300 rounded-md
                            shadow-sm
                            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                            data-[state=open]:bg-gray-100 // Exemplo de uso para estados como dropdown
                            transition-colors duration-200 ease-in-out cursor-pointer
                        "
                    >
                        Escolher Imagem
                    </button>
                </div>
                <InputError message={errors.images} className="mt-2" />

                {/* Visualização de Imagens Selecionadas */}
                {imagePreviews.length > 0 ? (
                    <div className="mt-6">
                        <h5 className="font-medium text-gray-700 mb-4">Pré-visualização</h5>
                        <div className="flex flex-wrap gap-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative w-32 h-32 border rounded-md overflow-hidden">
                                    <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ):(
                    <p className='text-sm text-gray-500 mt-2'>Nenhuma imagem escolhida!</p>
                )}
                <div className='mt-6'>
                    <Button
                        type="submit"
                        disabled={processing || data.images.length === 0}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Salvar {data.images.length} Imagem(s)
                    </Button>
                </div>
            </form>
        </div>
    );
}