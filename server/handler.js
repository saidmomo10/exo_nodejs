var dicoModule = require("../dico")

var reqData = "";
const useRouter = require("./routes")

const handler = (req, res) =>{
    useRouter(req, res);

    // res.end("Hello world");
    res.writeHead(200,{
        "Content-Type": "application/json",
        Accept:"application/json"
    });
    
};

module.exports = handler;