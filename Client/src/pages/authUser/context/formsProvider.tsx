import { createContext } from "react";

import { useFormCustom } from "../../../Hooks/useFormCustom";
import { IDataLoginForm } from "../../../interface/DTO Front/Auth/IDataLoginForm";
import { IDataRegisterForm } from "../../../interface/DTO Front/Auth/IDataRegisterForm";


/* Interface de las propiedades / metodos que podremos utilziar en los Componentes */
interface IFormsContext {
  formLogin: any;
  formRegister: any;
}
/* Este Context tendra alojada toda la informacion que compartiremos con nuestros componentes */
export const FormsContext = createContext<IFormsContext>({} as IFormsContext);



interface Props {
  children: JSX.Element | JSX.Element[];
}

export const FormsProvider: React.FC<Props> = (props) => {

  /// HOOKS
  const formLogin = useFormCustom<IDataLoginForm>({
    Email: '', Password: ''
  });
  const formRegister = useFormCustom<IDataRegisterForm>({
    EmailRegister: '', PasswordRegister: '', ConfirmPassword: '', NombreCompleto: ''
  })

  return (
    <FormsContext.Provider value={{ formLogin, formRegister }}    >
      {props.children}
    </FormsContext.Provider>
  );
};