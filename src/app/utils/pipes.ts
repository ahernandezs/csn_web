import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({name: 'shortaccount'})
export class ShortAccount implements PipeTransform {
  transform(account: string): string {
    let short = account.split('-')[0]
    return "***"+short.substr(short.length - 3);
  }
}

@Pipe({name: 'translate'})
export class Translate implements PipeTransform {
  transform(date: string): string {
    let fecha = '';
    if(date === 'January')
      fecha = 'Enero';
    else if(date === 'February')
      fecha = 'Febrero';
    else if(date === 'March')
      fecha = 'Marzo';
    else if(date === 'April')
      fecha = 'Abril';
    else if(date === 'May')
      fecha = 'Mayo';
    else if(date === 'June')
      fecha = 'Junio';
    else if(date === 'July')
      fecha = 'Julio';
    else if(date === 'August')
      fecha = 'Agosto';
    else if(date === 'September')
      fecha = 'Septiembre';
    else if(date === 'October')
      fecha = 'Octubre';
    else if(date === 'November')
      fecha = 'Noviembre';
    else if(date === 'December')
      fecha = 'Diciembre';
    else if(date === 'Monday')
      fecha = 'Lunes';
    else if(date === 'Tuesday')
      fecha = 'Martes';
    else if(date === 'Wednesday')
      fecha = 'Miércoles';
    else if(date === 'Thursday')
      fecha = 'Jueves';
    else if(date === 'Friday')
      fecha = 'Viernes';
    else if(date === 'Saturday')
      fecha = 'Sábado';
    else if(date === 'Sunday')
      fecha = 'Domingo';
    else 
      fecha = date;
    return fecha;
  }
}

@Pipe({name: 'search', pure: false})
@Injectable()
export class Search implements PipeTransform {
  transform(data: any[], searchTerm: string): any[] {
      searchTerm = searchTerm.toUpperCase();
      return data.filter(item => {
        return item.description.toUpperCase().indexOf(searchTerm) !== -1 
      });
  }
}

@Pipe({name: 'atm', pure: false})
@Injectable()
export class ATM implements PipeTransform {
  transform(data: any[], searchTerm: string): any[] {
      return data.filter(item => {
        return item.description.type === searchTerm
      });
  }
}

@Pipe({name: 'searchATM', pure: false})
@Injectable()
export class SearchATM implements PipeTransform {
  transform(data: any[], searchTerm: string): any[] {
      searchTerm = searchTerm.toUpperCase();
      return data.filter(item => {
        let value = false;
        if(item.description.address.street.toUpperCase().indexOf(searchTerm) !== -1)
          value = true;
        if(item.description.address.colony.toUpperCase().indexOf(searchTerm) !== -1)
          value = true;
        if(item.description.address.zipCode.toUpperCase().indexOf(searchTerm) !== -1)
          value = true;
        if(item.description.address.delegation.toUpperCase().indexOf(searchTerm) !== -1)
          value = true;
        if(item.description.address.city.toUpperCase().indexOf(searchTerm) !== -1)
          value = true;
        return value;
      });
  }
}
