import express from "express"
import cookieParser from "cookie-parser"
import { authRouter, userRouter } from "./routes"

if(!process.env){
 throw new Error("nodemailer:mail pass")
}
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(authRouter)
app.use(userRouter)


app.listen(3000, () => {
  console.log("server work")
})
