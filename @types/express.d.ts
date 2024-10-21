declare namespace Express {
    export interface Request {
        authUser: {
            id: string,
            iat: number,
            exp: number
          };
    }
  }