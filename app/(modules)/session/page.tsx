import { getUserInformation } from "@/actions/authentication-handler-action";
import AuthorizationCard from "./components/authentication-card";
import AuthenticatedUserCard from "./components/authentication-user-card";

const SessionPage = async () => {

    const user = await getUserInformation();

    console.log(user)

    return (
        <section className="py-6 px-8 w-full h-full overflow-y-auto flex flex-col">
            <div className="w-full flex flex-col h-auto gap-6">
                <h1 className="font-bold text-xl">Cuentas</h1>
                <div className="w-full flex flex-col h-auto gap-6">
                    {!user && (<AuthorizationCard description="Inicia sesión con la cuenta del usuario integrador para acceder a los archivos compartidos." title="Microsoft" />)}
                    {user && (<AuthenticatedUserCard user={user} />)}
                </div>
            </div>
        </section>
    )
}

export default SessionPage;