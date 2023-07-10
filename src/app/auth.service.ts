import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTHORIZATION ='Authorization';

  constructor() { }

  public setJwt(token: string): void {
    sessionStorage.setItem(this.AUTHORIZATION, token);
  }

  public getJwt(): string | null {
    return sessionStorage.getItem(this.AUTHORIZATION);
  }

  public removeJwt(): void {
    sessionStorage.removeItem(this.AUTHORIZATION);
  }

  // public isJWTValid(token:string):boolean{
  //   try{
  //     jwt.verify(token, this.getJwt);
  //     return true;
  //   }
  //   catch(error){
  //     console.log(error)
  //     return false;
  //   }
  // }
}
