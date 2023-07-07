export class UserDTO{

    private userName: string;
    private email: string;
    private password: string;
    private roles:any[];


    constructor(userName: string, email: string, password: string,roles:any[]){
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.roles = roles;
        
    }
}