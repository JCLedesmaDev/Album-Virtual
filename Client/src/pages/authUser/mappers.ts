import { IUserModels } from "../../interface/models/IUser.models";
import { ILoginResponseDto } from "./interface/backToFront/ILoginResponse.dto";

export const userMapper = (LoginResponse: ILoginResponseDto): IUserModels => {
    const formattedUser: IUserModels = {
        id: LoginResponse.user?.id,
        fullName: LoginResponse.user?.fullName,
        email: LoginResponse.user?.email,
        // roles: 
        token: LoginResponse.token,
    };
    return formattedUser;
};
