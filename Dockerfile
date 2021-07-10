FROM denoland/deno:1.11.2


EXPOSE 1993

WORKDIR /app

VOLUME [ "/app" ]
#USER deno

COPY . .


ADD . .

RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "main.ts"]
