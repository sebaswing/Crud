export class login
{
    user:string;
    password:string;
    userType:string;

    constructor(user:string,password:string,userType:string){
        this.user=user;
        this.password=password;
        this.userType=userType;
    }
}