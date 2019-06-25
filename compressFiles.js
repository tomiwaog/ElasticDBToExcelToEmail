var listOfExcelFiles = [];

var fs = require('fs');
var archiver = require('archiver');
var output = fs.createWriteStream('./FilesReadytobeEmailed.tar.gz');

var archive = archiver('tar', {
    gzip: true,
    zlib: {level: 9} //Compression level set
});

archive.on('error', function(err){
    console.log("Archive failed!");
    console.log(console.error);
});

//Pipe the data to outputfile
archive.pipe(output);

// Find all Excel locally.
var path = require('path'), fs=require('fs');

function filesExcelFinder(startPath,filter){
    if (!fs.existsSync(startPath)){
        console.log("Specified directory doesnt exist ",startPath);
        return;
    }
    var files = fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recursive
        }
        else if (filename.indexOf(filter)>=0) {
            console.log('-- found: ',filename);
            listOfExcelFiles.push(filename);
        };
    };
};

filesExcelFinder(__dirname,'.xlsx');

//Add Retrieved filelist and pipes it to Archive.
for (x in listOfExcelFiles){
    archive.file(listOfExcelFiles[x]); 
}

console.log(listOfExcelFiles);

// Finalise Archive
archive.finalize();