interface Ilocals {
  usrId: string;
  usrToken: string;
  usrRoles: IRol[];
  
  mockmode: string;
  info: any;
  result: any;
  finished: boolean
}

declare namespace Express {
  interface Request {
    locals: Ilocals;
  }
}