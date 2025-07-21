import React from 'react';
import { Head, useForm } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TextLink from '@/components/TextLink';
import InputError from '@/components/InputError';

import { LoaderCircle } from "lucide-react";

// Define a interface para os dados do formulário de login do usuário
interface UserLoginFormInputs {
    email: string;
    password: string;
    remember: boolean;
    [key: string]: string | boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

function UserLogin({ canResetPassword } : LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<UserLoginFormInputs>({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        }); // A rota 'login' do Laravel
    };

    return (
        <AuthLayout title="Log in to your account" description='Enter your email and password below to log in'> 
            <Head title="Login do Usuário" />
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
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Esqueceu sua senha?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
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
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Lembre de mim</Label>
                    </div>

                    <Button
                        type="submit" 
                        className="mt-4 w-full" 
                        tabIndex={4}  
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Entrar
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                        Não tem uma conta?{' '}
                        <TextLink href={route('register')} tabIndex={5}>
                            Inscreva-se
                        </TextLink>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}

export default UserLogin;