'use client'

import ButtonComponent from "@/components/button-component";
import { FaMicrosoft } from "react-icons/fa";

interface Props {
  description: string;
  title: string;
}

const AuthorizationCard = ({ title, description }: Props) => {
  const handleRedirect = () => {
    const CLIENT_ID = '5244cd55-d3a5-405a-8201-ccffb461e8a4';
    const TENANT_ID = 'common';
    const REDIRECT_URI = encodeURIComponent('http://localhost:3000/session/authentication');
    const SCOPES = encodeURIComponent('https://graph.microsoft.com/User.Read https://graph.microsoft.com/Files.Read offline_access');

    const url = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&response_mode=query&scope=${SCOPES}&prompt=consent`;
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

export default AuthorizationCard;
