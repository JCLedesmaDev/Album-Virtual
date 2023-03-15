import { IInputs } from "../../../../../components/Input/IInputs";

export const InputsMockAlbum: IInputs[] = [
    {
        placeholder: "Titulo del album: ",
        type: "text",
        name: "tile",
        expReg: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{2,40}$/i,
        errorMessage: "Solo puede contener letras. Minimo 2 caracteres",
    },
    {
        placeholder: "Url imagen: ",
        type: "text",
        name: "image",
        expReg: /^.{1,255}$/ ,
        errorMessage: "Minimo 1 caracter, maximo 255",
    }
];