'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import ActionButton from '@/components/action-button';
import { handleMicrosoftAuthCallback } from '@/actions/authorization/auth';

interface Props {
    title?: string;
    subtitle?: string;
    redirectPath?: string;
    buttonText?: string;
}

const AuthenticationSection = ({
    redirectPath = '/session',
}: Props) => {
    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const code = urlParams.get('code');
        if (code) {
            handleMicrosoftAuthCallback({ code }).catch((err) => {
                console.error('Error autenticando:', err);
                toast.error('Error al vincular la cuenta de Microsoft.');
            });
        }
    }, []);


    return (
        <section className="w-full h-full flex flex-col items-center justify-center gap-6 text-center">
            <div className="space-y-6 max-w-md flex items-center flex-col">
                <h1 className="flex items-center justify-center gap-2 text-2xl font-semibold text-gray-800">
                    🎉 ¡Inicio de sesión en Microsoft exitoso!
                </h1>
                <p className="text-sm text-gray-600">
                    Tu cuenta se ha vinculado correctamente. Ya puedes acceder a tus archivos y herramientas desde el panel.
                </p>
                <ActionButton
                    title='Regresar'
                    iconName={"RefreshCcw"}
                    onClick={() => router.push(redirectPath)}
                />
            </div>
        </section>
    );
};

export default AuthenticationSection;
