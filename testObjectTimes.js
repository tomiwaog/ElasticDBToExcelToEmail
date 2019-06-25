var objFile = require('./DownloadedJSONFile');
var convoObjects = objFile.hits.hits;


for (var x=convoObjects.length-1;x>=0;x--){
    var eachObj = convoObjects[x];
    var eachObjUserInput = eachObj._source.custom_data.input.text;
    var eachObjTime = eachObj._source.date_time;

    console.log("User: "+ eachObjUserInput+" at: "+ eachObjTime);

}
