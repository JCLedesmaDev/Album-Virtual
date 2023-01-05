import { IRolDto } from "./IRol.dto";

export interface IUserDto {
    id: string;
    fullName: string;
    email: string;
    roles: IRolDto[]
}