import React from "react";
import shallow from "zustand/shallow";
import { useAuthUserStore } from "../../store";
import MessageLoginCSS from "./messageLogin.module.css";



export const MessageLogin: React.FC = () => {

  /// HOOKS
  const store = useAuthUserStore((state) => (state), shallow)

  // const { resetForm } = storeAuth.formularioRegister;

  /// METOODS
  const goToLogin = (): void => {

    store.actions.setLoginFormActive(true)
    store.actions.setRegisterFormActive(false)


    // resetForm()
  }

  return (

    <article className={`
          ${MessageLoginCSS.containerBackgroundLogin} 
          ${store.state.loginFormActive ? MessageLoginCSS.noneElement : ""}
        `}
      style={store.state.registerFormActive ? { "opacity": 1 } : { "opacity": 0 }}
    >

      <h3> ¿Ya tienes una cuenta?</h3>
      <p> Inicia sesion para entrar a la pagina</p>

      <button onClick={goToLogin}> Iniciar sesion </button>

    </article>
  );
};
