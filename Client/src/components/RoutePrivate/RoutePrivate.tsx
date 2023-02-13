import {  } from "react-router";
 import { Route, Navigate} from "react-router-dom";
import { IUserModels } from "../../interface/models/IUser.models";
import { getStorage } from "../../utils/updateStorage";

interface IRoutePrivate {
    children: JSX.Element;
    redirectTo?: string;
}

export const RoutePrivate: React.FC<IRoutePrivate> = ({ children, redirectTo ="/" }) => {

    /* TODO: �No deberia pegar al back enviando este token para ver si coincide
       con el token actual almacenado?
       Tb deberia hacer que el back me actualice el token cuando envie una peticion y 
       vea q mi token expiro!
    */
    const jwt = getStorage<IUserModels>("User")?.token;


    if (jwt == undefined) {
        return <Navigate to={redirectTo} />
    }

    return children
 };
