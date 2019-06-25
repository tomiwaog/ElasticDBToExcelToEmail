var objFile = require('./DownloadedJSONFile');
var downloadedDataLogs =require('./localDBForConversation'); //To be used for STorage later
var downloadedDataLogs =[];

console.log(objFile);
function parseAPIdataToObjArray(objFile) {
    //Currently last in first out
    var ChatConversations = objFile.hits.hits;
    for (var i = ChatConversations.length-1; i>=0 ; i--) {
        downloadedDataLogs.push(ChatConversations[i]);
    }
    return downloadedDataLogs;
}


module.exports = parseAPIdataToObjArray(objFile);