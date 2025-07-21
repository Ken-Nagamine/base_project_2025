import { ReactNode, useState, type PropsWithChildren } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { useInitials } from '@/hooks/use-initials';
import { BreadcrumbItem, SharedData, NavItem } from '@/types';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

import { 
    SidebarInset,
    SidebarTrigger,
    SidebarMenuButton
} from '@/components/ui/sidebar';
import { 
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
    Avatar,
    AvatarImage,
    AvatarFallback
} from '@/components/ui/avatar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
    ChevronsUpDown,
    LogOut, 
    Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AvatarDropdown from '@/components/AvatarDropdown';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface UserSystemLayoutProps {
    children: ReactNode
}

export default function UserSystemLayout({ children }: PropsWithChildren<UserSystemLayoutProps>) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <div className='flex justify-center w-full'>
            <div className='has-data-[variant=inset]:bg-sidebar min-h-svh w-7xl'>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
                    <div className="flex items-center gap-2">
                        Logo empresa aqui
                    </div>
                    <div className='hidden sm:block'>
                        <AvatarDropdown align='start' side='bottom' type='user'/>
                        {/* <DropdownMenuRoot>
                            <DropdownMenuTrigger>
                                <div className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-12 text-sm group-data-[collapsible=icon]:p-0!">
                                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{auth.user.name}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                align="end"
                                side='bottom'
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                            <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{auth.user.name}</span>
                                            <span className="truncate text-xs text-muted-foreground">{auth.user.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link className="block w-full" href="#" as="button" prefetch onClick={cleanup}>
                                            <Settings className="mr-2" />
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                                        <LogOut className="mr-2" />
                                        Log out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenuRoot> */}
                    </div>
                </header>
                {children}
            </div>
        </div>
    )

}