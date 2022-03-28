import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {MessageService} from "../../services/message.service";
import {MessagePayload} from "../../core/models";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-discussion',
  template: `
    <nb-chat size="small" [title]="'Welcome to our chat room ' + (currentUser$ | async)?.name" scrollBottom="true">
      <nb-chat-message
        *ngFor="let msg of messages$ | async"
        [type]="msg.type"
        [message]="msg.messageContent"
        [reply]="msg.reply"
        [sender]="msg.user.name"
        [date]="msg.createDateTime"
        [avatar]="msg.user.avatar"
        dateFormat="y/M/d h:m:s"
      >
      </nb-chat-message>
      <nb-chat-form messagePlaceholder="Type your message" (send)="sendMessage($event)"
                    [dropFiles]="true"></nb-chat-form>
    </nb-chat>
  `,
  styles: [`
    .nb-theme-default nb-chat.size-small {
      /*height: 100% !important;*/
      min-height: 75vh !important;
    }
  `]
})
export class DiscussionComponent implements OnInit {

  messages$ = this._messageService.messages$;
  currentUser$ = this._userService.currentUser$;

  constructor(private _userService: UserService,
              private _messageService: MessageService,
              private _socket: Socket) { }

  ngOnInit(): void {
    this._messageService.list().subscribe(x => {
      console.log(x)
    })
  }

  sendMessage(payload: MessagePayload) {
    this._messageService.sendMessage(payload)
  }
}
