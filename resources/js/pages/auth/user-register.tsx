import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import AuthLayout from '@/layouts/auth-layout';

import { Label } from '@/components/Label';
import { InputDefault } from '@/components/InputDefault';
import TextLink from '@/components/TextLink';
import { Button } from '@/components/Button';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function RegisterClient() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Crie uma conta" description="Insira seus dados abaixo para criar sua conta">
            <Head title="Registro de usuário" />
            <form className="flex flex-col" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <InputDefault
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        {errors.name && (<p className='text-sm text-red-600 dark:text-red-400'>{errors.name}</p>)}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <InputDefault
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        {errors.email && (<p className='text-sm text-red-600 dark:text-red-400'>{errors.email}</p>)}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <InputDefault
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        {errors.password && (<p className='text-sm text-red-600 dark:text-red-400'>{errors.password}</p>)}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <InputDefault
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        {errors.password_confirmation && (<p className='text-sm text-red-600 dark:text-red-400'>{errors.password_confirmation}</p>)}
                    </div>

                    <Button 
                        type="submit" 
                        className="mt-2 w-full" 
                        tabIndex={5} 
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Criar uma conta
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                        Já tem uma conta?{' '}
                        <TextLink href={route('login')} tabIndex={6}>
                            Entrar
                        </TextLink>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
