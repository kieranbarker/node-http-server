import net from "node:net";

const server = net.createServer((socket) => {
	socket.on("data", (chunk) => {
		// Log the raw request
		const data = chunk.toString();
		console.log(data);

		// Split the head and body
		const [head, body] = data.split("\r\n\r\n");

		// Extract the request line
		const lines = head.split("\r\n");
		const requestLine = lines[0];
		const [method, requestTarget, protocol] = requestLine.split(" ");
		console.log(method, requestTarget, protocol);

		// Extract the headers
		const headers = new Headers(
			lines.slice(1).map((header) => header.split(": "))
		);
		console.log(Object.fromEntries(headers));

		// Log the body
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
