import { ReactNode, type PropsWithChildren } from 'react';
import { usePage} from '@inertiajs/react';

import { BreadcrumbItem, SharedData } from '@/types';
import { 
    SidebarProvider, 
    SidebarInset,
    SidebarTrigger
} from '@/components/ui/sidebar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import './layout.css'
import AdminSidebar from './admin-sidebar';
import AvatarDropdown from '@/components/AvatarDropdown';

interface SystemLayoutProps {
    children: ReactNode,
    breadcrumbs: BreadcrumbItem[]
}

/* 
* Os dados do usuario logado é passado no componente AvatarDropdown
*/

export default function AdminSystemLayout({ children, breadcrumbs }: PropsWithChildren<SystemLayoutProps>) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    return (
        <SidebarProvider defaultOpen={isOpen}>
            {/* SIDEBAR MENU */}
            <AdminSidebar />

            {/* MAIN HEADER / CONTENT */}
            <SidebarInset className="overflow-x-hidden">
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
                    <div className="flex items-center gap-2">
                        {/* OPEN/CLOSE SIDEBAR */}
                        <SidebarTrigger className="-ml-1" />
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                    <div className='hidden sm:block'>
                        <AvatarDropdown align="start" side="bottom" type="admin"/>
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}