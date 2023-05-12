module.exports = async client => {

    //MISC FUNCTIONS
    //Get the timestamp
    client.timestampParser = num => {
        const date = new Date(num ? num : Date.now()).toLocaleDateString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        return date.toString();
    };

    //Check if a value is empty
    client.isEmpty = (value) => {
        return (
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0)
        );
    };
};