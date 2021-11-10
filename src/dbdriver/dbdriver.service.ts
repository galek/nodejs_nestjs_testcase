import { ResultObject } from '../common/interfaces';
import { Injectable } from '@nestjs/common';

/**
 * DBDriver - emulation of DB, for test-case. Uses array inside.
 * @public
 */
@Injectable()
export class DBDriverService {
  private readonly votesArray: Array<ResultObject> = new Array<ResultObject>();

  writeToDB(value: string): number {
    if (value?.length <= 1) {
      return -1;
    }

    return this.logicImpl(value);
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

    // Позиция в рейтинге не может быть отрицательной
    let index = 1;

    this.votesArray.forEach((element: ResultObject) => {
      element.position = index;
      index++;
    });

    return this.votesArray;
  }

  private logicImpl(value: string): number {
    const obj = this.votesArray.find((obj) => obj.name === value);
    if (!obj) {
      // Позиция не определена еще
      this.votesArray.push({
        name: value,
        votes: 1,
        position: 0,
        timestamp: Date.now(),
      });

      return 0;
    }

    obj.votes++;

    return 1;
  }
}
