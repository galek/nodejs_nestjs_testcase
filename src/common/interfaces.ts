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
}

/**
 * Interface of PayLoadObject, what contains:
 * voteFor
 * @public
 */
export interface PayLoadObject {
  voteFor: string;
}

/**
 * Interface of AbstactKey, what contains:
 * accessToken
 * @public
 */
export interface AbstactToken { access_token: string; }

/*bug list:
Если токен протух, то пост запросы можно слать и они будут обрабатываться (в логах сервера),
но не отображаться
*/
