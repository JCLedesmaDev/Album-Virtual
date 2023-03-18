import { IInputs } from "../../../../../components/Input/IInputs";

export const InputsMockFiguritas: IInputs[] = [
    {
        placeholder: "Ingrese titulo de la figurita",
        type: "text",
        name: "title",
        expReg: /^.{1,255}$/,
        errorMessage: "Minimo 1 caracter, maximo 255",
    },
    {
        placeholder: "Url imagen: ",
        type: "text",
        name: "image",
        expReg: /^.{1,255}$/ ,
        errorMessage: "Minimo 1 caracter, maximo 255",
    }
];