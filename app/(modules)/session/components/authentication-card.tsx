'use client'

import ButtonComponent from "@/components/action-button";
import { FaMicrosoft } from "react-icons/fa";

interface Props {
  title: string;
  description: string;
  microsoftAuthUrl: string;
}

const AuthorizationCard = ({
  title,
  description,
  microsoftAuthUrl
}: Props) => {

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
        onClick={() => (window.location.href = microsoftAuthUrl)}
        title="Iniciar Sesión"
      />
    </div>
  );
};

export default AuthorizationCard;
