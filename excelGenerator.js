var excel = require('excel4node');

function writeToWorkSpaceExcel(row, incolumn, dataBlock, workbookIn) {
    var workbook = '';
    if (!workbookIn) {
        //THis module is totaly modular for when multiple files needs to be generated for Conversation log
        workbook = new excel.Workbook();
    } else {
        //All-On-One version of this app passes in a workbook, hence append to that version
        workbook = workbookIn;
    }
    
    setWBKStyle = {
        // Add Worksheets to the workbook
        tomHeaderstyle: workbook.createStyle({ font: { color: '#FF0800', size: 16, } }),
        // tomHeaderstyle: workbook.createStyle({ font: { size: 16 } }),
        userInputStyle: workbook.createStyle({ fill: { type: 'pattern', patternType: 'solid', bgColor: '#D3D3D3', fgColor: '#D3D3D3' } }),
        cbResponseStyle: workbook.createStyle({ font: { color: '#FFFFFF', size: 12 }, fill: { type: 'pattern', patternType: 'solid', fgColor: '#2996FF' } })
    }

    var worksheet = workbook.addWorksheet(dataBlock.workSheetName);
    var sheetRow = row;

    worksheet.cell(1, 2).string("Biotene Chatbot");
    worksheet.cell(1, 3).string("FB-User");

    for (var x in dataBlock.datas) {
        var column = incolumn;
        var data = dataBlock.datas[x];

        worksheet.cell(++sheetRow, column).string(data.userInput).style(setWBKStyle.userInputStyle);
        worksheet.cell(sheetRow, ++column).string(data.timestamp);

        worksheet.cell(++sheetRow, 1).string(data.timestamp);

        for (var x in data.botResponse) {
            worksheet.cell(sheetRow++, 2).string(data.botResponse[x]).style(setWBKStyle.cbResponseStyle);
        }
    }
    if (!workbookIn) {
        //If this module is invoked by app-seperate (It will run the code below, else skip it)
        // Enable to Write Data to Seperate Files -> Disable to use 1 File for all Writes
        workbook.write(dataBlock.workSheetName + '.xlsx');
    }
}

module.exports = writeToWorkSpaceExcel;