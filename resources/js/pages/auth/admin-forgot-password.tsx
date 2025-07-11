import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import AuthLayout from '@/layouts/auth-layout';

import { Label } from '@/components/Label';
import TextLink from '@/components/TextLink';
import { InputDefault } from '@/components/InputDefault';
import { Button } from '@/components/Button';

export default function AdminForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
            e.preventDefault();

        post(route('admin.password.email'));
    };

    return (
        <AuthLayout title="Esqueceu sua senha?" description="Digite seu e-mail para receber um link para redefinir sua senha">
            <Head title="Admin forgot password" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>} 

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <InputDefault
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />

                        { errors.email && (
                            <p className='text-sm text-red-600 dark:text-red-400'>{errors.email}</p>
                        )}
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button 
                            type="submit" 
                            className="mt-4 w-full" 
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Email password reset link
                        </Button>
                    </div>
                </form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Ou, retorne para</span>
                    <TextLink href={route('login')}>
                        Entrar
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    )
}