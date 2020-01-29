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