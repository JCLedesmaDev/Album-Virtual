import { useEffect } from "react";
import { FormLogin } from "./components/formLogin/formLogin";
import { FormRegister } from "./components/formRegister/formRegister";
import { MessageLogin } from "./components/messageLogin/messageLogin";
import { MessageRegister } from "./components/messageRegister/messageRegister";
import AuthCSS from "./Index.module.css"

import { AuthProvider } from "./context/authProvider";
import { useAuth } from "./context/useAuth";

export const AuthUser: React.FC = () => {


    /// HOOKS
    const storeAuth = useAuth()


    /// METODOS
    useEffect(() => {
        storeAuth.ChangeClassCssForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthProvider>

            <main className={AuthCSS.mainAuthentication}>
                <div className={AuthCSS.containerPage}>
                    <section className={AuthCSS["containerPage__Background"]}>
                        <MessageLogin />

                        <MessageRegister />
                    </section>

                    <section className={`
                         ${AuthCSS["containerPage__Auth"]} ${AuthCSS[storeAuth.GetClassCssFormModifed()]}
                    `}>
                        <FormLogin />

                        <FormRegister />
                    </section>
                </div>
            </main>

        </AuthProvider>
    )
}