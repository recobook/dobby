import { FormFile, multiParser} from "https://deno.land/x/multiparser@v2.1.0/mod.ts";
import { Router,send } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { addImage,deleteImage } from "../services/users.ts";
import {common, core} from "../services/auth.ts"  
  
const route = new Router();
  
  route.post("/user",common,async ({ request,response }) => {
    try {
      const form = await multiParser(request.originalRequest);
      const files: FormFile[] = form?.files as unknown as FormFile[]
  
      await addImage(files)
      
      response.status = 200   
    } catch (e) {
      
      response.status = 500
      console.log(`ERROR: ${e}`)    
    }
  });
  
  
  route.delete("/user/:filename",core,async ({response,params}) => {
    try {
      
      await deleteImage(params?.filename as string)
      
      response.status = 200   
    } catch (e) {
      
      response.status = 500
      console.log(`ERROR: ${e}`)   
    }
  });
  route.get("/users/:filename", async (context)  => {
    try {
      
      const filename = context.params?.filename as string
      
      
      context.response.status = 200
      await send(context,`/users/${filename}`,{root: `${Deno.cwd()}/storage`})
    } catch (e) {
      
      context.response.status = 404
      console.log(`ERROR: ${e}`)   
    }
  });
  
  export default route;
  