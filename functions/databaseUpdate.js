//Get data from database
    const getGuildDocument = (client, id) => {
        var promise = new Promise(async function(resolve, reject) {
        client.database.listDocuments(client.config.API.appwrite.collections.guild).then((res) => {
                const guild = res.documents.filter(g => g.guildID === id);
                resolve(guild[0]);
            });
        });
        return promise;
    };

//Update functions


/*const updateGuild = (guildID, data) => {
    client.database.updateDocument(client.config.API.appwrite.collections.guild, )
}*/

exports.getGuildDocument = getGuildDocument;