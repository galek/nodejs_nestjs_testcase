
/**
 * This is a simple interface.
 */
export interface ResultObject {
  name: string;
  votes: number;
  position: number;
  timestamp: number;
}

export interface ResponseObject {
  success: boolean;
}

export interface PayLoadObject {
  voteFor: string;
}

export interface AbstactKey { accessKey: string; }
export interface AbstactToken { accessToken: string; }

/*bug list:
Если токен протух, то пост запросы можно слать и они будут обрабатываться (в логах сервера),
но не отображаться
*/