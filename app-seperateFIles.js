async function writeToSeperateExcel(){
    console.log("\n******* Entered writeToSeperate appSeperate");
    var downloadedDataLogs = require('./conversationStorage'); //Array to Store Downloaded Data logs
    var writeToWorkSpaceExcel = require('./excelGenerator'); //Writes Conversation to Excel File
    function convoToExcelApp(downloadedDataLogs) {
        var ChatConversations = downloadedDataLogs;
        var visitedNodes = [];
        var totalWrites = 0;
        for (var i in ChatConversations) {
    
            var eachConvo = ChatConversations[i];
            var userUniqueSessionID = eachConvo._source.custom_data.cg_context.session_id;
            if (!visitedNodes.includes(userUniqueSessionID)) {
                //If Item is not already visited, then find all items with same ID
                var userInput = eachConvo._source.custom_data.input.text;
                var timeFromAPI = eachConvo._source.date_time;
                var timestamp = new Date(timeFromAPI);
                console.log("User: "+ userInput+" at: "+ timestamp);
                timestamp = timestamp.toDateString() + " " + timestamp.toTimeString().substring(0, 5);
    
                //Template for UserData
                function Data(userInput, timestamp, botResponse) {
                    this.userInput = userInput;
                    this.timestamp = timestamp;
                    this.botResponse = [];
                }
    
                //Block for Storing data with Common uniqueID
                var dataBlock = {
                    workSheetName: userUniqueSessionID,
                    datas: []
                }
    
                for (var subI = i; subI < ChatConversations.length; subI++) {
                    //Checks all of the Arrays for the same i, and adds the user Data to the sheet;
                    var SubUserUniqueSessionID = ChatConversations[subI]._source.custom_data.cg_context.session_id;
                    console.log("I is: "+ userUniqueSessionID + " iSub is: "+SubUserUniqueSessionID );
                    if (!visitedNodes.includes(userUniqueSessionID) && userUniqueSessionID==SubUserUniqueSessionID) {
                        var userInput = ChatConversations[subI]._source.custom_data.input.text;
                        var timeFromAPI = ChatConversations[subI]._source.date_time;
                        var timestamp = new Date(timeFromAPI);
                        timestamp = timestamp.toDateString() + " " + timestamp.toTimeString().substring(0, 5);

                        var chatbotResponse = '';
    
                        var thisItem = new Data(userInput, timestamp, new Array()); //Adds the first Item
    
                        for (var j in ChatConversations[subI]._source.custom_data.output.generic) {
                            //Capturing one or more Responses from Chatbot
                            var eachChatBotReponse = ChatConversations[subI]._source.custom_data.output.generic[j]; //Each CB Reponse
                            chatbotResponse = eachChatBotReponse.text;
                            // console.log("Chatbot Response = " + chatbotResponse)
                            thisItem.botResponse.push(chatbotResponse); //Buffers the response to each dialogue               
                        }
                        dataBlock.datas.push(thisItem);
                    }
                }
                //Writes input to Sheet
                writeToWorkSpaceExcel(2, 3, dataBlock);
                visitedNodes.push(userUniqueSessionID);
                totalWrites++;
    
            }
        }
        console.log("Total Writes = " + totalWrites);
    }
    convoToExcelApp(downloadedDataLogs);
}
module.exports = writeToSeperateExcel;