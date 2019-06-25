var success;
"use strict";
const nodemailer = require("nodemailer");


function combineAttachments(arrAllCollectedFiles) {
  var allAttachments = [];
  // utf-8 string as an attachment
  for (var x in arrAllCollectedFiles) {
    var emailToSend = {
      filename: arrAllCollectedFiles[x].substring(arrAllCollectedFiles[x].length - 36, arrAllCollectedFiles[x].length),
      path: arrAllCollectedFiles[x]
    }
    allAttachments.push(emailToSend);
  }
  return allAttachments;
}
// async... await is not allowed in global scope, must use a wrapper
async function main(filesToBeSent, fromAddress, toAddress) {
  console.log("Incoming files to be sent in Email Sender Main");
  console.log(filesToBeSent);
  // var filesToBeSent = await require('./specialLibrary').searchCollectFileExt(); //TestDAta Stores all retrieved Files in an array
  var allAttachments = combineAttachments(filesToBeSent);
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "URL",
      port: 25,
      tls: {
        rejectUnauthorized: false
      }
    });
    var emailSubject = "Biotene Chatbot Conversations - " + new Date();
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: fromAddress, // sender address
      to: toAddress, // list of receivers
      subject: emailSubject, // Subject line
      text: "Hello world from Script", // plain text body
      // html: "<b>Hello world?</b>", // html body
      attachments: allAttachments // utf-8 string as an attachment
    });

    updateLastSendTime(); //Update TimeStamp - Updates the last time an email was sent, to be used as input for the next
    console.log("Message sent: %s", info.messageId);
    setNewLastItemAfterSend();
  } catch (error) { console.log("ERROR: Email was not sent!"); console.log(error); throw error; }

}
// main().catch(console.error);

function setNewLastItemAfterSend() {
  function updateTimeText(lastObject) {
    return require('./specialLibrary').updateLastFetchedRecords(lastObject);
  }

  require('./specialLibrary').getLastObject(updateTimeText);
  //Update the last fetched-Item time after successful email sent out. Only updates if sending is successful.
  //This is done so, API does not lose data by updating the new time.
}
function deleteAllOldFiles() {
  return require('./specialLibrary').deleteAllOldFile();
}

function updateLastSendTime() {
  var fs = require('fs');
  fs.writeFile("lastSentRecordFile.txt", new Date(), (err) => {
    if (err) console.log(err);
    console.log("Successfully Updated timeStamp of last email SENT.");
  });
}

module.exports = main;