var automateFunc = require('./pipeLine');
var app = require('express')();
var cronJob = require('node-cron');
                // ┌────────────── second (optional)
                // │ ┌──────────── minute
                // │ │ ┌────────── hour
                // │ │ │ ┌──────── day of month
                // │ │ │ │ ┌────── month
                // │ │ │ │ │ ┌──── day of week
                // │ │ │ │ │ │
                // │ │ │ │ │ │
                // * * * * * *


 cronJob.schedule('0 * * * *', automateThis);

function automateThis(){
    console.log("\n***Running a Cron Schedule");
    automateFunc();
}

app.listen(5555, ()=>{
    console.log("Chatbot is listening on 5555");
})