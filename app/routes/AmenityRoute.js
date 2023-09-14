const Express = require("express");
const Router = Express.Router();
const AmenityController = require("../controllers/AmenityController")
const AppAuth = require("../utils/authentication/AppAuth")
const Authorized = require("../utils/authentication/CheckAuth")


Router.post("/amenity/addAminity",  (response, request) => {
    AmenityController.addAminity(response, request);
});


Router.post("/amenity/createAminity",  (response, request) => {
    AmenityController.createAminity(response, request);
});

Router.get("/amenity/getallamenity",  (response, request) => {
    AmenityController.getAllAmenity(response, request);
});


Router.get("/amenity/getProjectAmenities/:projectId",  (response, request) => {
    AmenityController.getAllAmenitiesByProjectId(response, request);
});

module.exports = Router;