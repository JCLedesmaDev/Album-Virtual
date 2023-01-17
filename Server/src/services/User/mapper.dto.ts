import { IRol } from "../../interface/IRol";
import { IRolCollection } from "../../models/collections/Rol";
import { IUserCollection } from "../../models/collections/User";
import jwt from "../../utils/jwt";
import { IAuthDto } from "./dto/backToFront/IAuth.dto";


/**
 * Mappea los datos del usuario logueado que recibira el Front 
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
const singleUserAuth = async (resource: IUserCollection): Promise<IAuthDto> => {
    const mapper: IAuthDto = {
        token: jwt.tokenSign(resource),
        user: {
            id: resource._id,
            fullName: resource.fullName,
            email: resource.email,
            roles: multipleRoles(resource.roles as IRolCollection[])   
        }
    }
    return mapper
};

/**
 * Mappea los datos del rol que tendra el obj UsuarioMapp
 * @param userRoles Roles del usuario
 * @returns Nuevo objeto con los datos a eleccion
 */
const multipleRoles = (userRoles: IRolCollection[]): IRol[] => {
    const rolesMapper: IRol[] = userRoles.map( rol => {
        return {
            id: rol._id,
            name: rol.name
        }
    })
    return rolesMapper
} 
// const multipleUser = (resources, authUser) => resources.map((resource) => single(resource, authUser));

export default {
    singleUserAuth,
    multipleRoles
};


