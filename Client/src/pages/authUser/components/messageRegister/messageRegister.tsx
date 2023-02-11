
import MessageRegisterCSS from "./messageRegister.module.css";
import store from "../../store";



export const MessageRegister: React.FC= () => {

  /// HOOKS

  // const { resetForm } = storeAuth.formularioLogin;
  const { resetForm} = store.state.formLogin


  const goToRegister = (): void => {
    store.actions.setLoginFormActive(false)
    store.actions.setRegisterFormActive(true)

    resetForm()
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
