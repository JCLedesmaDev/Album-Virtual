type Method = 'POST' | 'GET' | 'PUT' | 'DELETE'

export interface ICallSrv {
    method: Method;
    path: string;
    data?: any
}