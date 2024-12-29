import redis from "redis";



const client = redis.createClient({
  url: "redis://localhost:6379",
});

client.on("connection", () => {
  console.log("connect redis");
});





export default client;
