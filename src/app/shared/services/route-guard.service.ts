import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private _router: Router, private authService: AuthService, private userService: UserService) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    return (async (resolve, reject) => {
      let user = await this.authService.getAuthentication();
      if (state.url === '/login') {
        if (user) {
          this.userService.setUserId(user);
          this._router.navigate(['/dashboard']);
          return false;
        }
        else {
          return true;
        }
      }
      else if (state.url === '/dashboard') {
        if (!user) {
          this._router.navigate(['/login']);
          return false;
        }
        else {
          this.userService.setUserId(user);
          return true;
        }
      }
      else{
        return true;
      }
    })();
  }
}
