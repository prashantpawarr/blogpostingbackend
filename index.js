const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const publicRouter = require("./routes/publicroutes");
const cors = require("cors");

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/", publicRouter);
app.use(express.static("public"))

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
