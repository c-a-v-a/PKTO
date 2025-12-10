import { serve } from "bun";

serve({
  port: 3000,
  fetch(req) {
    // Automatically map URL → file
    const path = new URL(req.url).pathname;
    const filePath = path === "/" ? "/public/index.html" : path;

    try {
      return new Response(Bun.file(`.${filePath}`));
    } catch {
      return new Response("Not found", { status: 404 });
    }
  }
});
