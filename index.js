var http = require("http");

var server = http.createServer(function (req, res) {
  res.writeHead(201, { "Content-Type": "application/json", Accept: "application/text"  });
  const translate = [
    {
        english: "to talk",
        french:"parler"
    },

    {
        english: "to run",
        french:"courir"
    },

    {
        english: "to eat",
        french:"manger"
    },
  ];


  var reqData = "";

  req.on("data", function (chunk){
    console.log("GOT DATA!");
    reqData += chunk.toString();
    
    console.log(chunk.toString());
  });

  req.on("end", function () {
    try {
        const requestData = reqData;
        const translation = requestData;

        if (translation) {
            
        const french = translate.find(entry => entry.french === translation);
        const english = translate.find(entry => entry.english === translation);

          if (french) {
            res.end(JSON.stringify(french));
          }else if(english){
            res.end(JSON.stringify(english));
        } 
          else {
            res.end(JSON.stringify({ error: "Traduction non trouvée" }));
          }
        } else {
          res.end(JSON.stringify({ error: "Mot non spécifié dans la requête" }));
        }
      } catch (error) {
        res.end(JSON.stringify({ error: "Erreur lors de l'analyse du corps de la requête JSON" }));
      }
    });
});


server.listen(8001, function () {
  console.log("Server is running at 88001");
});
