import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";
import {Socket} from "ngx-socket-io";
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-welcom',
  template: `
    <nb-card>
      <nb-card-body class="example-items-rows">
        <form [formGroup]="form" (ngSubmit)="submitName()">
          <h3>Whats you're name?</h3>
          <input [status]="inputStatus" style="margin-right: 20px" nbInput id="name" formControlName="name" placeholder="Mohmad">
          <button nbButton type="submit" status="primary">Let's chat</button>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  styles: []
})
export class WelcomeComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    name: new FormControl()
  });
  isError: boolean = false;
  inputStatus: 'danger' | 'success' | 'basic' = 'basic';


  private _unsubscribeAll = new Subject();

  constructor(private _userService: UserService,
              private _router: Router,
              private _socket: Socket,
              private toastrService: NbToastrService) {

    // this._socket.emit('messageToServer', {
    //   messageContent: 'hello there',
    //   user: {
    //     id: "65359bc7-97d9-4248-972e-3432137aa223",
    //     name: 'ucefe'
    //   }
    // });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submitName() {
    this._userService.authenticate(this.form.value)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.showToast('Connected successfully', 'success');
        this._router.navigate(['chat'])
      }, err => {
        this.showToast(err.error.message, 'danger');
        this.isError = true;
        this.inputStatus = 'danger'
      });
  }

  showToast(message: string, status: any) {
    this.toastrService.show(message, (status === 'danger') ? 'Error' : 'Success',
      { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: status });
  }

}
