
export const ErrorHandler = (errorMsg : object,errorState:Number,res:any)=>{
    res.status(errorState).json(errorMsg);
}

export const SuccasHandler = (succasMsg : object,succasState:Number,res:any)=>{
    res.status(succasState).json(succasMsg);
}