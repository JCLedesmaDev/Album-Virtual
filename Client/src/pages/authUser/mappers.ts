import { IAuthData } from "../../interface/dto/backToFront/Auth/IAuthData";
import { IUserModels } from "../../interface/models/IUser.models";

export const userMapper = (AuthData: IAuthData): IUserModels => {
    const formattedUser: IUserModels = {
        id: AuthData.user?.id,
        fullName: AuthData.user?.nombreCompleto,
        email: AuthData.user?.email,
        token: AuthData.token,
    };
    return formattedUser;
};
