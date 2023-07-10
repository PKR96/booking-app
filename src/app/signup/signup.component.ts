import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../rest/rest.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserDTO } from '../user/user.dto';
import { RoleDTO } from '../user/role.dto';

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
      password: new FormControl('')

    });
  }

  ngOnInit(): void {

  }

  submit(): void {
    this.restService.exchangeForm(this.getUserFromFormData(this.signupForm), '/auth/signup')
      .subscribe({
        next: (data:HttpResponse<any>) => {
          if(data  && 200 === data.status){
            const user = data.body;
            const headers = data.headers;
            const token:any = 'Bearer '.concat(headers.get('Authorization') + '');
            console.log(token);
            this.authService.setJwt(token);
            sessionStorage.setItem('user',user.userName)
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
        }
      })
  }

  private getUserFromFormData(form: FormGroup):UserDTO{
    const username = form.get('username')?.value;
    const password = form.get('password')?.value;
    const email = form.get('email')?.value;
    const role: RoleDTO = new RoleDTO(null,'GUEST');
    return new UserDTO(username,email,password,[role]);
  }

}
