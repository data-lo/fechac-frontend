'use client';

import { MicrosoftUserInfo } from '@/interfaces/microsoft-user-info';
import { FaUserCircle } from 'react-icons/fa';
import ButtonComponent from '@/components/action-button';
import { handleLogout } from '@/actions/microsoft/authentication-handler';
import toast from 'react-hot-toast';

interface Props {
    user: MicrosoftUserInfo;
}

const AuthenticatedUserCard = ({ user }: Props) => {
    const handleClickLogout = () => {
        handleLogout()
            .then((response) => {
                toast.success(response.message);
            })
            .catch(() => {
                toast.error('Ocurrió un error al cerrar la sesión. Inténtalo nuevamente.');
            });
    };


    return (
        <div className="flex w-full items-center justify-between gap-4 rounded-md border p-4 shadow-sm bg-white">
            <div className="flex items-center gap-6">
                <FaUserCircle className="text-3xl text-gray-600" />
                <div>
                    <h3 className="text-base font-semibold text-gray-800">
                        Bienvenido, {user.displayName || user.givenName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {user.mail || user.userPrincipalName || 'Correo no disponible'}
                    </p>
                    {user.jobTitle && (
                        <p className="text-xs text-gray-500 mt-1">
                            Puesto: {user.jobTitle}
                        </p>
                    )}
                </div>
            </div>

            <ButtonComponent
                onClick={handleClickLogout}
                title="Cerrar Sesión"
            />
        </div>
    );
};

export default AuthenticatedUserCard;
