import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token){
      this.router.navigate(['main']);
    }
  }

  login(): void{
    this.authService.login(this.username, this.password).subscribe(token => {
      // console.log(token);
      localStorage.setItem('token', token.token);
      this.username = '';
      this.password = '';
      window.location.reload();
    });
  }
}
