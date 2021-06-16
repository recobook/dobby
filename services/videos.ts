import { FormFile } from 'https://deno.land/x/multiparser@v2.1.0/mod.ts'
import {Schema} from "https://deno.land/x/valivar@v6.2.11/mod.ts"
import dataVideo from "../datas/videos.ts"

export const addVideo = async (files:FormFile[])=>{

    const schema = new Schema({
        name:{type:String,required: true},
        contentType:{type:String,enum: ["video/ogg","video/mp4"],required: true},
        content:{type:Uint8Array,required: true},
        filename:{type:String,required: true},
        size: {type:Number,required: true}
    })
    
    for (const file in files) {
        if(schema.validate(files[file] as any).length > 0) throw new Error("Video not supported");
    }

    return dataVideo.addVideo(files)
}   

export const deleteVideo =  async (filename:string) => {
    return await dataVideo.deleteVideo(filename)
}


