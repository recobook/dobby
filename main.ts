import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import routesImages from "./routes/images.ts";
import usersImages from "./routes/users.ts"
import videosImages from "./routes/videos.ts"
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";


const app = new Application();

app.use(oakCors({ origin: true }));
app.use(routesImages.routes());
app.use(usersImages.routes())
app.use(videosImages.routes())

await app.listen({ port: 1993 });
