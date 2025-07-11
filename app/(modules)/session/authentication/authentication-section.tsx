'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import ButtonComponent from '@/components/button-component';
import { ArrowBigLeftDash } from 'lucide-react';
import { handleMicrosoftAuthCallback } from '@/actions/authentication-handler-action';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface Props {
    title?: string;
    subtitle?: string;
    redirectPath?: string;
    buttonText?: string;
}

const AuthenticationSection = ({
    title = 'Inicio de sesión en Microsoft exitoso',
    subtitle = 'Tu cuenta ha sido vinculada correctamente. Ya puedes acceder a los recursos disponibles en la plataforma.',
    redirectPath = '/session',
    buttonText = 'Ir al panel',
}: Props) => {
    const router = useRouter();

    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get('code');

        const sessionState = searchParams.get('session_state');

        if (code && sessionState) {
            handleMicrosoftAuthCallback({ code, sessionState })
                // .then((response) => {
                //     if (response) toast.success(response.message);
                // })
                .catch((err) => {
                    console.error('Error autenticando:', err);
                });
        }
    }, [searchParams, router]);

    return (
        <section className="w-full h-full flex flex-col items-center justify-center gap-6 text-center">
            <div className="space-y-6 max-w-md flex items-center flex-col">
                <h1 className="flex items-center justify-center gap-2 text-2xl font-semibold text-gray-800">

                    🎉 ¡Inicio de sesión en Microsoft exitoso!
                </h1>
                <p className="text-sm text-gray-600">
                    Tu cuenta se ha vinculado correctamente. Ya puedes acceder a tus archivos y herramientas desde el panel.
                </p>
                <ButtonComponent
                    title='Regresar'
                    icon={ArrowBigLeftDash}
                    onClick={() => router.push(redirectPath)}
                />
            </div>
        </section>
    );
};

export default AuthenticationSection;
