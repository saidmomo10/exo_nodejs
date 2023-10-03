 var homeController = require("../controllers/home_controller")
 
 const routes = {
    "/": {
        method: "POST",
        handler:  homeController.index,
    }, 
    "/store":{
        method: "GET",
        handler: homeController.store,
    } 
 };
 const router = (req, res) =>{
    const { url, method } = req;

    const route = routes[url];
    if(!route){
        res.writeHead(404);
        res.end("404 Not Found");
        return;
    }

    if(method !==route.method){
        res.writeHead(405);
        res.end("405 Method is not allowed");
        return;
    }

    route.handler(req, res);
 };
 module.exports = router;