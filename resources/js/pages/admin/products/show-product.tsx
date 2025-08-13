import AdminSystemLayout from "@/layouts/admin-system-layout";
import { BreadcrumbItem, ProductFormData } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/admin/products',
    },
    {
        title: 'Product view',
        href: '/admin/show',
    },
];

interface ShowProductFormProps {
  product: ProductFormData;
}

export default function ShowProduct({product}: ShowProductFormProps) {
    return (
        <AdminSystemLayout breadcrumbs={breadcrumbs}>
            <Head title="Banner view" />
            <div className="container mx-auto pb-10 pt-4 px-10">
                <div className="mb-8 space-y-0.5">
                    <h2 className="text-xl font-semibold tracking-tight">View Product</h2>
                    <p className="text-sm text-muted-foreground">
                        All information regarding this product can be found here.
                    </p>
                </div>
                <div className="flex flex-col p-5 border rounded-sm max-w-[1050px]" >
                    <ul className="flex flex-col gap-y-3">
                        <li>ID: {product.id}</li>
                        <li>Name: {product.name}</li>
                        <li>Description: {product.description}</li>
                        <li>Brand: {product.phrase_1}</li>
                        <li>Category: {product.phrase_2}</li>
                        <li>Height: {product.height}</li>
                        <li>Weight: {product.weight}</li>
                        <li>Width: {product.width}</li>
                        <li>Length: {product.length}</li>
                        <li>Meta title: {product.meta_title}</li>
                        <li>Meta Description: {product.meta_description}</li>
                        <li>Active: {product.active ? 'active' : 'inactive'}</li>
                        <li>Created: {new Date(product.created_at).toLocaleString()}</li>
                        <li>
                            <p>Variants:</p>
                            {product.variants.length > 0 ? (
                                <>
                                    {product.variants?.map((variant: any) => (
                                        <ul className="p-5 border mb-2.5" key={variant.id}>
                                            <li>SKU: {variant.sku}</li>
                                            <li>Price: {variant.price}</li>
                                            <li>Stock: {variant.stock}</li>
                                            <p>Options:</p>
                                            {variant.options?.map((option: any) => (
                                                <p key={option.id} className="pl-5">{option.variation.option_name} - {option.option_value}</p>
                                            ))}
                                        </ul>
                                    ))}
                                </>
                            ):(
                                <p className="text-sm mt-2.5 text-gray-700">Nenhuma imagem cadastrada!</p>
                            )}
                        </li>
                        <li>
                            <p>Imagens:</p>
                            {product.images.length > 0 ? (
                                <div className="flex flex-wrap items-center gap-2.5 mt-2.5">
                                    {product.images.map((image: any) => (
                                        <img key={image.id} src={`/storage/${image.image}`} alt={`Produto ${image.id!}`} className="w-40 h-40 object-cover" />
                                    ))}
                                </div>
                            ):(
                                <p className="text-sm mt-2.5 text-gray-700">Nenhuma imagem cadastrada!</p>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </AdminSystemLayout>
    )
}