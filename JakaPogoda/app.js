const express = require("express");
const path = require("path")
const mongoose = require("mongoose")
const weatherRoutes = require("./api/routes/weathers")

const app = express();

//Templaye engine
app.set("view engine", 'ejs')
app.set('views', path.join(__dirname, 'views'))

// ustawienie folderu publicznego jako foldera z plikami statycznymi
app.use(express.static("public"));

// renderowanie strony glownej z wartosciami domyslnymi
  app.use("/weather",weatherRoutes)
//Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

  app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
  });

//zmienne srodowiesko
require("dotenv").config()

//polaczenie z baza danych
mongoose.connect("mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.9tjyx6t.mongodb.net/"+process.env.DB_NAME+"?retryWrites=true&w=majority")


// ustawianie portu i startowanie servera
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Aplikacja jest na porcie ${port}`);
});