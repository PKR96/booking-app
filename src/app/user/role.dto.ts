import { UserDTO } from "./user.dto";

export class RoleDTO{

    private id:any;
    private roleType:string;

    constructor(id:any,roleType:string){
    this.id=id;
    this.roleType = roleType;
    }
}