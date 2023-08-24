const express=require("express");
const {connection}=require("./db")
require("dotenv").config()
const{userRouter}=require("./routes/user.routes")

const{auth}=require("./middleware/auth.middleware")
const cors=require("cors");
const { albumRouter } = require("./routes/albums.routes");
const imageRouter = require("./routes/images.routes");

const app=express()

app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use("/album",albumRouter)
app.use("/images",imageRouter)
app.use(auth)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connection to DB successful")
    } catch (error) {
        console.log("Connection to DB Unsuccessful")
        console.log(error)
    }
    console.log(`Sever is running at post ${process.env.port}`)
})