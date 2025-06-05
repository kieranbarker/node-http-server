import net from "node:net";

const server = net.createServer((socket) => {
	socket.on("data", (chunk) => {
		// Log the raw request
		const data = chunk.toString();
		console.log(data);

		// Extract the request line
		const lines = data.split("\r\n");
		const requestLine = lines[0];
		const [method, path, protocol] = requestLine.split(" ");
		console.log(method, path, protocol);

		// Extract the headers
		const index = lines.indexOf("");
		const headers = new Headers(
			lines.slice(1, index).map((header) => header.split(": "))
		);
		console.log(Object.fromEntries(headers));

		// Extract the body
		const body = lines.slice(index + 1);
		console.log(body);
	});

	socket.on("end", () => {
		console.log("Connection closed");
	});
});

const port = 8080;

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
