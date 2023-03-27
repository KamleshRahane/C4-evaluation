const express = require("express")
const app = express()
app.use(express.json())
const { connection } = require("./config/db")
const cors = require("cors")
app.use(cors())
const { userRoutes } = require("./routes/user")
const { authentication } = require("./middleware/auth")
const { postRoutes } = require("./routes/post")
app.use("/user", userRoutes)
app.use(authentication)
app.use("/post", postRoutes)





app.listen(process.env.port, async () => {
    await connection
    console.log("Connected to DB")
    console.log(`Server is running at port ${process.env.port}`)
})