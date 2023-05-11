import express from "express"
import router from "./routes/routes.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/whatsapp", router)

app.listen(PORT, () => {
    console.log(`server running on port http://localhost:3000/whatsapp`)
})