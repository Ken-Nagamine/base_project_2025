import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuRoot, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    // Paginação
    currentPage: number;
    lastPage: number;
    prevPageUrl: string | null;
    nextPageUrl: string | null;
    paginationLinks: PaginationLink[];
    // Filtros
    initialSearchTerm: string | null; // Novo para inicializar o campo de busca
    onSearchChange: (searchTerm: string) => void; // Callback para o componente pai
}

export function DataTable<TData, TValue>({
    columns,
    data,
    currentPage,
    lastPage,
    prevPageUrl,
    nextPageUrl,
    paginationLinks,
    initialSearchTerm,
    onSearchChange,
}: DataTableProps<TData, TValue>) {
    // Estado local para o termo de busca dentro da DataTable
    const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm || '');
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    // Sincroniza o estado local 'searchTerm' quando a prop 'initialSearchTerm' muda
    useEffect(() => {
        setSearchTerm(initialSearchTerm || '');
    }, [initialSearchTerm]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
        },
    });

    return (
        <div>
            {/* Campo de Busca */}
            <div className="flex justify-between pb-4">
                <Input
                    id="searchProduct"
                    type="text"
                    placeholder="Buscar por nome..."
                    value={searchTerm}
                    // A cada digitação, atualiza o estado local e chama a prop para notificar o pai
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        onSearchChange(e.target.value);
                    }}
                    className="max-w-md"
                />

                <div className="flex gap-1.5">
                    <Button variant="outline" className="ml-auto" asChild>
                        <Link href="/admin/products/create">
                            Novo Produto
                        </Link>
                    </Button>

                    <DropdownMenuRoot>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenuRoot>
                </div>
            </div>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                     {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center">
                                Nenhum resultado.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Controles de Paginação */}
            {data.length > 0 && (
                <>
                    <div className="flex justify-between items-center mt-4 p-2">
                        <Link
                            href={prevPageUrl || ''}
                            data={{ search: initialSearchTerm }} // Passa o termo de busca atual
                            disabled={!prevPageUrl}
                            className={`px-4 py-2 rounded ${!prevPageUrl ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'}`}
                            preserveState
                            preserveScroll
                        >
                            Anterior
                        </Link>

                        <span className="text-sm text-gray-700">
                            Página {currentPage} de {lastPage}
                        </span>

                        <Link
                            href={nextPageUrl || ''}
                            data={{ search: initialSearchTerm }} // Passa o termo de busca atual
                            disabled={!nextPageUrl}
                            className={`px-4 py-2 rounded ${!nextPageUrl ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 text-white'}`}
                            preserveState
                            preserveScroll
                        >
                            Próximo
                        </Link>
                    </div>

                    {/* Links de paginação numérica */}
                    <div className="flex justify-center mt-2 space-x-1">
                        {paginationLinks.map((link, index) => {
                            const isPrevious = link.label.includes('Previous');
                            const isNext = link.label.includes('Next');
                            return(
                                <Link
                                    key={index}
                                    href={link.url || ''}
                                    data={{ search: initialSearchTerm }}
                                    className={`flex items-center justify-center px-3 py-1 border rounded text-sm ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} ${link.url === null && 'opacity-50 cursor-not-allowed'}`}
                                    preserveState
                                    preserveScroll
                                    disabled={link.url === null}
                                >
                                    {/* Renderização condicional do ícone do Lucide ou do número da página */}
                                    {isPrevious ? (
                                        <ChevronLeft size={14} /> // Use o ícone 'ChevronLeft'
                                    ) : isNext ? (
                                        <ChevronRight size={14} /> // Use o ícone 'ChevronRight'
                                    ) : (
                                        link.label // Mostra o número da página
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    );
}