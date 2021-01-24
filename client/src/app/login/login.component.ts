import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    console.log('this.username, this.pass', this.username, this.password);
    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe((res) => {
        console.log('res', res);
        this.router.navigateByUrl('/products');
      });
  }
}
