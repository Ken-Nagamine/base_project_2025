import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ImageOff } from "lucide-react"
import Banner from "../banners"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Link, router } from "@inertiajs/react"
import { useState } from "react"

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
 
export const columns: ColumnDef<Banner>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
   {
    accessorKey: "phrase_1",
    header: "Phrase 1",
  },
   {
    accessorKey: "phrase_2",
    header: "Phrase 2",
  },
   {
    accessorKey: "link",
    header: "Link",
  },
  {
    accessorKey: "order",
    header: "Order",
  },
  {
    accessorKey: "image_desktop",
    header: () => <div className="text-center">Image Desktop</div>,
    cell: ({ row }) => {
      // console.log(row.getValue('image_desktop'))
          const imageUrl = row.getValue<string | null>("image_desktop");
    
          return (
            // <Avatar className="h-10 w-10">
            //   <AvatarImage src={imageUrl || undefined} alt="Imagem categoria" />
            // </Avatar>
            <div className="flex items-center justify-center">
              <img src={imageUrl || undefined} alt="Image Desktop" className="h-14"/>
            </div>
          );
      },
  },
  {
    accessorKey: "image_mobile",
    header: () => <div className="text-center">Image Mobile</div>,
    cell: ({ row }) => {
      // console.log(row.getValue('image_mobile'))
          const imageUrl = row.getValue<string | null>("image_mobile");
    
          return (
            // <Avatar className="h-10 w-10">
            //   <AvatarImage src={imageUrl || undefined} alt="Imagem categoria" />
            // </Avatar>
            <div className="flex items-center justify-center">
              {imageUrl ? (
                <img src={imageUrl || undefined} alt="Image Mobile" className="h-14"/>
              ): (
                <ImageOff size={40} />
              )}
            </div>
          );
      },
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const banner = row.original

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
              <Link href={route('admin.banners.edit', Number(banner.id))}>Editar</Link>
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
              <Link href={route('admin.banners.show', Number(banner.id))}>Visualizar</Link>
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
                  Esta ação não pode ser desfeita. Isso irá deletar permanentemente o banner{' '}
                  **"{banner.title}"** do banco de dados.
                </AlertDialogDescription>
                <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                  <AlertDialogCancel asChild>
                    <button className="Button mauve">Cancelar</button>
                  </AlertDialogCancel>
                  
                  <AlertDialogAction onClick={() => {
                    router.delete(route('admin.banners.destroy', Number(banner.id)), {
                            onSuccess: () => {
                                // Opcional: mostrar uma notificação de sucesso
                                console.log('Banner excluído com sucesso!');
                            },
                            onError: (errors) => {
                                console.error('Erro ao excluir banner:', errors);
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