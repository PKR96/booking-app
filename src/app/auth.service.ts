import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_KEY = 'JWT';

  constructor() { }

  public setJwt(token: string): void {
    sessionStorage.setItem(this.JWT_KEY, token);
  }

  public getJwt(): string | null {
    return sessionStorage.getItem(this.JWT_KEY);
  }

  public removeJwt(): void {
    sessionStorage.removeItem(this.JWT_KEY);
  }

  public isJWTValid(token:string):boolean{
    try{
      jwt.isValid(token, this.getJwt);
      return true;
    }
    catch(error){
      console.log(error)
      return false;
    }
  }
}
