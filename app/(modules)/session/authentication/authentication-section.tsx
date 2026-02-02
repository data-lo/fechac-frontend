'use client';

// 1. React
import { useEffect } from "react";

// 2. Next.js
import { useRouter } from "next/navigation";

// 3. External libraries
import toast from "react-hot-toast";

// 4. Global UI components
import ActionButton from "@/components/action-button";

// 5. App actions
import { handleMicrosoftAuthCallback } from "@/actions/authorization/auth";

interface Props {
    title?: string;
    subtitle?: string;
    redirectPath?: string;
    buttonText?: string;
}

const AuthenticationSection = ({
    redirectPath = '/session/view',
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
            <div className="space-y-6 max-w-lg flex items-center flex-col">
                <h1 className="flex items-center justify-center gap-2 text-2xl font-semibold text-gray-800">
                    ¡Listo! Tu cuenta se vinculó con éxito
                </h1>
                <ActionButton
                    title='Regresar'
                    className='w-min'
                    iconName={"RefreshCcw"}
                    onClick={() => router.push(redirectPath)}
                />
            </div>
        </section>
    );
};

export default AuthenticationSection;
