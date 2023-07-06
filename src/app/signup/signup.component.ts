import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../rest/rest.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private restService: RestService, private authService: AuthService, private router: Router) {
    this.signupForm = new FormGroup({
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),

    });
  }

  ngOnInit(): void {

  }

  submit(): void {
    this.restService.exchangeForm(this.signupForm, '/signup')
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
