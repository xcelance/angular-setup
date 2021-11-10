import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../services/auth.service';

export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	  form: any;
	  processing = false;
    config: Config | undefined;

  	constructor(
  		private formBuilder: FormBuilder,
      private router: Router,
  		private authService: AuthService
  	) {
  		this.createForm();
  	}

  	createForm = () => {
  		this.form = this.formBuilder.group({
	      	email: ['', Validators.required],
	      	password: ['', Validators.required]
	    });
  	}
  	disableForm = () => {
  		this.form.controls['email'].disable();
  		this.form.controls['password'].disable();
  	}
  	enableForm = () => {
  		this.form.controls['email'].enable();
  		this.form.controls['password'].enable();
  	}

  	submitForm = (e: Event) => {
  		const that = this;
  		e.preventDefault();
  		this.processing = true;
  		this.disableForm()

      let formData = {
      	email: this.form.get('email').value,
      	password: this.form.get('password').value
      };

      this.authService.login(formData).subscribe((data: any) => {
        that.enableForm()
        that.processing = false;

        if(data) {
          this.authService.storeUserData(data);
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      });
  	}

  	ngOnInit() {}
}