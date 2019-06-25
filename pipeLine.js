var specialLibrary = require('./specialLibrary');
var deleteAllOldFiles = specialLibrary.deleteAllOldFiles;
var sendEmail = require('./emailSender');
var fetchAPI = require('./connectApiHttps');

async function pipeLine() {
    fetchAPI();
    await specialLibrary.appDelay(5);
    await require('./app-seperateFIles')();
    await specialLibrary.appDelay(5);
    var collectableExcelFiles = specialLibrary.searchCollectFileExt(__dirname, '.xlsx'); //Writes found files to array

    // If Excel files are found
    if (collectableExcelFiles) {
        console.log(".xlsx Files Are found!: see below:");
        try {
            await sendEmail(collectableExcelFiles, "tomiwa.x.ogunbamowo@gsk.com", "tomiwa.x.ogunbamowo@gsk.com, jawahar.x.ramis@gsk.com"); //Use the array for email to be sent
            deleteAllOldFiles(collectableExcelFiles); //Only Runs If sendEmail() succeed without ERROR
        } catch (error) {
            console.log("Email NOT SENT or/and Files are UNDELETED!");
            console.log(error);
        }
    } else {
        console.log("No FIles generated to be emailed, stopping!");
    }
}

module.exports = pipeLine; //Added new keyword to test if cache is prevented - Not tested yet

