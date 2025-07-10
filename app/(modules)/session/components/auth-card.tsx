'use client'

import ButtonComponent from "@/components/button-component";
import { FaMicrosoft } from "react-icons/fa";

interface Props {
  description: string;
  title: string;
}

const AuthCard = ({ title, description }: Props) => {
  const handleRedirect = () => {
    const CLIENT_ID = '0416a1fc-d18a-4f93-a8b8-fd5ae59778ae';
    const TENANT_ID = 'a513d65b-6e93-4b9d-9a53-00f2decda084';
    const REDIRECT_URI = encodeURIComponent('http://localhost:3000/session/authentication');
    const SCOPES = encodeURIComponent('User.Read offline_access');
    const STATE = encodeURIComponent('user123-sessiontoken');

    const url = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&response_mode=query&scope=${SCOPES}`;
    window.location.href = url
  }

  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-md border p-4 shadow-sm">
      <div className="flex items-center gap-6">
        <FaMicrosoft className="text-2xl text-blue-600" />
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <ButtonComponent
        onClick={handleRedirect}
        title="Iniciar Sesión"
      />
    </div>
  );
};

export default AuthCard;
