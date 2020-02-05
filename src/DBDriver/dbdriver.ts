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
import { ResultObject, ResponseObject } from "../common/interfaces";
import { Injectable } from "@nestjs/common";

/**
 * DBDriver - emulation of DB, for test-case. Uses array inside. 
 * @private
 */
@Injectable()
export class DBDriver {
    votesArray: Array<ResultObject>
        = new Array<ResultObject>();


    /**
    * Function for write value to db 
    * @public
    */
    public writeToDB(value: string): ResponseObject {
        if (!value) return { success: false };
        return this._logicImpl(value);
    }

    /**
    * Implements get results from db function. It's NOT async function!
    * @public
    */
    public getResults() {
        this.votesArray.sort((a, b) => {
            if (a.votes > b.votes) { return -1; }
            if (a.votes < b.votes) { return 1; }
            return 0;
        });

        /*
        result: [{"name":"3","votes":2,"position":1,"timestamp":1580927100409},{"name":"4","votes":2,"position":2,"timestamp":1580927098313},{"name":"-1","votes":1,"position":3,"timestamp":1580927065863}]
        */
        this.votesArray.sort((a, b) => {
            // Частный случай: - когда votes одинаковы, обрабатываем приоритетный тот за который отдали первый голос (появился в базе данных самый первый)
            // Что и делаем, вводим timestamp
            // Можно сделать обработку как того, за которого отдали последний голос (см ниже)
            // TODO: см 'тут определите логику как нужно'
            if (b.votes === a.votes) {
                if (console) console.log('votes is equal');

                // Если нужно отображать тот за который проголосовали последним
                // return b.timestamp - a.timestamp;
                return a.timestamp - b.timestamp;
            }
            // Иначе обычная сортировка
            return b.votes - a.votes;
        });

        // Позиция не может быть отрицательной
        let index: number = 1;

        this.votesArray.forEach(element => {
            element.position = index;
            index++;
        });

        return this.votesArray;
    }

    /**
    * Implementation of logic
    * @private
    */
    private _logicImpl(value: string) {

        if (console) console.warn(JSON.stringify(this.votesArray));

        let obj = this.votesArray.find(obj => obj.name === value);
        if (obj) {
            if (console) console.warn('find before: ' + obj.votes);
            obj.votes++;
            if (console) console.warn('find now: ' + obj.votes);
            return { success: true };
            // TODO: тут определите логику как нужно
            // Обновляем дату последнего голоса
            // obj.timestamp = Date.now();
        }
        else {
            // Позиция не определена еще
            this.votesArray.push({ name: value, votes: 1, position: 0, timestamp: Date.now() });
            return { success: true };
        }

    }
}
