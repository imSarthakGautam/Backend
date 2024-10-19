import express from "express";
//1. can be used only when module assembly of js files.
// type:module in package.json

const app = express();

app.get('/', (req, res)=>{
    res.send("server is ready");
});


app.get('/api/players', (req,res)=>{
// players data:
const players = [
    { id: 1, name: "Lionel Messi", club: "Inter Miami" },
    { id: 2, name: "Cristiano Ronaldo", club: "Al-Nassr" },
    { id: 3, name: "Kylian Mbappé", club: "Paris Saint-Germain" },
    { id: 4, name: "Erling Haaland", club: "Manchester City" },
    { id: 5, name: "Neymar Jr.", club: "Al-Hilal" }
  ];
// send this as response
  res.send(players);
})



// Port specification
const port = process.env.PORT || 3000;
// define port to listen for requests.
app.listen(port, ()=>{
    console.log(`serve application at http://localhost:${port}`)
})

