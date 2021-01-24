import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { RouterExtraService } from '../routerExtraService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private routerExtras: RouterExtraService
  ) {}

  ngOnInit(): void {
    console.log();
  }

  login() {
    // console.log('this.username, this.pass', this.username, this.password);
    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe((res) => {
        // console.log('res', res);
        console.log('prev url', this.routerExtras.getPreviousUrl());
        if (this.routerExtras.getPreviousUrl() == '/cart')
          this.apiService.checkout().subscribe();
        else this.router.navigateByUrl('/products');
      });
  }
}
