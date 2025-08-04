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
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function CreateBannerDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button >Edit profile</Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                <DialogContent className="DialogContent">
                    <DialogTitle className="m-0 text-[17px] font-medium text-mauve12">Edit profile</DialogTitle>
                    <DialogDescription className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input id="name" defaultValue="Pedro Duarte" />
                    </fieldset>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                        <Label htmlFor="username">
                            Username
                        </Label>
                        <Input id="username" defaultValue="@peduarte" />
                    </fieldset>
                    <div
                        style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
                    >
                        <DialogClose asChild>
                            <Button >Save changes</Button>
                        </DialogClose>
                    </div>
                    {/* <DialogClose asChild>
                        <Button aria-label="Close">
                            X
                        </Button>
                    </DialogClose> */}
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}
