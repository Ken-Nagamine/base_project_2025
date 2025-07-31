import { useEffect, useState } from "react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/InputError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderCircle } from "lucide-react";
import InputImage from "@/components/InputImage";

interface Category {
    id: number;
    name: string;
    image?: string; // Adicione esta propriedade para a URL da imagem existente
    order: string;
    active: boolean;
}

interface CategoryDialogProps {
  availableOrders: number[];
  [key: string]: any;
}

interface EditCategoryFormProps {
  category: Category;
}

export default function EditCategory({category}: EditCategoryFormProps){
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: category.name,
        order: String(category.order),
        image: null as File | null,
        active: category.active,
        _method: 'put',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(category.image || null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // pega o availableOrders que vem do controller.
    const { availableOrders } = usePage<CategoryDialogProps>().props;

    // Use useEffect para resetar ou atualizar os dados do formulário
    // se a 'category' prop mudar (ex: se você abrir o diálogo para uma categoria diferente)
    useEffect(() => {
        setData({
            name: category.name,
            order: String(category.order),
            image: null,
            active: category.active,
            _method: 'put',
        });
        setImagePreview(category.image || null); // Atualiza o preview
        // Se o formulário precisar ser 'limpo' ao mudar de categoria, você pode usar reset()
        // reset();
    }, [category]);

    // Função PRINCIPAL para lidar com a mudança de estado do diálogo
    const handleDialogOpenChange = (open: any) => {
        //quando abre o dialog seta o model
        setData({
                name: category.name,
                order: String(category.order),
                image: null as File | null,
                active: category.active,
                _method: 'put',
        })
        setImagePreview(category.image || null);
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
        setData('image', file);
        if(file){
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(category.image || null);
        }

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Envia os dados atualizados para a rota de atualização do Laravel
        post(route('admin.categories.update', category.id), {
            onSuccess: () => {
                reset();
                setImagePreview(null);
                setIsDialogOpen(false);
            },
            onError: (error) => {
                console.error('Erro ao atualizar categoria:', error);
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
                    <DialogTitle className="m-0 text-[17px] font-medium text-mauve12">Edit profile</DialogTitle>
                    <DialogDescription className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <div>
                                    <InputImage 
                                        id="imagem_desktop"
                                        labelText="Escolher Imagem Desktop"
                                        onFileSelect={handleImageSelect}
                                    />
                                    <InputError message={errors.image} />
                                    {imagePreview && (
                                        <div className='pt-2.5'>
                                            <img src={imagePreview} alt="Preview Image" className="max-h-32 object-contain" />
                                        </div>
                                    )}
                                    {/* Exibe o nome do arquivo atual, se houver, ou a mensagem padrão */}
                                    {data.image && <p className="text-gray-600 text-sm truncate">Imagem selecionado: {data.name}</p>}
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
                                <Label>Order</Label>
                                <Select value={data.order} onValueChange={(value: string) => setData('order', value)} name="order">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a position…"  />
                                    </SelectTrigger>
                                    <SelectContent>
                                        { data.order == category.order && <SelectItem value={data.order}>{data.order}</SelectItem>}
                                        {availableOrders.map((orderNum: any) => (
                                            <SelectItem key={orderNum} value={String(orderNum)}>{orderNum}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.order} />
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