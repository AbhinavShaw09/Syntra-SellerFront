import { DecodedToken } from "./token";


export type User = {
  accessToken: string;
  decoded: DecodedToken;
};