import AdminSystemLayout from "@/layouts/admin-system-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Banners',
        href: '/admin/banners',
    },
    {
        title: 'Banners view',
        href: '/admin/show',
    },
];

interface Banner {
    id: number,
    phrase_1: string,
    phrase_2: string,
    title: string,
    link: string,
    position: string,
    image_desktop?: string,
    image_mobile?: string,
    order: string,
    active: boolean,
    created_at: string,
    update_at: string
};

interface ShowBannerFormProps {
  banner: Banner;
}

export default function ShowBanner({banner}: ShowBannerFormProps) {
    console.log(banner)
    return (
        <AdminSystemLayout breadcrumbs={breadcrumbs}>
            <Head title="Banner view" />
            <div className="container mx-auto pb-10 pt-4 px-10">
                <div className="mb-8 space-y-0.5">
                    <h2 className="text-xl font-semibold tracking-tight">View Banner</h2>
                    <p className="text-sm text-muted-foreground">
                        All information regarding this banner can be found here.
                    </p>
                </div>
                <div className="flex flex-col p-5 border rounded-sm max-w-[1050px]" >
                    <ul className="flex flex-col gap-y-3">
                            <li className="flex">
                                <div className="w-1/2">
                                    <p>Image Desktop:</p>
                                    {banner.image_desktop &&
                                        <img src={banner.image_desktop} alt="Imagem Desktop" className="h-52" />
                                    }
                                </div>
                                <div className="w-1/2">
                                    <p>Image Mobile:</p>
                                    {banner.image_mobile &&
                                        <img src={banner.image_mobile} alt="Imagem Mobile" className="h-52" />
                                    }
                                </div>
                            </li>
                            <li>ID: {banner.id}</li>
                            <li>Name: {banner.title}</li>
                            <li>Order: {banner.order}</li>
                            <li>Frase 1: {banner.phrase_1}</li>
                            <li>Frase 2: {banner.phrase_2}</li>
                            <li>Active: {banner.active ? 'active' : 'inactive'}</li>
                            <li>Created: {new Date(banner.created_at).toLocaleString()}</li>
                        </ul>
                </div>
            </div>
        </AdminSystemLayout>
    )
}