export interface ResultObject {
  name: string;
  votes: number;
  position: number;
}

export interface ResponseObject {
  success: boolean;
}

export interface PayLoadObject {
  voteFor: string;
}

export interface AbstactKey { accessKey: string; }
export interface AbstactToken { accessToken: string; }
