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

interface Brand {
    id: number;
    name: string;
    description?: string;
    website_url?: string;
    logo_url?: string; // Adicione esta propriedade para a URL da imagem existente
    active: boolean;
    created_at: string
}

interface ShowBrandFormProps {
  brand: Brand;
}

export default function ShowCategoryDialog({brand}: ShowBrandFormProps) {
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
                                {brand.logo_url &&
                                    <img src={brand.logo_url} alt="Logo da brand" className="h-52" />
                                }
                            </li>
                            <li>ID: {brand.id}</li>
                            <li>Name: {brand.name}</li>
                            <li>Description: {brand.description}</li>
                            <li>Website: {brand.website_url}</li>
                            <li>Active: {brand.active ? 'active' : 'inactive'}</li>
                            <li>Created: {new Date(brand.created_at).toLocaleString()}</li>
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