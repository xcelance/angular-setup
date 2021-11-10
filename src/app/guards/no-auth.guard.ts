import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  	providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
	constructor(
	    private authService: AuthService,
	    private router: Router
  	) { }

  	canActivate(
	    route: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot
   	) {
    	if (this.authService.loggedIn()) {
    		this.router.navigate(['/']);
    		return false;
    	} else {
    		return true;
    	}
  	}
  
}
