import * as React from "react";
import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogDescription, 
    DialogOverlay, 
    DialogPortal, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Category {
    id: number;
    name: string;
    image?: string; // Adicione esta propriedade para a URL da imagem existente
    order: string;
    active: boolean;
    created_at: string;
}

interface ShowCategoryFormProps {
  category: Category;
}

export default function ShowCategoryDialog({category}: ShowCategoryFormProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button >View category</Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                <DialogContent className="DialogContent">
                    <DialogTitle className="m-0 text-[17px] font-medium text-mauve12">View category</DialogTitle>
                    <DialogDescription className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                        All information regarding this category can be found here.
                    </DialogDescription>
                    <div>
                        <ul className="flex flex-col gap-y-3">
                            <li className="flex justify-center">
                                {category.image &&
                                    <img src={category.image} alt={category.name} className="h-52" />
                                }
                            </li>
                            <li>ID: {category.id}</li>
                            <li>Name: {category.name}</li>
                            <li>Order: {category.order}</li>
                            <li>Active: {category.active ? 'active' : 'inactive'}</li>
                            <li>Created: {new Date(category.created_at).toLocaleString()}</li>
                        </ul>
                    </div>
                    <div
                        style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
                    >
                        <DialogClose asChild>
                            <Button>Fechar</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}