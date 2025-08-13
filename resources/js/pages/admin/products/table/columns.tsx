import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Link, router } from "@inertiajs/react"
import { useState } from "react"

interface Product {
    id: number,
    name: string,
    brand_id: string,
    category_id: string,
    category: {
      name: string,
    }
    height: string,
    weight: string,
    width: string,
    length: string,
    product_tags: string,
    active: boolean,
    brand: {
        name: string
    }
};
 
export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
   {
    accessorKey: "brand_id",
    header: "Brand",
    cell: ({ row }) => {
      const product = row.original
      return (
        <p>{product.brand?.name}</p>
      )
    }
  },
   {
    accessorKey: "category_id",
    header: "Category",
    cell: ({ row }) => {
      const product = row.original
      return (
        <p>{product.category?.name}</p>
      )
    }
  },
   {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "width",
    header: "Width",
  },
  {
    accessorKey: "length",
    header: "Length",

  },
  {
    accessorKey: "product_tags",
    header: "Tags"
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original

      const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
      const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);

      return (
        <DropdownMenuRoot open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={route('admin.products.edit', Number(product.id))}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setIsSecondDialogOpen(true)
              }}
              className="text-red-500 focus:text-red-500 cursor-pointer"
            >
              Deletar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={route('admin.products.show', Number(product.id))}>Visualizar</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
  
          <AlertDialog open={isSecondDialogOpen} onOpenChange={setIsSecondDialogOpen}>
            <AlertDialogPortal>
              <AlertDialogOverlay className="AlertDialogOverlay" />
              <AlertDialogContent className="AlertDialogContent">
                <AlertDialogTitle className="AlertDialogTitle">
                  Tem certeza?
                </AlertDialogTitle>
                <AlertDialogDescription className="AlertDialogDescription">
                  Esta ação não pode ser desfeita. Isso irá deletar permanentemente o produto{' '}
                  **"{product.name}"** do banco de dados.
                </AlertDialogDescription>
                <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                  <AlertDialogCancel asChild>
                    <button className="Button mauve">Cancelar</button>
                  </AlertDialogCancel>
                  
                  <AlertDialogAction onClick={() => {
                    router.delete(route('admin.products.destroy', Number(product.id)), {
                            onSuccess: () => {
                                // Opcional: mostrar uma notificação de sucesso
                              console.log('Produto excluído com sucesso!');
                            },
                            onError: (errors) => {
                              console.error('Erro ao excluir produto:', errors);
                            }
                        });
                    }} className="bg-amber-800 hover:bg-amber-600">
                    Deletar
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialogPortal>
          </AlertDialog>
        </DropdownMenuRoot>
      )
    },
  },
]