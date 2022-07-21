const { promisify } = require("util");
const { glob } = require("glob");
const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(commandFile => {
        const cmd = require(commandFile);
        if(!cmd.name || !cmd.description) {
            return console.log(`------\nCommandes non-chargée: pas de nom/desciption\nFichier --> ${commandFile}`);
        }
        client.commands.set(cmd.name, cmd)
        console.log(`Dossier Chargeée [🗂️] : ${cmd.category}`)
        console.log(`Commande chargée [🛢️] : ${cmd.name}`, "\n_______________________________________")
    });
};