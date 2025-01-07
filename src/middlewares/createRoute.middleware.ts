import {NextFunction, Request, Response } from "express"

export const createRoute =  (handler:any)=>{
  return async (req:Request,res:Response,next:NextFunction)=>{
    try{
      await handler (req,res)
    }catch(error){
      return next(error)
    }
  }
}