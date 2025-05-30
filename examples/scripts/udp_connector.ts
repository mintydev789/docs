/**
 * @title UDP connector: Ping
 * @difficulty intermediate
 * @tags cli
 * @run -N --unstable-net <url>
 * @resource {https://docs.deno.com/api/deno/~/Deno.connect} Doc: Deno.connect
 * @resource {/examples/udp_listener} Example: UDP Listener
 * @group Unstable APIs
 *
 * <strong>Warning: This is an unstable API that is subject to change or removal at anytime.</strong><br>An example of writing a 'ping' message to a UDP server on localhost.
 */

// Instantiate an instance of text encoder to write to the UDP stream.
const encoder = new TextEncoder();

// Create a UDP listener to allow us to send a ping to the other UDP server.
const listener = Deno.listenDatagram({
  port: 10001,
  transport: "udp",
});

// Since UDP is a connectionless protocol, we need to define the address of the listener
const peerAddress: Deno.NetAddr = {
  transport: "udp",
  hostname: "127.0.0.1",
  port: 10000,
};

// Encode the 'ping' message and write to the UDP connection for the server to receive.
await listener.send(encoder.encode("ping"), peerAddress);
listener.close();
