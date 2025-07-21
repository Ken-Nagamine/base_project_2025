import { ReactNode, useState, type PropsWithChildren } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useInitials } from '@/hooks/use-initials';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

import { BreadcrumbItem, SharedData, NavItem } from '@/types';
import { 
    SidebarProvider, 
    Sidebar, 
    SidebarContent, 
    SidebarHeader, 
    SidebarFooter,
    SidebarMenu, 
    SidebarMenuButton, 
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarInset,
    SidebarTrigger
} from '@/components/ui/sidebar';
import { 
    DropdownMenuRoot, 
    DropdownMenuContent, 
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem, 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
    BookOpen, 
    Folder, 
    LayoutGrid, 
    ChevronsUpDown,
    LogOut, 
    Settings,
    ChevronRightIcon
} from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import './layout.css'
import AdminSidebar from './admin-sidebar';
import AvatarDropdown from '@/components/AvatarDropdown';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Repository',
        href: '#',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: '#',
        icon: BookOpen,
    },
];

interface SystemLayoutProps {
    children: ReactNode
}

export default function AdminSystemLayout({ children }: PropsWithChildren<SystemLayoutProps>) {
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