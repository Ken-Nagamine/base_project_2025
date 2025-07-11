import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Admin } from '../../types/models'; // Importa a interface Admin

// Define a interface para as props que o componente AdminDashboard recebe
interface AdminDashboardProps {
    admin: Admin; // O administrador logado é esperado como uma prop
}

function AdminDashboard({ admin }: AdminDashboardProps) {
    const handleLogout = () => {
        router.post(route('admin.logout')); // Rota de logout do admin
    };

    return (
        <div style={{ padding: '20px' }}>
            <Head title="Dashboard do Administrador" />
            <h2>Bem-vindo ao Painel de Administração!</h2>
            {admin && <p>Olá, Admin {admin.name} ({admin.email})</p>}

            <button onClick={handleLogout}>Sair (Admin)</button>
        </div>
    );
}

export default AdminDashboard;