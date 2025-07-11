import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { User } from '../../types/models'; // Importa a interface User

// Define a interface para as props que o componente UserDashboard recebe
interface UserDashboardProps {
    user: User; // O usuário logado é esperado como uma prop
}

function UserDashboard({ user }: UserDashboardProps) {
    const handleLogout = () => {
        router.post(route('logout')); // Rota de logout do usuário
    };

    return (
        <div style={{ padding: '20px' }}>
            <Head title="Dashboard do Usuário" />
            <h2>Bem-vindo ao Dashboard do Usuário!</h2>
            {user && <p>Olá, {user.name} ({user.email})</p>}

            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}

export default UserDashboard;