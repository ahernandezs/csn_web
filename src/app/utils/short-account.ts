import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortaccount'})
export class ShortAccount implements PipeTransform {
  transform(account: string): string {
    let short = account.split('-')[0]
    return "***"+short.substr(short.length - 3);
  }
}