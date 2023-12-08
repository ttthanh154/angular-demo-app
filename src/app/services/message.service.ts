import { Injectable } from '@angular/core';
import moment from 'moment'
import 'moment/locale/vi'
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: string[] = []

  constructor() { }

  public add(message:string):void{
    moment.locale('vi');
    const date = moment().format('llll');
    this.messages.push(`Date: ${date} - ${message}`)
  }

  public clear():void{
    this.messages = []
  }
}
