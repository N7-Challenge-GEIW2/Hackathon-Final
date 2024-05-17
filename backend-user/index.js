const express = require('express');
const app = express();
// const authRouter=require("./routers/auth.js")
const urlRouter=require("./routers/urlRouter.js")
const emailRouter=require("./routers/emailRouter.js")

require('dotenv').config();

const mongoose=require("mongoose")
// const cookieParser=require("cookie-parser")
const cors=require("cors")






mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        console.log("mongoose deployed")
    }
)

// app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5174",    
}))

app.use(express.json());
// app.use("/",authRouter)
app.use("/url",urlRouter)
app.use("/email",emailRouter)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
