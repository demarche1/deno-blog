import type { Application } from "../deps.ts";
import home from "./home.route.ts";
import auth from "./auth.route.ts";
import user from "./user.route.ts";
import search from "./search.route.ts";

const init = async (app: Application) => {
  app.use(home.routes());
  app.use(auth.routes());
  app.use(user.routes());
  app.use(search.routes());

  app.addEventListener("listen", ({ hostname, port, secure }) => {
    console.log(
      `Listening on: ${secure ? "https://" : "http://"}${
        hostname ?? "localhost"
      }:${port}`
    );
  });

  await app.listen({ port: 8000 });
};

export default { init };
