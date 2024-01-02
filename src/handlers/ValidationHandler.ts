
export const ValidationErrorHandler = (error:any)=>{
    
    let errors = {"email":"","password":""};
    try {
        if (error.errors.hasOwnProperty('email')&&error.errors.hasOwnProperty('password')) {
        errors.email = error.errors.email.message;
        errors.password = error.errors.password.message;
        let errorMsg = {"message":"user authntcation error",
        "error":errors};
        return errorMsg
    }
    if (error.errors.hasOwnProperty('email')) {
        errors.email = error.errors.email.message;
        let errorMsg = {"message":"user authntcation error",
        "error":errors};
        return errorMsg
    }
    if (error.errors.hasOwnProperty('password')) {
        errors.password = error.errors.password.message;
        let errorMsg = {"message":"user authntcation error",
        "error":errors};
        return errorMsg
    }

    let errorMsg = {"message":"internal server error",
        "error":error};
    return errorMsg
    } catch (error) {
        
    }
    return error;
}