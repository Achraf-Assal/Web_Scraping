
const bcrypt = require('bcrypt')

export function  comparePasswor(password:string,user:any){
    return new Promise((resolve:any,reject:any)=>{
        if (user) {
            bcrypt.compare(password,user.password,(err:any,result:boolean)=>{
                if (result == false) {
                    console.log("incorrect password");
                    reject({
                        error:new Error("incorrect password"),
                        statusCode:401
                    });
                }else{
                     resolve(user);
                }
            })
        }
        else{
            console.log("incorrect email");
            reject({
                error: new Error("Incorrect email"),
                statusCode: 401
            });
        }
    })
}
