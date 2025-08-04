import { useMemo, useEffect, useState, useRef } from "react";
import { Link, useForm, Head, router} from "@inertiajs/react";

import AdminSystemLayout from "@/layouts/admin-system-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BreadcrumbItem } from "@/types";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Banners',
        href: '/admin/banners',
    },
];

interface Banner {
    id: number,
    phrase_1: string,
    phrase_2: string,
    title: string,
    link: string,
    position: string,
    image_desktop: File | null,
    image_mobile: File | null,
    order: string,
    active: boolean,
};

// Tipo para os links de paginação (retornados pelo Eloquent/Inertia)
export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Tipo para os dados paginados (o objeto 'users' que você recebe)
export interface PaginatedData<T> {
    current_page: number;
    data: T[]; // Array dos seus dados (ex: User[])
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// Tipo para os filtros (o objeto 'filters' que você recebe)
export interface Filters {
    search: 'string | number | readonly string[] | undefined';
    // Adicione outros filtros aqui, se tiver
    [key: string]: any;
}

// Tipo para as props do seu componente de página
export interface BannerIndexProps {
    auth: any; // Ajuste este tipo conforme a estrutura do seu objeto 'auth' do Laravel Breeze/Jetstream
    initialBanners: PaginatedData<Banner>;
    filters: Filters;
}

export default function Banner({initialBanners, filters}: BannerIndexProps) {
    const { data, links, current_page, last_page, next_page_url, prev_page_url } = initialBanners;

    // Usamos um 'ref' para debounce, para não fazer uma requisição a cada digitação
    const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    // Função que será chamada pela DataTable quando a busca for ativada
      // Esta função será chamada pela DataTable a cada mudança no campo de busca
    const handleSearchChange = (searchTerm: string) => {
        // Limpa o debounce anterior, se existir
        if (searchRef.current) {
            clearTimeout(searchRef.current);
        }

        // Configura um novo debounce de 300ms
        searchRef.current = setTimeout(() => {
            // Usa o 'router.get' para fazer a visita do Inertia
            // Passa os dados como o segundo argumento
            router.get(route('admin.banners.index'), {
                search: searchTerm,
            }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 500);
    };

  return (
    <AdminSystemLayout breadcrumbs={breadcrumbs}>
        <Head title="Banners" />
        <div className="container mx-auto pb-10 pt-4 px-10">
            <div className="mb-8 space-y-0.5">
            <h2 className="text-xl font-semibold tracking-tight">Lista de Banners</h2>
            {/* <p className="text-sm text-muted-foreground">preencha o formulário para criar um banner</p> */}
            </div>
            <DataTable<Banner, unknown> 
                columns={columns} 
                data={data} 
                currentPage={current_page}
                lastPage={last_page}
                prevPageUrl={prev_page_url}
                nextPageUrl={next_page_url}
                paginationLinks={links}
                onSearchChange={handleSearchChange} // Passa a callback para a busca
                initialSearchTerm={filters.search} // Passa o termo de busca atual do backend
            />
        </div>
    </AdminSystemLayout>
  )
}
