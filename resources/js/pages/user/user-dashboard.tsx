import React, {useId} from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { User } from '../../types/models'; // Importa a interface User

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import SystemLayout from '@/layouts/admin-system-layout';
import UserSystemLayout from '@/layouts/user-system-layout';
import { 
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader
} from '@/components/ui/card';

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

// Define a interface para as props que o componente UserDashboard recebe
interface UserDashboardProps {
    user: User; // O usuário logado é esperado como uma prop
}

function UserDashboard() {
  const patternId = useId();

    return (
        <UserSystemLayout>
          <div className="flex h-svh flex-col gap-10 rounded-xl pt-20 px-20 overflow-x-auto">
            <div className="grid auto-rows-min gap-10 md:grid-cols-3">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <svg className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" fill="none">
                      <defs>
                          <pattern id={patternId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                          </pattern>
                      </defs>
                      <rect stroke="none" fill={`url(#${patternId})`} width="100%" height="100%"></rect>
                  </svg>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <svg className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" fill="none">
                      <defs>
                          <pattern id={patternId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                          </pattern>
                      </defs>
                      <rect stroke="none" fill={`url(#${patternId})`} width="100%" height="100%"></rect>
                  </svg>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                      <svg className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" fill="none">
                      <defs>
                          <pattern id={patternId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                          </pattern>
                      </defs>
                      <rect stroke="none" fill={`url(#${patternId})`} width="100%" height="100%"></rect>
                  </svg>
                </div>
            </div>

            <div className="flex h-52 gap-10">
                <Link href='#' className='w-1/3 hover:opacity-50'>
                  <div className='flex w-full h-52 rounded-xl border py-6 shadow-sm'>
                    <div className='flex justify-center items-center p-5'>
                      <Calendar size={80}/>
                    </div>
                    <div className='flex flex-col justify-center'>
                      <h2>Titulo</h2>
                      <p>Descrição do card</p>
                    </div>
                  </div>
                </Link>

                 <Link href='#' className='w-1/3 hover:opacity-50'>
                  <div className='flex w-full h-52 rounded-xl border py-6 shadow-sm'>
                    <div className='flex justify-center items-center p-5'>
                      <Inbox size={80}/>
                    </div>
                    <div className='flex flex-col justify-center'>
                      <h2>Titulo</h2>
                      <p>Descrição do card</p>
                    </div>
                  </div>
                </Link>

                 <Link href='#' className='w-1/3 hover:opacity-50'>
                  <div className='flex w-full h-52 rounded-xl border py-6 shadow-sm'>
                    <div className='flex justify-center items-center p-5'>
                      <Home size={80} />
                    </div>
                    <div className='flex flex-col justify-center'>
                      <h2>Titulo</h2>
                      <p>Descrição do card</p>
                    </div>
                  </div>
                </Link>
            </div>
          </div>


        </UserSystemLayout>
    );
}

export default UserDashboard;