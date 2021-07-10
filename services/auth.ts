import { verify } from "https://deno.land/x/djwt@v2.2/mod.ts";
import { Schema } from "https://deno.land/x/valivar@v6.2.11/mod.ts";
import {Context,Status,STATUS_TEXT} from "https://deno.land/x/oak@v7.5.0/mod.ts";
import {SERVICE_AUTH_KEY} from "../const.ts"

export const  core = async ({request,response}:Context, next:()=> Promise<unknown> ) => {
  try {
    const token = await verify(request.headers.get("authorization") as string,SERVICE_AUTH_KEY,"HS256");
    console.log(token)
    const schema = new Schema({
      type:{type:String,enum: ["core"],required: true}
    })
  
    const errors = schema.validate(token)

    if (errors.length == 0) await next()
  
    if (errors.length == 0) {
      await next()
    }else {
      throw new Error(STATUS_TEXT.get(Status.Unauthorized)); 
    }

  } catch {
    response.status = Status.Unauthorized
    response.body = STATUS_TEXT.get(Status.Unauthorized)
  }

};


export const  common = async ({request,response}:Context, next:()=> Promise<unknown> ) => {
  try {
    const token = await verify(request.headers.get("authorization") as string,SERVICE_AUTH_KEY,"HS256");
    const schema = new Schema({
      type:{type:String,enum: ["user","core"],required: true}
    })
  
    const errors = schema.validate(token)

    if (errors.length == 0) {
      await next()
    }else {
      throw new Error(STATUS_TEXT.get(Status.Unauthorized)); 
    }
  
  } catch {
    response.status = Status.Unauthorized
    response.body = STATUS_TEXT.get(Status.Unauthorized)
  }

};
