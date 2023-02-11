import React from "react";
import { useNavigate } from "react-router-dom"
import { Input } from "../../../../Components/Input/Input";
import FormLoginCSS from "./FormLogin.module.css"

import { InputsMockLogin } from "../../mocks/inputsLogin";
import { IInputs } from "../../../../Components/Input/Inputs.interface";
import store from "../../store";


export const FormLogin: React.FC = () => {

  /// HOOKS
  const navigate = useNavigate();


  // const { formulario, handleChange, resetForm } = storeAuth.formularioLogin;
  const {form, handleChange, resetForm} = store.state.formLogin


  const login = async (event: any) => {

    event.preventDefault();

    const isLogin = await store.actions.loginUser(form)

    if (isLogin) navigate("/Album");
    resetForm()

  }


  return (

    // ${FormLoginCSS["containerFormLogin"]}} 
    <div className={`
      ${store.state.loginFormActive
        ? FormLoginCSS["containerFormLogin--show"]
        : FormLoginCSS["containerFormLogin--hide"]}
    `}>

      <h2>Iniciar Sesion</h2>

      <form onSubmit={login} >

        {InputsMockLogin.map((inputProps: IInputs, index: number) => (
          <Input
            key={index}
            inputProps={inputProps}
            value={form[inputProps.name]}
            handleChange={handleChange}
            errorMessage={inputProps.errorMessage}
            pattern={inputProps.expReg}
          />
        ))}
        <input type="text" />

        <button type="submit">Entrar</button>
      </form>

    </div>

  );
};
