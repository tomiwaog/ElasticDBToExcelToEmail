function delay(){
    return new Promise(function(res,rej){
        setTimeout(function(){
            res(42);
        },5000); //5 seconds delay ensuring API is fully Downloaded to local JSOn before 
    });
}


const retrieveDownloadedFile = async(successful)=>{
await delay();
    async function checkSuccess(){
        if (successful){
            console.log("retrieveDownloadedFile - Fetching Downloaded file after API is written to FILE")
            return require('./DownloadedJSONFile');
        }
        else{
            console.log("Could not connect to an API, connecting to Local");
            return require('./LocalSampleFile');
        }   
    }
    return await checkSuccess();

}


module.exports = retrieveDownloadedFile;