import AdminSystemLayout from "@/layouts/admin-system-layout";
import { Head, usePage } from "@inertiajs/react";
import { BreadcrumbItem } from "@/types";

import { columns } from "./table/columns";
import CategoriesDataTable from "./table/data-table";

// Cada pagina com dataTable tem seu DataTable e columns personalizados -> components/tables/...
// default 10 itens por pagina
interface Category {
    id: number;
    name: string;
    image_url?: string; // Adicione esta propriedade para a URL da imagem existente
    order: string;
    active: boolean;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/admin/categories',
    },
];

// Defina a interface para as props da sua página
interface CategoriesIndexProps{
    initialCategories: Category[];
    [key: string]: any;
}

export default function CategoriesPage() {
    const { initialCategories } = usePage<CategoriesIndexProps>().props;

     return (
        <AdminSystemLayout breadcrumbs={breadcrumbs}>
            <Head title="Categorias" />
            <div className="container mx-auto pb-10 pt-4 px-10">
                <div className="mb-8 space-y-0.5">
                    <h2 className="text-xl font-semibold tracking-tight">Lista de Categorias</h2>
                    {/* <p className="text-sm text-muted-foreground">preencha o formulário para criar um banner</p> */}
                </div>

                <CategoriesDataTable data={initialCategories} columns={columns} />
               
            </div>
        </AdminSystemLayout>
    )
}