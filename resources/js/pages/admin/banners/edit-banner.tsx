import InputError from "@/components/InputError";
import InputImage from "@/components/InputImage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminSystemLayout from "@/layouts/admin-system-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Banners',
        href: '/admin/banners',
    },
    {
        title: 'Banners edit',
        href: '/admin/edit',
    },
];

interface Banner {
    id: number,
    phrase_1: string,
    phrase_2: string,
    title: string,
    link: string,
    position: string,
    image_desktop?: string,
    image_mobile?: string,
    order: string,
    active: boolean,
};

interface BannerDialogProps {
  availableOrders: number[];
  [key: string]: any;
}

interface EditBannerFormProps {
  banner: Banner;
}

export default function EditBanner({banner}: EditBannerFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        phrase_1: banner.phrase_1,
        phrase_2: banner.phrase_2,
        title: banner.title,
        link: banner.link,
        position: banner.position,
        image_desktop: null as File | null,
        image_mobile: null as File | null,
        order: String(banner.order),
        active: banner.active,
        _method: 'put'
    });
        
    const [selectedDesktopImage, setSelectedDesktopImage] = useState<string | null>(null)
    const [selectedMobileImage, setSelectedMobileImage] = useState<string | null>(null)
    
    const [DesktopImagePreview, setDesktopImagePreview] = useState<string | null>(banner.image_desktop || null);
    const [MobileImagePreview, setMobileImagePreview] = useState<string | null>(banner.image_mobile || null);
   
    // pega o availableOrders que vem do controller.
    const { availableOrders } = usePage<BannerDialogProps>().props;
    
    // Handler para quando o arquivo é selecionado no FileInputCustomizadoTS
    const handleDesktopImageSelect = (file: File | null) => {
        // Usa setData para atualizar o campo 'avatar' no estado do formulário
        setDesktopImagePreview(null);
        setData('image_desktop', file);
        if(file){
            setDesktopImagePreview(URL.createObjectURL(file));
        } else {
            setDesktopImagePreview(banner.image_desktop || null);
        }
    };

     // Handler para quando o arquivo é selecionado no FileInputCustomizadoTS
    const handleMobileImageSelect = (file: File | null) => {
        // Usa setData para atualizar o campo 'avatar' no estado do formulário
        setMobileImagePreview(null);
        setData('image_mobile', file);
        if(file){
            setMobileImagePreview(URL.createObjectURL(file));
        } else {
            setMobileImagePreview(banner.image_mobile || null);
        }
    };
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    
        post(route('admin.banners.update', banner.id), {
            onSuccess: () => {
                reset();
                setDesktopImagePreview(null);
                setMobileImagePreview(null);
            },
            onError: (error) => {
                console.error('Erro ao atualizar categoria:', error);
                // Os erros já serão manipulados por `useForm`
            },
        });
    };
        
    return (
        <AdminSystemLayout breadcrumbs={breadcrumbs}>
            <Head title="Banner edit" />
            <div className="container mx-auto pb-10 pt-4 px-10">
                <div className="mb-8 space-y-0.5">
                    <h2 className="text-xl font-semibold tracking-tight">Edit Banner</h2>
                    <p className="text-sm text-muted-foreground">Modifique os campos para editar o banner</p>
                </div>

                <form className="flex flex-col p-5 border rounded-sm max-w-[1050px]" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className='flex w-full'>
                            <div className="w-1/2">
                                <InputImage 
                                    id="imagem_desktop"
                                    labelText="Escolher Imagem Desktop*"
                                    tabIndex={1}
                                    onFileSelect={handleDesktopImageSelect}
                                />
                                <InputError message={errors.image_desktop} />
                                {DesktopImagePreview && (
                                    <div className='pt-2.5'>
                                        <img src={DesktopImagePreview} alt="Pré-visualização Desktop" style={{ maxWidth: '300px', height: 'auto' }} />
                                    </div>
                                )} 
                                {/* Exibe o nome do arquivo atual, se houver, ou a mensagem padrão */}
                                {data.image_desktop && <p className="text-gray-600 text-sm truncate">Imagem selecionado: {data.image_desktop.name}</p>}
                            </div>

                            <div className="w-1/2">
                                <InputImage 
                                    id="imagem_mobile"
                                    labelText="Escolher Imagem Mobile"
                                    tabIndex={2}
                                    onFileSelect={handleMobileImageSelect}
                                />
                                <InputError message={errors.image_mobile} />
                                {MobileImagePreview && (
                                    <div className='py-3.5'>
                                        <img src={MobileImagePreview} alt="Pré-visualização Mobile" style={{ maxWidth: '300px', height: 'auto' }} />
                                    </div>
                                )} 
                                {/* Exibe o nome do arquivo atual, se houver, ou a mensagem padrão */}
                                {data.image_mobile && <p className="text-gray-600 text-sm truncate">Imagem selecionado: {data.image_mobile.name}</p>}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title">Title*</Label>
                            <Input
                                id="title"
                                type="text"
                                autoFocus
                                tabIndex={3}
                                autoComplete="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                disabled={processing}
                                placeholder="Title"
                                required
                            />
                            <InputError message={errors.phrase_1} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phrase_1">Phrase 1</Label>
                            <Input
                                id="phrase_1"
                                type="text"
                                autoFocus
                                tabIndex={3}
                                autoComplete="phrase_1"
                                value={data.phrase_1}
                                onChange={(e) => setData('phrase_1', e.target.value)}
                                disabled={processing}
                                placeholder="Phrase 01"
                            />
                            <InputError message={errors.phrase_1} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phrase_2">Phrase 2</Label>
                            <Input
                                id="phrase_2"
                                type="text"
                                tabIndex={4}
                                autoComplete="phrase_2"
                                value={data.phrase_2}
                                onChange={(e) => setData('phrase_2', e.target.value)}
                                disabled={processing}
                                placeholder="Phrase 02"
                            />
                            <InputError message={errors.phrase_1} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="link">Link</Label>
                            <Input
                                id="link"
                                type="url"
                                tabIndex={5}
                                autoComplete="link"
                                value={data.link}
                                onChange={(e) => setData('link', e.target.value)}
                                disabled={processing}
                                placeholder="www.example.com.br"
                            />
                            <InputError message={errors.link} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="order">Order*</Label>
                            <Select 
                                name="order" 
                                required
                                value={data.order} 
                                onValueChange={(value: string) => setData('order', value)} 
                            >
                                <SelectTrigger id='order'>
                                    <SelectValue placeholder="Select a order…"  />
                                </SelectTrigger>
                                <SelectContent>
                                    { data.order == banner.order && <SelectItem value={data.order}>{data.order}</SelectItem>}
                                    {availableOrders.map((orderNum: any) => (
                                        <SelectItem key={orderNum} value={String(orderNum)}>{orderNum}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.order} />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="active"
                                name="active"
                                checked={data.active}
                                onClick={() => setData('active', !data.active)}
                                tabIndex={7}
                            />
                            <Label htmlFor="active">Ativo</Label>
                        </div>

                        <Button 
                            type="submit" 
                            className="mt-2 w-full" 
                            tabIndex={5} 
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Editar o banner
                        </Button>
                    </div>
                </form>
            </div>
        </AdminSystemLayout>
    )
}