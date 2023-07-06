import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../rest/rest.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

loginForm: FormGroup;


constructor(private restService: RestService, private authService: AuthService, private router: Router){
  this.loginForm = new FormGroup({
  username: new FormControl(''),
  password: new FormControl('')
  });
}

ngOnInit(): void {
  
}

submit(): void {
  this.restService.login(this.loginForm, '/login')
    .subscribe({
      next: (data:HttpResponse<any>) => {
        console.log(data)
        if(data && 200 == data.status){
          const user = data.body;
          if(user){
          this.authService.setJwt(user.token);
          const userParam = encodeURIComponent(JSON.stringify(user));
          this.router.navigate(['/dashboard',{queryParams: {user: userParam}}]);
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
}

}
