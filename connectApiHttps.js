var https = require('https');
var fs = require("fs");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function fetchlastTimeandAPI(){
    require('./specialLibrary').readLastFetchedRecords(connectToAPI);
}

function connectToAPI (lastItemCallTime) {
    console.log("\n******* Entered ConnectApiHTTPS");
    console.log("Last fetched item to be used in the next API call is "+lastItemCallTime)
    const path = '/btdev/document/_search';
    
    const query = 'pretty=true&size=10000&q=(date_time:{'+lastItemCallTime+' TO *})&sort=date_time:desc';

    var options = {
        host: 'host.com',
        port: 9243,
        path: path + '?' + encodeURI(query),
        // authentication headers
        headers: {
            'Authorization': 'Basic ' + Buffer.from('bt_read' + ':' + 'JasRjEcU8F1').toString('base64')
        }
    };

    //this is the call
    return https.get(options, function (res) {
        console.log("HTTPS Request API in ConnectAPi Running");
        var body = "";
        res.on('data', function (data) {
            body += data;
        });
        res.on('end', function () {
            //here we have the full response, html or json object
            writeResultsToFile(body)
            console.log("**** Sucessfully Downloaded New Data from API at: "+ new Date().toTimeString());

        });
        res.on('error', function (e) {
            onsole.log("ERROR: " + e.message);
        });
    });
    
}

const writeResultsToFile = (data)=> {
    fs.writeFile("DownloadedJSONFile.json", data, (err) => {
        if (err) {
            console.log("Could not write Downloaded Data to Local File");
            console.log(err);
        }
        console.log("Now writing Downloaded Files to " + 'DownloadedJSONFile.json');
    });

}
// fetchlastTimeandAPI();
module.exports = fetchlastTimeandAPI;