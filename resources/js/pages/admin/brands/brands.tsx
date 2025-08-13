import AdminSystemLayout from "@/layouts/admin-system-layout";
import { Head, usePage } from "@inertiajs/react";
import { BreadcrumbItem } from "@/types";

import { columns } from "./table/columns";
import BrandsDataTable from "./table/data-table";

// Cada pagina com dataTable tem seu DataTable e columns personalizados -> components/tables/...
// default 10 itens por pagina
interface Brand {
    id: number;
    name: string;
    description?: string;
    website_url?: string;
    logo_url?: string; // Adicione esta propriedade para a URL da imagem existente
    active: boolean;
    created_at: string
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Brands',
        href: '/admin/brands',
    },
];

// Defina a interface para as props da sua página
interface BrandsIndexProps{
    initialBrands: Brand[];
    [key: string]: any;
}

export default function CategoriesPage() {
    const { initialBrands } = usePage<BrandsIndexProps>().props;

     return (
        <AdminSystemLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands" />
            <div className="container mx-auto pb-10 pt-4 px-10">
                <div className="mb-8 space-y-0.5">
                    <h2 className="text-xl font-semibold tracking-tight">Lista de Brands</h2>
                    {/* <p className="text-sm text-muted-foreground">preencha o formulário para criar um banner</p> */}
                </div>

                <BrandsDataTable data={initialBrands} columns={columns} />
               
            </div>
        </AdminSystemLayout>
    )
}