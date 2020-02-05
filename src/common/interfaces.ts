
/**
 * Interface of result object, what contains:
 * name,votes,position,timestamp
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
 */
export interface ResponseObject {
  success: boolean;
}

/**
 * Interface of PayLoadObject, what contains:
 * voteFor
 */
export interface PayLoadObject {
  voteFor: string;
}


// TODO: DEPRECATED
/**
 * Interface of AbstactKey, what contains:
 * accessKey
 */
// export interface AbstactKey {
//   // TODO: For test-case use it
//   //  accessKey: string; 
//   // TODO: not this;
//   username: string; pass: string;
// }

/**
 * Interface of AbstactKey, what contains:
 * accessToken
 */
export interface AbstactToken { access_token: string; }

/*bug list:
Если токен протух, то пост запросы можно слать и они будут обрабатываться (в логах сервера),
но не отображаться
*/