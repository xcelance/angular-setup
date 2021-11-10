import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  	selector: 'app-header',
  	templateUrl: './header.component.html',
  	styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  userName: String = '';

	constructor(
		public authService: AuthService,
    private router: Router
	) { }

	ngOnInit(): void {
    let data = this.authService.getUser();
    if(data) {
      let user = JSON.parse(data);
      let _name = '';
      // get first name only.
      if(user && user.name) {
        var _arr = user.name.split(' ');
        _name = _arr[0];
      }

      this.userName = _name;
    }
  }

	onLogout = () => {
		this.authService.logout();
    this.router.navigate(['/']);
	}
}
