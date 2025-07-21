import React, {useId} from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Admin } from '../../types/models'; // Importa a interface Admin
import AdminSystemLayout from '@/layouts/admin-system-layout';

// Define a interface para as props que o componente AdminDashboard recebe
interface AdminDashboardProps {
    admin: Admin; // O administrador logado é esperado como uma prop
}

function AdminDashboard({ admin }: AdminDashboardProps) {
    const patternId = useId();
    const handleLogout = () => {
        router.post(route('admin.logout')); // Rota de logout do admin
    };

    return (
         <AdminSystemLayout>
          <Head title='Dashboard'/>
           <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
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
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
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
        </AdminSystemLayout>
    );
}

export default AdminDashboard;