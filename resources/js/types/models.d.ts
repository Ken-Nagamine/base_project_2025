// types/models.d.ts
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    // Adicione outras propriedades do seu modelo User aqui
}

export interface Admin {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    // Adicione outras propriedades do seu modelo Admin aqui
}

// Global types for Inertia props (optional but useful)
declare module '@inertiajs/core' {
    interface PageProps {
        user?: User; // Prop opcional para o usuário logado
        admin?: Admin; // Prop opcional para o administrador logado
        // Adicione outras props globais que você possa ter aqui
    }
}