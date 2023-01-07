import { IUser } from "../../../../interface/IUser";

export interface IAuthDto {
    token: string;
    user: IUser
}