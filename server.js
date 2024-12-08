/*
	Start server: `bun --hot server.js`
	The server is necessary to avoid error "Access to script at '...' from origin 'null' has been blocked by CORS policy"
	when working with JavaScript modules.
	More info: https://stackoverflow.com/questions/52919331/access-to-script-at-from-origin-null-has-been-blocked-by-cors-policy
*/
const PORT = 5_000;

Bun.serve({
	port: PORT,
	fetch: (
		/** @type {Request} */
		request,
	) => {
		const url = new URL(request.url);

		if (url.pathname.endsWith("/")) {
			return new Response(
				Bun.file(import.meta.dir + "/index.html"),
			);
		}

		if (url.pathname.endsWith("/favicon.ico")) {
			return new Response(
				null,
				{
					status: 404
				},
			);
		}

		return new Response(
			Bun.file(import.meta.dir + url.pathname),
		);
	},
});
