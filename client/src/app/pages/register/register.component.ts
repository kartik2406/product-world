import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register() {
    this.authService
      .register({
        username: this.username,
        password: this.password,
      })
      .subscribe((res) => {
        this.toastr.success('You have successfully created your account');
        this.router.navigateByUrl('/login');
      });
  }
}
