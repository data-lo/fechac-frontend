import AuthCard from "./components/auth-card";

const SessionPage = () => {
    return (
        <section className="py-6 px-8 w-full h-full overflow-y-auto flex flex-col">
            <div className="w-full flex flex-col h-auto gap-6">
                <AuthCard description="Inicia sesión con la cuenta del usuario integrador para acceder a los archivos compartidos." title="Microsoft" />
            </div>
        </section>
    )
}

export default SessionPage;