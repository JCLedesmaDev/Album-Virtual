import { IAuthData } from "../../../interface/DTO Back/Auth/IAuthData";
import { IUserModels } from "../../../Models/User.models";

export const createMapperUser = (AuthData: IAuthData): IUserModels => {

    const formattedUser: IUserModels = {
        id: AuthData.user?.id,
        fullName: AuthData.user?.nombreCompleto,
        email: AuthData.user?.email,
        token: AuthData.token,
    };

    return formattedUser;
};
