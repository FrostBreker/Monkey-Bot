const { Client, Collection } = require("discord.js");
require("dotenv").config();
const TOKEN = process.env.TOKEN;

const express = require("express");

const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT;
app.get('/', function (req, res) {
    res.render('pages/index.ejs');
});
const client = new Client({ intents: 3276799 });
module.exports = { client, app };
//Setup DB
require("./utils/functions")(client);
client.mongoose = require("./utils/mongoose");
client.mongoose.init(client.timestampParser());
client.commands = new Collection();
['CommandUtil', 'EventUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

process.on("exit", code => { console.log(`Le processus s'est arrêté avec le code: ${code}!`); });
process.on("uncaughtException", (err, origin) => { console.log(`uncaughtException: ${err}`, `Origine: ${origin}`); });
process.on("unhandledRejection", (reason, promise) => { console.log(`UNHANDLED_REJECTION: ${reason}\n--------\n`, promise); });
process.on("warning", (...args) => { console.log(...args); });

client.login(TOKEN).then(() => {
    app.listen(port, () => {
        console.log(`${client.timestampParser()} => Express server is connected on : http://localhost:${port}`)
    });
})