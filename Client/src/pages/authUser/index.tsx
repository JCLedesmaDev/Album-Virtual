import { useEffect } from "react";
import { FormLogin } from "./components/formLogin/formLogin";
import { FormRegister } from "./components/formRegister/formRegister";
import { MessageLogin } from "./components/messageLogin/messageLogin";
import { MessageRegister } from "./components/messageRegister/messageRegister";
import AuthCSS from "./Index.module.css"

import { AuthProvider } from "./context/authProvider";
import { useAuth } from "./context/useAuth";


import { useAuthUserStore } from "./store";
import { shallow } from 'zustand/shallow'

export const AuthUser: React.FC = () => {


    const store = useAuthUserStore((state) => (state), shallow)


    /// HOOKS
    const storeAuth = useAuth()


    /// METODOS
    useEffect(() => {
        storeAuth.ChangeClassCssForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthProvider>

            {store.user}
            {store.isLogin}

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