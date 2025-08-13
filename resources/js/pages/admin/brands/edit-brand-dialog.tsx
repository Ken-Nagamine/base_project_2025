import { useEffect, useState } from "react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/InputError";
import { LoaderCircle } from "lucide-react";
import InputImage from "@/components/InputImage";
import { Textarea } from "@/components/ui/textarea";

interface Brand {
    id: number;
    name: string;
    description?: string;
    website_url?: string;
    logo_url?: string; // Adicione esta propriedade para a URL da imagem existente
    active: boolean;
    created_at: string
}

interface EditBrandFormProps {
  brand: Brand;
}

export default function EditCategory({brand}: EditBrandFormProps){
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: brand.name,
        description: brand.description,
        website_url: brand.website_url,
        logo_url: null as File | null,
        active: brand.active,
        _method: 'put',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(brand.logo_url || null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Use useEffect para resetar ou atualizar os dados do formulário
    // se a 'category' prop mudar (ex: se você abrir o diálogo para uma categoria diferente)
    useEffect(() => {
        setData({
            name: brand.name,
            description: brand.description,
            website_url: brand.website_url,
            logo_url: null as File | null,
            active: brand.active,
            _method: 'put',
        });
        setImagePreview(brand.logo_url || null); // Atualiza o preview
        // Se o formulário precisar ser 'limpo' ao mudar de categoria, você pode usar reset()
        // reset();
    }, [brand]);

    // Função PRINCIPAL para lidar com a mudança de estado do diálogo
    const handleDialogOpenChange = (open: any) => {
        //quando abre o dialog seta o model
        setData({
            name: brand.name,
            description: brand.description,
            website_url: brand.website_url,
            logo_url: null as File | null,
            active: brand.active,
            _method: 'put',
        })
        setImagePreview(brand.logo_url || null);
        setIsDialogOpen(open); // Atualiza o estado do diálogo
        // <--- AQUI ESTÁ O CÓDIGO CHAVE: Reseta o formulário QUANDO o diálogo ESTÁ FECHANDO
        if (!open) { // Se 'open' for false, significa que o diálogo está sendo fechado
            reset();
            clearErrors();
            setImagePreview(null);
            // console.log('Diálogo fechado e formulário resetado!');
        }
    };

    const handleImageSelect = (file: any) => {
        // Usa setData para atualizar o campo 'avatar' no estado do formulário
        setImagePreview(null);
        setData('logo_url', file);
        if(file){
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(brand.logo_url || null);
        }

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Envia os dados atualizados para a rota de atualização do Laravel
        post(route('admin.brands.update', brand.id), {
            onSuccess: () => {
                reset();
                setImagePreview(null);
                setIsDialogOpen(false);
            },
            onError: (error) => {
                console.error('Erro ao atualizar brand:', error);
                // Os erros já serão manipulados por `useForm`
            },
        });
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
                <Button type="button" className="cursor-pointer">Editar</Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                <DialogContent 
                    className="DialogContent"
                     onPointerDownOutside={(e) => {
                        e.preventDefault(); // Impede o fechamento ao clicar fora
                    }}
                    onEscapeKeyDown={(e) => {
                        e.preventDefault(); // Impede o fechamento ao pressionar ESC
                    }}
                >
                    <DialogTitle className="m-0 text-[17px] font-medium text-mauve12">Edit brand</DialogTitle>
                    <DialogDescription className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <div>
                                    <InputImage 
                                        id="logo_url"
                                        labelText="Escolher Logo"
                                        onFileSelect={handleImageSelect}
                                    />
                                    <InputError message={errors.logo_url} />
                                    {imagePreview && (
                                        <div className='pt-2.5'>
                                            <img src={imagePreview} alt="Preview Logo" className="max-h-32 object-contain" />
                                        </div>
                                    )}
                                    {/* Exibe o nome do arquivo atual, se houver, ou a mensagem padrão */}
                                    {data.logo_url && <p className="text-gray-600 text-sm truncate">Logo selecionado: {data.logo_url.name}</p>}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Fulano de Tal"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea
                                    id="description"
                                    value={data.description ?? ''}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Descrição da brand"
                                    disabled={processing}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="website_url">Website</Label>
                                <Input
                                    id="website_url"
                                    type="url"
                                    tabIndex={4}
                                    autoComplete="website_url"
                                    value={data.website_url}
                                    onChange={(e) => setData('website_url', e.target.value)}
                                    disabled={processing}
                                    placeholder="www.site.com"
                                />
                                <InputError message={errors.website_url} />
                            </div>

                            <div
                                style={{ display: "flex", marginTop: 25, justifyContent: "flex-end", gap: "10px" }}
                            >
                                <DialogClose asChild>
                                    <Button className="bg-red-700 hover:bg-red-600" >Cancelar</Button>
                                </DialogClose>
                                <Button 
                                    type="submit" 
                                    className="" 
                                    tabIndex={5}  
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Editar
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}