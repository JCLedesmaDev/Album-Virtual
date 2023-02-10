import { shallow } from "zustand/shallow";
import { useAuth } from "../../context/useAuth";
import { useAuthUserStore } from "../../store";
import MessageRegisterCSS from "./messageRegister.module.css";



export const MessageRegister: React.FC= () => {

  /// HOOKS
  const store = useAuthUserStore((state) => (state), shallow)

  // const { resetForm } = storeAuth.formularioLogin;


  const goToRegister = (): void => {

    store.actions.setLoginFormActive(false)
    store.actions.setRegisterFormActive(true)

    // resetForm()
  }

  return (
    <article className={`
        ${MessageRegisterCSS.containerBackgroundRegister} 
        ${store.state.registerFormActive ? MessageRegisterCSS.noneElement : ""}
      `}
      style={store.state.loginFormActive ? {"opacity": 1} : {"opacity": 0}}
    >
      <h3>¿Aun no tienes una cuenta?</h3>
      <p>Registrate para que puedas iniciar sesion</p>

      <button onClick={goToRegister}> Registrarse </button>
    </article>
  );
};
