import {
  FormFile,
  multiParser,
} from "https://deno.land/x/multiparser@v2.1.0/mod.ts";
import { Router} from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { addVideo,deleteVideo } from "../services/videos.ts";
import { Chunk } from "../utils/chunk-file.ts";
import {common, core} from "../services/auth.ts"  


const route = new Router();

route.post("/video",common,async ({ request,response }) => {
  try {
    const form = await multiParser(request.originalRequest);
    const files: FormFile[] = form?.files as unknown as FormFile[]

    await addVideo(files)
    
    response.status = 200   
  } catch (e) {
    
    response.status = 500
    console.log(`ERROR: ${e}`)    
  }
});


route.delete("/video/:filename",core, async ({response,params}) => {
  try {
    
    await deleteVideo(params?.filename as string)
    
    response.status = 200   
  } catch (e) {
    
    response.status = 404
    console.log(`ERROR: ${e}`)    
  }
});
route.get("/videos/:filename", async (context)  => {
  try {
    
    const filename = context.params?.filename as string
    const formart = filename.split(".")[filename.split(".").length - 1] 
  
    const range = context.request.headers.get("Range")

    if (!range) throw new Error("Requires Range header");
   
    const videoSize = Deno.statSync(`${Deno.cwd()}/storage/videos/${filename}`).size
    
    

    const chunk_size = 10**6
    const start = Number(range.replace(/\D/g,""))
    const end =  Math.min(start+chunk_size,videoSize - 1)

    
    context.response.status = 206
    
    context.response.headers.set("Content-Range",`bytes ${start}-${end}/${videoSize}`)
    context.response.headers.set("Accept-Ranges", "bytes")
    context.response.headers.set("Content-Length", `${end - start + 1}`)
    context.response.headers.set("Content-Type", `video/${formart}`)

    

    context.response.body = await Chunk.open(`${Deno.cwd()}/storage/videos/${filename}`, start, end);

  } catch (e)  {

    context.response.status = 404
    console.log(`ERROR: ${e}`)    
  }
});

export default route;


