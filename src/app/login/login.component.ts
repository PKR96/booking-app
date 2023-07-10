import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../rest/rest.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserDTO } from '../user/user.dto';

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
  this.restService.exchangeForm(this.getUserFromFormData(this.loginForm), '/auth/login')
    .subscribe({
      next: (data:HttpResponse<any>) => {
        if(data && 200 == data.status){
          const user = data.body;
          const headers = data.headers;
          const token:any = 'Bearer '.concat(headers.get('Authorization') + '');
          this.authService.setJwt(token);
          sessionStorage.setItem('user',user.userName)
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
}
private getUserFromFormData(form: FormGroup):UserDTO{
  const username = form.get('username')?.value;
  const password = form.get('password')?.value;
  return new UserDTO(username,'',password,[]);
}
}
