jQuery.sap.declare("pwc.app.js.PDFUtility");

pwc.app.js.PDFUtility = {

	getPDFData : function() {
		var maxRev = pwc.app.js.ApproveWAUtility.getRevisionNumber();
		var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
		var msg = "";
		var hdrRev = waTopAndHdrModel.getData().RevisionNum;
		if(waTopAndHdrModel.getData().Status == "DRAFT"){
			msg = "This is a DRAFT WA. Do you still want to print PDF?"
		}
		else if(typeof hdrRev != "undefined" && hdrRev !="" && parseInt(hdrRev) != maxRev){
			msg = "WA is not approved with latest changes. Do you still want to print PDF?"
		}
		else if(waTopAndHdrModel.getData().Status == "DECLINED"){
			msg = "This is a DECLINED WA. Do you still want to print PDF?"
		}
		
		if(msg != ""){
			var dialog = new sap.m.Dialog({
				title: 'Warning',
				type: 'Message',
				state: 'Warning',
				content: new sap.m.Text({
					text: msg
				}),
				beginButton: new sap.m.Button({
					text: 'OK',
					press: function () {
						dialog.close();
						pwc.app.js.PDFUtility.showPDF(hdrRev);
					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
			
		}
		else{
			
			pwc.app.js.PDFUtility.showPDF(hdrRev);
		}
	},

	showPDF: function (rev){
		var request = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:urn=\"urn:www.pwc.ca:Services:Order:CreateWorkAuthorizationPDF\">"
			+ "<soapenv:Header/>"
			+ "<soapenv:Body>"
			+ "<urn:MT_WAPDFCreateRequest_EChannel>"
			+ "<WAPDFCreateRequest>"
			+ "<WorkAuthorizationNumber>70009026</WorkAuthorizationNumber>"
			+ "</WAPDFCreateRequest>"
			+ "</urn:MT_WAPDFCreateRequest_EChannel>"
			+ "</soapenv:Body>"
			+ "</soapenv:Envelope>";

	var response = "";
	var base64Str = "";


	var oDataModel = sap.ui.getCore().getModel("waModel");
//	var t = 70009026;
	 var filterStr = "ImAufnr eq '"+globalWANo+"'";
	 sap.ui.core.BusyIndicator.show(0);
	oDataModel.read('ZZ_WA_PDFSet', null, {
		"$format" : "json",
		"$filter" : filterStr
	}, false, function(oData, oResponse) {
		sap.ui.core.BusyIndicator.hide();
		var obj = JSON.parse(oResponse.body);
		var base64 = "";
		for (var i = 0; i < obj.d.results.length; i++) {
			base64 += obj.d.results[i].PdfText;
		}
	//	console.log("Success  " + base64);

		var no = globalWANo.toString().substring(globalWANo.toString().length - 5);
		if(typeof rev != "undefined" && rev != "" && parseInt(rev) > 0){
			no = no + "R"+rev;	
		}
		
		var fileName = "WA"+no+".pdf";
		if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
			console.log("for IE");
			var byteCharacters = atob(base64);
			var byteNumbers = new Array(byteCharacters.length);
			for (var i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			var byteArray = new Uint8Array(byteNumbers);
			var blob = new Blob([ byteArray ], {
				type : 'application/pdf'
			});
			window.navigator.msSaveOrOpenBlob(blob, fileName);
		} else { // much easier if not IE
			window.open("data:application/pdf;base64, " + base64, '',
					"height=600,width=800");
		}

	}, function(oError) { //
		sap.ui.core.BusyIndicator.hide();
		console.log("error");
	});

	}

}