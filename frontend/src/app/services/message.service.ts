import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {Message, MessagePayload} from "../core/models";
import {Socket} from "ngx-socket-io";
import {UserService} from "./user.service";
import {tap} from "rxjs/operators";
import * as moment from 'moment'


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  apiUrl = environment.serverUrl;
  private _messages = new BehaviorSubject<Message[]>([]
    // [
    //   {
    //     type: 'text',
    //     messageContent: 'Custom template was provided as a title!',
    //     date: new Date(),
    //     reply: false,
    //     user: {
    //       name: 'Bot',
    //       avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
    //     },
    //   },
    // ]
  );

  constructor(private _http: HttpClient,
              private _socket: Socket,
              private _userService: UserService) {
    _socket.on('connect', (socket: any) => {
      _socket.on('messageToClient', (payload: any) => {
        console.log(payload)
        if (payload.user.name !== this._userService.currentUser.value?.name) {
          payload.reply = false;
          this._messages.next([...this._messages.value, payload])
        }
      })
    })
  }

  get messages$() {
    return this._messages.asObservable();
  }

  list() {
    return this._http.get<{ data: Message[] | any }>(`${this.apiUrl}/api/v1/messages`)
      .pipe(tap(data => {
        const msg = data.data.sort((x: Message, y: Message) => {
          return moment(new Date(x.createDateTime)).diff(new Date(y.createDateTime))
        })
        msg.forEach((x: any) => x.reply = x.user.name === this._userService.currentUser.value?.name)
        this._messages.next(msg);
      }))
  }

  sendMessage(payload: MessagePayload) {
    const data = {messageContent: payload.message, user: this._userService.currentUser.value,} as Message;
    data.reply = true;
    data.createDateTime = new Date();
    this._messages.next([...this._messages.value, data])
    this._socket.emit('messageToServer', data);
  }
}
