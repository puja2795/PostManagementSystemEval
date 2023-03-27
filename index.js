
const express = require("express");
const {connection} = require("./db")
require("dotenv").config()
const {userRouter} = require("./routes/user.routes")
const {postRouter} = require("./routes/post.routes")
const {authMiddleware} = require("./middleware/auth.middleware")
const cors = require("cors")

const app = express();

app.use(express.json())
app.use("/users",userRouter)
app.use(authMiddleware)
app.use("/posts",postRouter)
app.use(cors())

app.listen(process.env.port, async() => {
    try{
        await connection
        console.log("connected to DB")
    }
    catch(err){
        console.log("Not connected to DB");
        console.log(er)
    }
    console.log(`App is running at ${process.env.port}`)
})