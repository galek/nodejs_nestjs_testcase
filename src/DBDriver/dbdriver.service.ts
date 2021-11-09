import { ResponseObject, ResultObject } from '../common/interfaces';
import { Injectable } from '@nestjs/common';

/**
 * DBDriver - emulation of DB, for test-case. Uses array inside.
 * @public
 */
@Injectable()
export class DBDriverService {
    votesArray: Array<ResultObject> = new Array<ResultObject>();

    writeToDB(value: string): ResponseObject {
        if (value?.length <= 1) return {
            success: false, description: "[DBDriverService.writeToDB] Invalid value has been provided"
        }

        return this._logicImpl(value);
    }

    getResults(): Array<ResultObject> {
        this.votesArray.sort((a, b) => {
            if (a.votes > b.votes) {
                return -1;
            }
            if (a.votes < b.votes) {
                return 1;
            }
            return 0;
        });

        this.votesArray.sort((a, b) => {
            // Частный случай: - когда votes одинаковы, обрабатываем приоритетный тот за который отдали первый голос (появился в базе данных самый первый)
            // Что и делаем, вводим timestamp
            // Можно сделать обработку как того, за которого отдали последний голос (см ниже)
            // TODO: см 'тут определите логику как нужно'
            if (b.votes === a.votes) {

                // Если нужно отображать тот за который проголосовали последним
                // return b.timestamp - a.timestamp;
                return a.timestamp - b.timestamp;
            }

            // Иначе обычная сортировка
            return b.votes - a.votes;
        });

        // TODO: simplify

        // Позиция не может быть отрицательной
        let index = 1;

        this.votesArray.forEach((element) => {
            element.position = index;
            index++;
        });

        return this.votesArray;
    }

    private _logicImpl(value: string) {
        const obj = this.votesArray.find((obj) => obj.name === value);
        if (!obj) {
            // Позиция не определена еще
            this.votesArray.push({
                name: value,
                votes: 1,
                position: 0,
                timestamp: Date.now(),
            });

            return { success: true, debugInfo: 'created new user' }
        }

        obj.votes++;

        return { success: true, debugInfo: 'increment for user' }
        // TODO: тут определите логику как нужно
        // Обновляем дату последнего голоса
        // obj.timestamp = Date.now();
    }
}
