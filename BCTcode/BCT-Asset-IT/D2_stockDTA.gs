function queryStockDTA() {
 var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetC = ss.getSheetByName("C2_สต็อกทั้งหมด");
  ss.setActiveSheet(sheetC);
  BCT.loadDataSpreadsheetByTemplate();
  
  var sheetD = ss.getSheetByName("D2_สต็อกคงเหลือ");
  var sheet = ss.setActiveSheet(sheetD);
  var sheetName = sheet.getSheetName();
    var rowFields = BCT.form_getRowFieldsByKey(sheet, 'process');
    var rowStartValue = rowFields+5;// 10;
    var rowFormula = rowFields+4; //9
  
    BCT.clearRowAll(sheet, rowStartValue, 1, 2);

    var fields = BCT.getFields(sheet, rowFields, 1, 0);      
    
    var conditionFields = BCT.form_Fields(sheet, 'condition');
    var conditionValues = BCT.form_Values(sheet, 'condition');
    var query = " select *  from Group_Asset where idAsset like 'EM%'";     
    
    var datas = BCT.loadXMLDatas(BCT.getDBServer(), 'BCT_Asset_Pkg', query);
    BCT.autoInsert(sheet, fields, datas, rowStartValue, 1);
 
  var formulaRow = sheet.getRange('F'+rowFormula+':P'+rowFormula);
  var lastrow = sheet.getLastRow();
  formulaRow.copyTo(sheet.getRange('F'+rowStartValue+':M'+lastrow));
  
}
