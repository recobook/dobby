import {
    FormFile,
    multiParser,
  } from "https://deno.land/x/multiparser@v2.1.0/mod.ts";
  import { Router,send } from "https://deno.land/x/oak@v7.5.0/mod.ts";
  import { addImage,deleteImage } from "../services/users.ts";
  
  
  const route = new Router();
  
  route.post("/user", async ({ request,response }) => {
    try {
      const form = await multiParser(request.originalRequest);
      const files: FormFile[] = form?.files as unknown as FormFile[]
  
      await addImage(files)
      
      response.status = 200
      response.body = {status: true}   
    } catch (e) {
      
      response.status = 500
      response.body = {status: false }    
    }
  });
  
  
  route.delete("/user/:filename", async ({response,params}) => {
    try {
      
      await deleteImage(params?.filename as string)
      
      response.status = 200
      response.body = {status: true}   
    } catch (e) {
      
      response.status = 500
      response.body = {status: false }    
    }
  });
  route.get("/users/:filename", async (context)  => {
    try {
      
      const filename = context.params?.filename as string
      
      
      context.response.status = 200
      await send(context,`/users/${filename}`,{root: `${Deno.cwd()}/storage`})
    } catch (e) {
      
      context.response.status = 404
      context.response.body = {status: false }    
    }
  });
  
  export default route;
  