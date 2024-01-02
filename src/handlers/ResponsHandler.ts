
export const ErrorHandler = (errorMsg : object,errorState:Number,res:any)=>{
    res.status(errorState).json(errorMsg);
}

export const SuccasHandler = (errorMsg : object,errorState:Number,res:any)=>{
    res.status(errorState).json(errorMsg);
}