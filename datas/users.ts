import { FormFile } from "https://deno.land/x/multiparser@v2.1.0/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

export default {
  addImage: async (files: FormFile[]) => {
    for (const file in files) {
      await Deno.writeFile(
        path.join("storage", "users", files[file].filename),
        files[file].content
      );
    }
    return true;
  },
  deleteImage: async (filename: string) => {
    await Deno.remove(path.join("storage", "users", filename));

    return true;
  },
};
