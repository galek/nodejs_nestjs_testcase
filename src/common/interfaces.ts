/**
 * Interface of result object, what contains:
 * name,votes,position,timestamp
 * @public
 */
export interface ResultObject {
  name: string;
  votes: number;
  position: number;
  timestamp: number;
}

/**
 * Interface of ResponseObject, what contains:
 * success
 * @public
 */
export interface ResponseObject {
  success: boolean;
  description?: string;
  error?: string;
  data?: unknown;
  debugInfo?: unknown;
}

/**
 * Interface of PayLoadObject, what contains:
 * voteFor
 * @public
 */
export interface PayLoadObject {
  voteFor: string;
}
