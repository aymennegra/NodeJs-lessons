const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/user", require("./routes/user.route"));

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})