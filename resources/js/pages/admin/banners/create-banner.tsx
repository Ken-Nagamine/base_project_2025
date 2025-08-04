import { useState, FormEventHandler, useEffect } from 'react';
import { Head, useForm, usePage } from "@inertiajs/react";
import { BreadcrumbItem } from "@/types";

import AdminSystemLayout from "@/layouts/admin-system-layout";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import InputImage from '@/components/InputImage';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Banners',
        href: '/admin/banners',
    },
    {
        title: 'Banners create',
        href: '/create',
    },
];

interface FormData {
    phrase_1: string,
    phrase_2: string,
    title: string,
    link: string,
    position: string,
    image_desktop: File | null,
    image_mobile: File | null,
    order: string,
    active: boolean,
    // selectedOption: string,
    // Assinatura de índice:
    // Diz que 'FormData' pode ter qualquer propriedade com chave do tipo 'string'
    // e o valor dessa propriedade pode ser de tipo 'any' (ou mais específico se soubermos)
    [key: string]: any;
};

interface BannerDialogProps {
  availableOrders: number[];
  [key: string]: any;
}

export default function CreateBanner() {
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        phrase_1: '',
        phrase_2: '',
        title: '',
        link: '',
        position: '',
        image_desktop: null,
        image_mobile: null,
        order: '',
        active: true,
        // selectedOption: ''
    });

    const [selectedDesktopImage, setSelectedDesktopImage] = useState<string | null>(null)
    const [selectedMobileImage, setSelectedMobileImage] = useState<string | null>(null)
   
    // pega o availableOrders que vem do controller.
    const { availableOrders } = usePage<BannerDialogProps>().props;

     // Handler para quando o arquivo é selecionado no FileInputCustomizadoTS
    const handleDesktopImageSelect = (file: File | null) => {
        // Usa setData para atualizar o campo 'avatar' no estado do formulário
        setSelectedDesktopImage(null);
        setData('image_desktop', file);
        if(file){
            setSelectedDesktopImage(URL.createObjectURL(file));
        }
    };

     // Handler para quando o arquivo é selecionado no FileInputCustomizadoTS
    const handleMobileImageSelect = (file: File | null) => {
        // Usa setData para atualizar o campo 'avatar' no estado do formulário
        setSelectedMobileImage(null);
        setData('image_mobile', file);
        if(file){
            setSelectedMobileImage(URL.createObjectURL(file));
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('admin.banners.store'), {
            onSuccess: () => {
                reset();
                setSelectedDesktopImage(null);
                setSelectedMobileImage(null);
            }
        });
    };

    return (
        <AdminSystemLayout breadcrumbs={breadcrumbs}>
            <Head title="Banner Create" />
            <div className="container mx-auto pb-10 pt-4 px-10">
                <div className="mb-8 space-y-0.5">
                    <h2 className="text-xl font-semibold tracking-tight">Create Banner</h2>
                    <p className="text-sm text-muted-foreground">Preencha o formulário para criar um banner</p>
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
                                {selectedDesktopImage && (
                                    <div className='pt-2.5'>
                                        <img src={selectedDesktopImage} alt="Pré-visualização Desktop" style={{ maxWidth: '300px', height: 'auto' }} />
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
                                {selectedMobileImage && (
                                    <div className='py-3.5'>
                                        <img src={selectedMobileImage} alt="Pré-visualização Mobile" style={{ maxWidth: '300px', height: 'auto' }} />
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
                            className="mt-2 w-full cursor-pointer" 
                            tabIndex={8} 
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Criar banner
                        </Button>
                    </div>
                </form>
            </div>
        </AdminSystemLayout>
    )
}