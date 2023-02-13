export interface ILoginResponseDto {
    user: {
        id: string;
        fullName: string;
        email: string;
        roles: IRol[]
    }
    token: string;
}

interface IRol{
    name: string;
    id: string;
}