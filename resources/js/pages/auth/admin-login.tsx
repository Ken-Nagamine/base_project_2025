import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from "lucide-react";

import AuthLayout from '@/layouts/auth-layout';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TextLink from '@/components/TextLink';
import InputError from '@/components/InputError';

// Define a interface para os dados do formulário de login do administrador
interface AdminLoginFormInputs {
    email: string;
    password: string;
    remember: boolean;
    [key: string]: string | boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

function AdminLogin({ canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<AdminLoginFormInputs>({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.login'), {
            onFinish: () => reset('password'),
        }); // A rota 'admin.login' do Laravel
    };

    return (
        <AuthLayout title="titulo da pagina auth admin" description='Descrição da pagina Auth admin'> 
            <Head title="Login de administrador" />
            <form className="flex flex-col" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('admin.password.request')} tabIndex={2}>
                                    Esqueceu sua senha?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={4}
                        />
                        <Label htmlFor="remember">Lembrar de mim</Label>
                    </div>

                    <Button 
                        type="submit" 
                        className="mt-4 w-full" 
                        tabIndex={5}  
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Entrar
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}

export default AdminLogin;