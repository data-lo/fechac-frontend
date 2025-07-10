'use client'

import ButtonComponent from "@/components/button-component";
import { FaMicrosoft } from "react-icons/fa";

interface Props {
  description: string;
  title: string;
}

const AuthCard = ({ title, description }: Props) => {
  const handleRedirect = () => {
    const url = `https://login.microsoftonline.com/a513d65b-6e93-4b9d-9a53-00f2decda084/oauth2/v2.0/authorize`
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
