import { FormFile } from 'https://deno.land/x/multiparser@v2.1.0/mod.ts'
import {Schema} from "https://deno.land/x/valivar@v6.2.11/mod.ts"
import dataImage from "../datas/images.ts"

export const addImage = async (files:FormFile[])=>{

    const schema = new Schema({
        name:{type:String,required: true},
        contentType:{type:String,enum: ["image/png","image/jpg","image/jpeg","image/zvg+xml"],required: true},
        content:{type:Uint8Array,required: true},
        filename:{type:String,required: true},
        size: {type:Number,required: true}
    })
    
    for (const file in files) {
        if(schema.validate(files[file] as any).length > 0) throw new Error("image not supported");
    }

    return dataImage.addImage(files)
}   

export const deleteImage =  async (filename:string) => {
    return await dataImage.deleteImage(filename)
}

export const findImage =  async (filename:string) => {
    
    return dataImage.findImage(filename)
}

