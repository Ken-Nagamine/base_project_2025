// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import AuthLayout from '@/layouts/auth-layout';

import { Button } from '@/components/ui/button';
import TextLink from '@/components/TextLink';

export default function AdminVerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.verification.send'));
    };

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button 
                    type="submit" 
                    className="mt-4 w-full"  
                    disabled={processing}
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Resend verification email
                </Button>

                <TextLink href={route('admin.logout')} method="post" className="mx-auto block text-sm cursor-pointer">
                    Log out
                </TextLink>
            </form>
        </AuthLayout>
    );
}
