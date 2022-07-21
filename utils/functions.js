const mongoose = require("mongoose");

module.exports = async client => {

    //have timestamp
    client.timestampParser = num => {
        if(num) {
            let options = {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            };
    
            let date = new Date(num).toLocaleDateString("fr-FR", options);
            return date.toString();
        } else {
            let options = {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            };
    
            let date = new Date(Date.now()).toLocaleDateString("fr-FR", options);
            return date.toString();
        }
    }

    //Is EMpty ??
    client.isEmpty = (value) => {
        return (
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0)
        );
    };
};