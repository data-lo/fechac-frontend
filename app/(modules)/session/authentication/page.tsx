import AuthenticationSection from "./authentication-section";

const AuthenticationPage = () =>{
    
    return (
        <section className="py-6 px-8 w-full h-full overflow-y-auto flex flex-col">
            <div className="w-full flex flex-col h-full gap-6">
               <AuthenticationSection/>
            </div>
        </section>
    );

}

export default AuthenticationPage;