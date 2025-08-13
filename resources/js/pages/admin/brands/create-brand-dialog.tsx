import React, { useState } from "react";
import { useForm } from '@inertiajs/react';
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
import { Textarea } from "@/components/ui/textarea";

interface FormData {
    name: string;
    description?: string;
    website_url?: string;
    logo_url?: File | null; // Adicione esta propriedade para a URL da imagem existente
    active: boolean;
    // Assinatura de índice:
    // Diz que 'FormData' pode ter qualquer propriedade com chave do tipo 'string'
    // e o valor dessa propriedade pode ser de tipo 'any' (ou mais específico se soubermos)
    [key: string]: any;
};

export default function CreateBrandDialog() {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm<FormData>({
        name: '',
        description: '',
        website_url: '',
        logo_url: null,
        active: true
    });
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    const handleImageSelect = (file: File | null) => {
        // Usa setData para atualizar o campo 'avatar' no estado do formulário
        setSelectedImage(null);
        setData('logo_url', file);
        if(file){
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.brands.store'), {
            
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
                <Button className="cursor-pointer">Create brand</Button>
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
                    <DialogTitle className="m-0 text-[17px] font-medium text-mauve12">Create brand</DialogTitle>
                    <DialogDescription className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                        Insira os dados abaixo para criar uma brand.
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
                                    {selectedImage && (
                                        <div className='pt-2.5'>
                                            <img src={selectedImage} alt="Pré-visualização Logo" style={{ maxWidth: '200px', height: 'auto' }} />
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