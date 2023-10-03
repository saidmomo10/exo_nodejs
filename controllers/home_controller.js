const index = (req, res)=>{
    res.end("This is home page");
};

const store = (req, res) => {
    var resData = "";
    var dicoModule = require("../dico");
    req.on("data", function (chunk) {
      console.log("GOT DATA");
      resData += chunk.toString();
    });
    req.on("end", function () {
      try {
        const requestValue = JSON.parse(resData);
  
        if (requestValue.English) {
          const motTraduction = requestValue.English;
          const traduction = dicoModule.translate[motTraduction];
          if (traduction) {
            res.end(JSON.stringify({ traduction: traduction }));
          } else {
            res.end(JSON.stringify({ error: "Traduction non trouvée" }));
          }
        } else if (requestValue.Francais) {
          const motTraduction = requestValue.Francais;
          const anglais = Object.keys(dicoModule.translate).find(
            (key) => dicoModule.translate[key] === motTraduction
          );
          if (anglais) {
            res.end(JSON.stringify({ translation: anglais }));
          } else {
            res.end(JSON.stringify({ error: "Traduction non trouvée" }));
          }
        } else {
          res.end(
            JSON.stringify({ error: "Langue non spécifiée dans la requête" })
          );
        }
      } catch (error) {
        res.end(
          JSON.stringify({ error: "Erreur lors de l'analyse de la requête JSON" })
        );
      }
    });
  };

  module.exports = { index, store };
