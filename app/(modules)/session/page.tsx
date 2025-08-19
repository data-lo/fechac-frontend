import { getUserInformation } from "@/actions/authentication-handler-action";
import AuthorizationCard from "./components/authentication-card";
import AuthenticatedUserCard from "./components/authentication-user-card";

const SessionPage = async () => {

    const user = await getUserInformation();

    const SCOPES = encodeURIComponent('https://graph.microsoft.com/User.Read https://graph.microsoft.com/Files.Read offline_access');

    const microsoftAuthUrl = `https://login.microsoftonline.com/${process.env.TENANT_TYPE}/oauth2/v2.0/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&response_mode=query&scope=${SCOPES}&prompt=consent`;

    return (
        <section className="py-6 px-8 w-full h-full overflow-y-auto flex flex-col">
            <div className="w-full flex flex-col h-auto gap-6">
                <h1 className="font-bold text-xl">Cuentas</h1>
                <div className="w-full flex flex-col h-auto gap-6">
                    {!user && (
                        <AuthorizationCard
                            description="Inicia sesión con la cuenta del usuario integrador para acceder a los archivos compartidos."
                            title="Microsoft" 
                            microsoftAuthUrl={microsoftAuthUrl} 
                            />
                    )}
                    {user && (<AuthenticatedUserCard user={user} />)}
                </div>
            </div>
        </section>
    )
}

export default SessionPage;