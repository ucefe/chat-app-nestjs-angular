import {Injectable} from '@angular/core';
import {User} from "../core/models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.serverUrl;
  currentUser = new BehaviorSubject<User | null>(null)

  constructor(private _http: HttpClient) {
  }

  authenticate(user: User) {
    return this._http.post<{ data: User }>(`${this.apiUrl}/api/v1/users`, user)
      .pipe(tap(data => {
        this.currentUser.next(data.data);
        localStorage.setItem('user', JSON.stringify(data.data))
      }));
  }

  get currentUser$() {
    if (this.currentUser.value) {
      return this.currentUser.asObservable();
    } else {
      this.currentUser.next(JSON.parse(localStorage.getItem('user') as string) as (User | null))
      return this.currentUser.asObservable()
    }
  }

}
