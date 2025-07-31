import { ColumnDef } from "@tanstack/react-table";
import { router } from "@inertiajs/react";

import EditCategory from "../edit-category-dialog";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ShowCategoryDialog from "../show-category-dialog";


interface Category {
    id: number;
    name: string;
    image_url?: string; // Adicione esta propriedade para a URL da imagem existente
    order: string;
    active: boolean;
    created_at: string
}

export const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "image",
      header: () => <div className="text-right">Image</div>,
      cell: ({ row }) => {
          const imageUrl = row.getValue<string | null>("image");
    
          return (
            // <Avatar className="h-10 w-10">
            //   <AvatarImage src={imageUrl || undefined} alt="Imagem categoria" />
            // </Avatar>
            <img src={imageUrl || undefined} alt="" className="h-12"/>
          );
      },
    },
    {
      accessorKey: "order",
      header: "Order",
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const id = row.getValue("id");
        const category = row.original;

        return (
        <div className="flex justify-center gap-3">
            {/* dialog com o botão de abrir.. */}
            <EditCategory category={row.original} />

            {/* Componente AlertDialog para confirmação de deleção */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="cursor-pointer">
                  Deletar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso irá deletar permanentemente a categoria{' '}
                    **"{category.name}"** do banco de dados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  {/* <AlertDialogAction onClick={() => onDelete(category)}> */}
                  <AlertDialogAction onClick={() => {
                    router.delete(route('admin.categories.destroy', Number(id)), {
                            onSuccess: () => {
                                // Opcional: mostrar uma notificação de sucesso
                                console.log('Categoria excluído com sucesso!');
                            },
                            onError: (errors) => {
                                console.error('Erro ao excluir categoria:', errors);
                            }
                        });
                    }} className="bg-amber-800 hover:bg-amber-600">
                    Deletar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <ShowCategoryDialog category={row.original}/>
        </div>
        )
      },
    },
]










// OLD CODE ***********************
// import { ColumnDef } from "@tanstack/react-table"
// import { Link, router } from "@inertiajs/react"
// import { Categories } from "@/types/models"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenuRoot,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//    ArrowUpDown,
//    MoreHorizontal,
//    Trash
// } from "lucide-react"
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
// // import EditCategoryDialog from "../edit-category-dialog"
// // import { Avatar, AvatarImage } from "@/components/ui/avatar"
// interface Category {
//     id: number;
//     name: string;
//     image_url?: string; // Adicione esta propriedade para a URL da imagem existente
//     order: string;
//     active: boolean;
// }

// export const getColumns = (
//     onEdit: (category: Category) => void,
//     onDelete: (category: Category) => void
//   ):  ColumnDef<Category>[] => {
//   return [
//     {
//       accessorKey: "id",
//       header: "ID",
//     },
//     {
//       accessorKey: "name",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Name
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         )
//       },
//     },
//     {
//       accessorKey: "image",
//       header: () => <div className="text-right">Image</div>,
//       cell: ({ row }) => {
//           const imageUrl = row.getValue<string | null>("image");
    
//           return (
//             // <Avatar className="h-10 w-10">
//             //   <AvatarImage src={imageUrl || undefined} alt="Imagem categoria" />
//             // </Avatar>
//             <img src={imageUrl || undefined} alt="" className="h-12"/>
//           );
//       },
//     },
//     {
//       accessorKey: "order",
//       header: "Order",
//     },
//     {
//       id: "actions",
//       header: () => <div className="text-center">Actions</div>,
//       cell: ({ row }) => {
//         const id = row.getValue("id");
//         const category = row.original;
//         return (
//         <div className="flex justify-center gap-3">
//           {/* <EditCategoryDialog category={row.original} /> */}
//           <Button variant="outline" size="sm" onClick={() => onEdit(category)}>
//             Editar
//           </Button>

//           {/* Componente AlertDialog para confirmação de deleção */}
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="destructive" size="sm">
//                   Deletar
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     Esta ação não pode ser desfeita. Isso irá deletar permanentemente a categoria{' '}
//                     **"{category.name}"** do banco de dados.
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancelar</AlertDialogCancel>
//                   <AlertDialogAction onClick={() => onDelete(category)}>
//                     Deletar
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           {/* <button 
//             className="cursor-pointer"
//             onClick={() => {
//               if (confirm('Tem certeza que deseja excluir esta categoria?')) {
//                 router.delete(route('admin.categories.destroy', Number(id)), {
//                   onSuccess: () => {
//                       // Opcional: mostrar uma notificação de sucesso
//                       console.log('Categoria excluído com sucesso!');
//                   },
//                   onError: (errors) => {
//                       console.error('Erro ao excluir produto:', errors);
//                   }
//               });
//               }
//             }}
//           >
//             <Trash size={17} color="red" />
//           </button> */}
//         </div>
//         )
        
//       },
//     },
//   ]
// }