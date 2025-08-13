import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// product
// Define a estrutura de uma opção de variação
export interface VariationOption {
    option_name: string;
    option_value: string;
}

// Define a estrutura de uma variante de produto
export interface ProductVariant {
    id?: number; // O ID pode não existir ao criar uma nova variante
    sku: string;
    price: number;
    stock: number;
    options: VariationOption[];
}

// Define a estrutura dos dados do formulário
export interface ProductFormData {
    name: string;
    description: string;
    slug: string;
    brand_id: string;
    category_id: string;
    height: string;
    weight: string;
    width: string;
    length: string;
    meta_title: string;
    meta_description: string;
    variants: ProductVariant[];
    [key: string]: any; // This allows for additional properties...
}