var fs = require("fs");

async function getLastFetchTime (callback) {
    var fs = require("fs");
    await fs.readFile("lastAPIFetchedTime.txt", "utf-8", (err, data) => {
        if (err){console.log("ERROR: Reading file")}
        console.log("Running getLastFetch API | Result: " + data);
        callback(data);
        return data;
    });
}
functions = {
    deleteAllOldFiles: deleteAllOldExtFiles,
    updateLastFetchedRecords: updateLastFetchedRecords,
    searchCollectFileExt: searchCollectFileExt,
    readLastFetchedRecords: getLastFetchTime,
    getLastObject: getLastObjInLocalArr,
    appDelay: delay
}

function updateLastFetchedRecords(lastObject) {
    var lastObjectTime = lastObject._source.date_time;
    var fileName = "lastAPIFetchedTime.txt";
    fs.writeFile(fileName, lastObjectTime, (err) => {
        if (err) console.log(err);
        var timestamp = new Date(lastObjectTime);
        console.log(fileName + " was updated with time of Last object: " + lastObjectTime + ` (${timestamp})`);
        console.log("last Object has input: " + lastObject._source.custom_data.input.text);
    });
}



function deleteAllOldExtFiles(arrOfFilesToDelete) {
    console.log("\n** Deleting previously generated files");
    for (var x in arrOfFilesToDelete){
        var fileToDelete = arrOfFilesToDelete[x];
        fs.unlink(fileToDelete, function (err) {
            if (err) throw err;
            console.log(fileToDelete +'is deleted!');
          });
    }

}

function searchCollectFileExt(PathToSearch, xtensionSearch) {
//Return an arrays of found files for extension matching @xtensionSearch
   var arrFoundFiles = [];
    // Find all Excel locally.
    function searchIterative(PathToSearch, xtensionSearch) {
        var path = require('path'), fs = require('fs');
        // console.log("Collecting all Excel Files - from SpecialLibrary");
        if (!fs.existsSync(PathToSearch)) {
            console.log("Specified directory doesnt exist ", PathToSearch);
            return;
        }
        var files = fs.readdirSync(PathToSearch);
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(PathToSearch, files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                searchIterative(filename, xtensionSearch); //recursive
            }
            else if (filename.indexOf(xtensionSearch) >= 0) {
                console.log('-- found: ', filename);
                arrFoundFiles.push(filename);
            };
        };
    }
    searchIterative(__dirname, '.xlsx');

    if (arrFoundFiles.length > 0) {
        console.log("Found Files in using Search Function special Library.");
        return arrFoundFiles;
    }
    console.log("Trying searching for files, couldnt find any!");
    return false;
};

function getLastObjInLocalArr(callback){
    console.log("Getting last Object");
    //Gets the last Item in Array then pass it on to callback method
    var objFile = require('./DownloadedJSONFile');
    var lastObject = objFile.hits.hits[0]; //Search Elastic returned stack type structure with latest on top
    callback(lastObject);
}
module.exports = functions;

function delay(seconds){
    return new Promise(function(res,rej){
        setTimeout(function(){
            res(42);
        },seconds*1000); //seconds delay ensuring API is fully Downloaded to local JSOn before 
    });
    
}
