import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem, ProductFormData } from '@/types/index';

import AdminSystemLayout from '@/layouts/admin-system-layout';
import GeneralInfoTab from './tab/generalInfoTab';
import VariantsTab from './tab/variantsTab';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/admin/products',
    },
     {
        title: 'Products create',
        href: '/create',
    },
];

export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm<ProductFormData>({
        name: '',
        description: '',
        slug: '',
        brand_id: '',
        category_id: "",
        height: "",
        weight: "",
        width: "",
        length: "",
        meta_title: "",
        meta_description: "",
        variants: [
            {
                sku: '',
                price: 0, // Tipado como number
                stock: 0, // Tipado como number
                options: [
                     { option_name: '', option_value: '' }, // Começa com uma opção vazia
                ],
            },
        ],
    });

    const [tabsWithErrors, setTabsWithErrors] = useState<string[]>([]);

    // Use useEffect para atualizar os erros das abas quando a prop `errors` mudar
    useEffect(() => {
        const checkTabsForErrors = () => {
            const erroredTabs: string[] = [];

            // Aba de Informações Gerais (tab1)
            if (errors.name || errors.description || errors.slug) {
                erroredTabs.push('tab1');
            }

            // Aba de Variações e Preços (tab2)
            const variantErrorsExist = Object.keys(errors).some(key => key.startsWith('variants.'));
            if (variantErrorsExist) {
                erroredTabs.push('tab2');
            }
            
            setTabsWithErrors(erroredTabs);
        };

        checkTabsForErrors();
    }, [errors]); // Roda sempre que o objeto de erros do Inertia é atualizado

    const tabButtonStyle = (tabValue: string) =>`${tabsWithErrors.includes(tabValue) ? 'border-b-2 border-red-500 text-red-500 font-bold' : ''}`;

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
         <AdminSystemLayout breadcrumbs={breadcrumbs}>
            <Head title="Cadastrar Produto" />
            <div className="container mx-auto pb-10 pt-4 px-10">
                <div className="mb-8 space-y-0.5">
                    <h2 className="text-xl font-semibold tracking-tight">Create Product</h2>
                    <p className="text-sm text-muted-foreground">Preencha o formulário para criar um produto</p>
                </div>
                <form onSubmit={submit} className="flex flex-col p-5 border rounded-sm max-w-[1050px] bg-white">
                    <Tabs className="flex flex-col w-full" defaultValue="tab1">
                        <TabsList className="flex border-b border-gray-200">
                            <TabsTrigger value="tab1" className={tabButtonStyle('tab1') + ' cursor-pointer'}>Informações Gerais</TabsTrigger>
                            <TabsTrigger value="tab2" className={tabButtonStyle('tab2') + ' cursor-pointer'}>Variações e Preços</TabsTrigger>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="link" type="button" className='hover:no-underline cursor-pointer'>Imagens</Button>        
                                </TooltipTrigger>
                                <TooltipContent sideOffset={1}>
                                    Inserir imagem somente depois de cadastrar produto!
                                </TooltipContent>
                            </Tooltip>
                        </TabsList>
                        <div className="mt-6">
                            <TabsContent value="tab1">
                                <GeneralInfoTab data={data} setData={setData} errors={errors} processing={processing} />
                            </TabsContent>
                            <TabsContent value="tab2">
                                <VariantsTab data={data} setData={setData} errors={errors} />
                            </TabsContent>
                        </div>
                    </Tabs>
                    <div className="flex justify-end mt-8">
                        <Button 
                            type="submit"  
                            tabIndex={5}  
                            className="cursor-pointer"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Salvar produto
                        </Button>
                    </div>
                </form>
            </div>
        </AdminSystemLayout>
    );
}