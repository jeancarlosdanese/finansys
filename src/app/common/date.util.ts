import { ObjectUtil } from './object.util';

import * as moment from 'moment';
import 'moment/locale/pt-br';

/**
 *
 */
export class DateUtil {

    constructor() {
      moment.locale('pt-BR');
      moment.fn.toISOString = function(){
        return moment(this).utc().format('YYYY-MM-DD[T]HH:mm:ss');
      };
    }

    /**
     Converte uma string no formato '2008-04-02T08:00:00.000Z'
     */
    static toDate(value: string): Date {
      if (ObjectUtil.isEmpty(value) || value.length < 23) {
        return null;
      } else {
        return new Date(value);
      }
    }

    /**
     Converte um Date para uma string no formato '2008-04-02T08:00:00.000Z'
     */
    static toHoraISOString(value: Date): string {
      if (value == null) {
        return null;
      }  else {
        const data = value.toISOString();
        const hora: string = data.substring(11, 19);
        return hora;
      }
    }

    static momentToHoraString(value: moment.Moment): string {
      if (value == null) {
        return null;
      }  else {
        const data = value.toString();
        const hora: string = data.substring(16, 25);
        return hora;
      }
    }

    /**
     Converte um Date para uma string no formato '2008-04-02T08:00:00.000Z'
     */
    static toDateTimeISOString(value: moment.Moment): string {
      if (value == null) {
        return null;
      }  else {
        return value.toISOString();
      }
    }

    /**
     Converte um Date para uma string no formato '2008-04-02'
     */
    static toDateISOFilterString(value: moment.Moment): string {
      if (value == null) {
        return null;
      }  else {
        const data = moment(value);

        return data.format('YYYY-MM-DD');
      }
    }

     /**
     Converte um Date para uma string no formato '2008-04-02'
     */
    static toDateISOFilter(value: moment.Moment): string {
      if (value == null) {
        return null;
      }  else {
        const data = moment(value);

        return data.format('DD-MM-YYYY');
      }
    }

    /**
     Converte um Date para uma string no formato '10/10/2010'
     */
    static toDateISOString(value: moment.Moment): string {
      if (value == null) {
        return null;
      }  else {
        const data = moment(value);

        return data.format('DD/MM/YYYY');
      }
    }

    static toDateTimeString(value: Date): string {
      if (value == null) {
        return null;
      } else {
        const data =  moment(value);
        return data.format('YYYY-MM-DD[T]HH:mm:ss');
      }
    }

    static hojeFormatPtBR(): string {
      const hoje = moment(new Date());

      return hoje.format('DD/MM/YYYY');
    }

    static hojeFormatExtensoPtBR(): string {
      const hoje = moment(new Date());
      return hoje.format('LL');
    }

    static mesAtualCompleto(): string {
      const data = moment(new Date());
      return data.format('MMMM/YYYY');
    }
}
