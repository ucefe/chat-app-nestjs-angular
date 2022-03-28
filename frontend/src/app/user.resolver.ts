import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "./services/user.service";
import {User} from "./core/models";
import {map, take} from "rxjs/operators";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
  constructor(private userService: UserService,
              private router: Router,
              private toastrService: NbToastrService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userService.currentUser$.pipe(map((x) => {
      if (x) {
        console.log('connected')
        console.log(x)
        return x
      } else {
        this.toastrService.show(
          'User not connected',
          'Error',
          { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'danger' })
        return this.router.navigate([''])
      }
    }), take(1));
  }
}
