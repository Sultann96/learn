import axios from "axios"
// describe("auth",()=>{
// })

async function main() {
  await axios.get("http://localhost:3000/user/1")
}

main()
