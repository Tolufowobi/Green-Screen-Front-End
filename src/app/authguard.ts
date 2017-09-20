import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
}   from '@angular/router';
import {AppGlobals} from './appglobals';

@Injectable()
export class AuthGuard implements CanActivate {

    isLoggedIn:boolean;
  constructor(private router: Router, appglobals:AppGlobals) {
    appglobals.isloggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    if(this.isLoggedIn = false){
        this.router.navigate(['']);
        return false
    }
    else{
        return true;
    }
  }
}