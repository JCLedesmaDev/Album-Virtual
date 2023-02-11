import { useEffect } from "react";
import { FormLogin } from "./components/formLogin/formLogin";
import { FormRegister } from "./components/formRegister/formRegister";
import { MessageLogin } from "./components/messageLogin/messageLogin";
import { MessageRegister } from "./components/messageRegister/messageRegister";
import AuthCSS from "./Index.module.css"

import store from "./store";

export const AuthUser: React.FC = () => {

    /// METODOS
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        store.actions.changeStyleForm();
    }, [])

    return (
        <main className={AuthCSS.mainAuthentication}>
            <div className={AuthCSS.containerPage}>
                <section className={AuthCSS["containerPage__Background"]}>
                    <MessageLogin />

                    <MessageRegister />
                </section>

                <section className={`
                   ${AuthCSS["containerPage__Auth"]} ${AuthCSS[store.state.styleForm]}
                `}>
                    <FormLogin />

                    <FormRegister />
                </section>
            </div>
        </main>
    )
}