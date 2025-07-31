import React, { useState } from "react";
import { useForm, usePage } from '@inertiajs/react';
import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogDescription, 
    DialogOverlay, 
    DialogPortal, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/InputError";
import { LoaderCircle, XIcon } from "lucide-react";
import InputImage from "@/components/InputImage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormData {
    name: string;
    order: string;
    image: File | null;
    active: boolean;
    // Assinatura de índice:
    // Diz que 'FormData' pode ter qualquer propriedade com chave do tipo 'string'
    // e o valor dessa propriedade pode ser de tipo 'any' (ou mais específico se soubermos)
    [key: string]: any;
};

interface CategoryDialogProps {
  availableOrders: number[];
  [key: string]: any;
}

export default function CreateCategoryDialog() {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm<FormData>({
        name: '',
        order: '',
        image: null,
        active: true
    });
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // pega o availableOrders que vem do controller.
    const { availableOrders } = usePage<CategoryDialogProps>().props;

    // Função PRINCIPAL para lidar com a mudança de estado do diálogo
    const handleDialogOpenChange = (open: any) => {
        setIsDialogOpen(open); // Atualiza o estado do diálogo
        // <--- AQUI ESTÁ O CÓDIGO CHAVE: Reseta o formulário QUANDO o diálogo ESTÁ FECHANDO
        if (!open) { // Se 'open' for false, significa que o diálogo está sendo fechado
            reset();
            clearErrors();
            setSelectedImage(null);
            console.log('Diálogo fechado e formulário resetado!');
        }
    };

    const handleDesktopImageSelect = (file: File | null) => {
        // Usa setData para atualizar o campo 'avatar' no estado do formulário
        setSelectedImage(null);
        setData('image', file);
        if(file){
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.store'), {
            
            onSuccess: () => {
                reset();
                setSelectedImage(null);
                setIsDialogOpen(false);
            }
            // onFinish: () => reset('password', 'password_confirmation'),
            // onError: (serverErrors) => { 
            //     console.error('Erros de validação do formulário:', serverErrors);
            // },
        }); 
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Create category</Button>
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
                    <DialogTitle className="m-0 text-[17px] font-medium text-mauve12">Create Category</DialogTitle>
                    <DialogDescription className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                        Insira os dados abaixo para criar uma categoria.
                    </DialogDescription>
                     <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <div>
                                    <InputImage 
                                        id="imagem_desktop"
                                        labelText="Escolher Imagem Desktop"
                                        onFileSelect={handleDesktopImageSelect}
                                    />
                                    <InputError message={errors.image} />
                                    {selectedImage && (
                                        <div className='pt-2.5'>
                                            <img src={selectedImage} alt="Pré-visualização Desktop" style={{ maxWidth: '200px', height: 'auto' }} />
                                        </div>
                                    )} 
                                    {/* Exibe o nome do arquivo atual, se houver, ou a mensagem padrão */}
                                    {data.image && <p className="text-gray-600 text-sm truncate">Imagem selecionado: {data.image.name}</p>}
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
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </form>
                    <DialogClose 
                        className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    >
                        <XIcon />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}