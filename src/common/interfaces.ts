/* Copyright (C) 2009-2020, Nick Galko. All rights reserved.
*
* This file is part of the Nick Galko source-code
* (http://https://galek.github.io/portfolio/).
*
* Your use and or redistribution of this software in source and / or
* binary form, with or without modification, is subject to: (i) your
* ongoing acceptance of and compliance with the terms and conditions of
* the Nick Galko License Agreement; and (ii) your inclusion of this notice
* in any version of this software that you use or redistribute.
* A copy of the NGTech License Agreement is available by contacting
* Nick Galko. at http://https://galek.github.io/portfolio/
*/
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