import { useIsMobile } from '@/hooks/use-mobile';
import { useInitials } from '@/hooks/use-initials';
import { usePage, Link, router } from '@inertiajs/react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

import { SharedData, NavItem } from '@/types';
import { 
    SidebarMenuButton, 
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { 
    DropdownMenuRoot, 
    DropdownMenuContent, 
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem, 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
    BookOpen, 
    Folder, 
    LayoutGrid, 
    LogOut, 
    Settings,
    ChevronRightIcon
} from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard 2',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Repository 33',
        href: '#',
        icon: Folder,
    },
    {
        title: 'Documentation 1',
        href: '#',
        icon: BookOpen,
    },
];

export default function AdminSidebarMenuItens() {
    const { auth } = usePage<SharedData>().props;
    const page = usePage();
    const isMobile = useIsMobile();
    const getInitials = useInitials();
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <SidebarMenuItem>
                <DropdownMenuRoot>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent" tooltip={{ children: auth.user.name }}>
                            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                    {getInitials(auth.user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{auth.user.name}</span>
                            </div>
                            <ChevronRightIcon className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align={isMobile ? "end" : "start" }
                        side={isMobile ? 'bottom' : "right" }
                    >
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
                </DropdownMenuRoot>
            </SidebarMenuItem>
            {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                        <Link href={item.href} prefetch>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </>
    )
} 