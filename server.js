const http = require("http");
const dotEnv = require("dotenv");
const fileUpload = require('express-fileupload');
var cors = require("cors");
const {join} = require('path');
dotEnv.config();
const Express = require("express");
const BodyParser = require("body-parser");
const app = Express();

app.use(BodyParser.json({ limit: "50mb" }));
app.use(BodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(Express.static(join(__dirname, 'public')))
app.use('/uploads',Express.static(join(__dirname, 'images')))
app.use('/uploads',Express.static(join(__dirname, 'pdf')))
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: 'public/'
}));
// app.use(multer({}).any())

const Port = process.env.PORT || 3000;
const Server = http.createServer(app);

const propertyRoute = require("./app/routes/ProjectRoute");
const registratioRoute = require("./app/routes/RegistrationRoute");
const galleryRoute = require("./app/routes/GalleryRoute");
const contactRoute = require("./app/routes/ContactRoute")
const blogRoute = require("./app/routes/BlogRoute")
const loginRoute = require("./app/routes/LoginRoute")

const testimonyRoute = require("./app/routes/TestimonialRoute")
const amenityRoute = require("./app/routes/AmenityRoute")

app.use("/v1/api", propertyRoute);
app.use("/v1/api", registratioRoute)
app.use("/v1/api", galleryRoute)
app.use("/v1/api", contactRoute)
app.use("/v1/api", blogRoute)
app.use("/v1/api", loginRoute)
app.use("/v1/api", testimonyRoute)
app.use("/v1/api", amenityRoute)


require("./app/utils/middlewares/SwaggerDoc")(app);
require("./app/utils/middlewares/NotFound")(app);

Server.listen(Port, () =>
  console.log("Server is up and running port: " + Port)
);
