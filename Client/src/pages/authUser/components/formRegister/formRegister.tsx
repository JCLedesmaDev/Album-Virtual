import { Input } from "../../../../Components/Input/Input";
import FormRegisterCSS from "./formRegister.module.css";
import { InputsMockRegister } from "../../mocks/inputsRegister";

import { useNavigate } from "react-router-dom"
import { IInputs } from "../../../../Components/Input/Inputs.interface";

import store from "../../store";


export const FormRegister: React.FC = () => {

  /// HOOKS
  const navigate = useNavigate();

  const { form, handleChange, resetForm } = store.state.formRegister

  const register = async (event: any) => {
    event.preventDefault();

    const isRegister = await store.actions.registerUser(form)

    if (!isRegister) return


    store.actions.setLoginFormActive(true)
    store.actions.setRegisterFormActive(false)

    resetForm()
  }

  return (

    // ${FormRegisterCSS.containerFormRegister}} 
    <div className={`
      ${store.state.registerFormActive
        ? FormRegisterCSS["containerFormRegister--show"]
        : FormRegisterCSS["containerFormRegister--hide"]}
    `}>

      <h2>Registrarse</h2>

      <form onSubmit={register}>

        {InputsMockRegister.map((inputProps: IInputs, index: number) => (
          <Input
            key={index}
            inputProps={inputProps}
            value={form[inputProps.name]}
            handleChange={handleChange}
            errorMessage={inputProps.errorMessage}
            pattern={inputProps.expReg}
          />
        ))}

        <button type="submit">Registrarse</button>
      </form>

    </div>
  );
};
