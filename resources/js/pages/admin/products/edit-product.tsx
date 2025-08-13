import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem, ProductFormData } from '@/types/index';

import AdminSystemLayout from '@/layouts/admin-system-layout';
import GeneralInfoTab from './tab/generalInfoTab';
import VariantsTab from './tab/variantsTab';
import ImagesTab from './tab/imagesTab';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface EditProductFormProps {
    product: ProductFormData;
}

export default function EditProduct({product}: EditProductFormProps) {
    const { data, setData, put, processing, errors } = useForm(product);
    const [tabsWithErrors, setTabsWithErrors] = useState<string[]>([]);

    // Use useEffect para atualizar os erros das abas quando a prop `errors` mudar
    useEffect(() => {
        const checkTabsForErrors = () => {
            const erroredTabs: string[] = [];
            // Aba de Informações Gerais (tab1)
            if (errors.name || errors.description || errors.slug) {
                erroredTabs.push('tab1');
            }
            // A lógica aqui é mais complexa, pois os erros estão aninhados.
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
        put(route('admin.products.update', product.id));
    };

    return (
         <AdminSystemLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Produto" />
            <div className="container mx-auto pb-10 pt-4 px-10">
                <div className="mb-8 space-y-0.5">
                    <h2 className="text-xl font-semibold tracking-tight">Edit Product</h2>
                    <p className="text-sm text-muted-foreground">Preencha o formulário para editar o produto</p>
                </div>
                <Tabs className="flex flex-col w-full" defaultValue="principal">
                    <TabsList className="flex border-b border-gray-200">
                        <TabsTrigger value="principal">Informações Gerais</TabsTrigger>
                        <TabsTrigger value="imagens">
                            Imagens 
                            <Badge
                                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                            >
                                {product.images.length}
                            </Badge>
                            
                        </TabsTrigger>
                    </TabsList>
                        <TabsContent value="principal">
                            <form onSubmit={submit} className="flex flex-col p-5 border rounded-sm max-w-[1050px] bg-white">
                                <Tabs className="flex flex-col w-full" defaultValue="tab1">
                                    <TabsList className="flex border-b border-gray-200">
                                        <TabsTrigger value="tab1" className={tabButtonStyle('tab1')}>Principais</TabsTrigger>
                                        <TabsTrigger value="tab2" className={tabButtonStyle('tab2')}>
                                            Variações e Preços
                                             <Badge
                                                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                                            >
                                                {product.variants.length}
                                            </Badge>
                                        </TabsTrigger>
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
                                    Editar produto
                                    </Button>
                                </div>
                            </form>
                        </TabsContent>
                        <TabsContent value="imagens">
                            <div className='p-5 border rounded-sm max-w-[1050px] bg-white'>
                                <ImagesTab productId={data.id} existingImages={product.images}/>
                            </div>
                        </TabsContent>
                </Tabs>
            </div>
        </AdminSystemLayout>
    );
}