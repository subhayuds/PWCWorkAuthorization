jQuery.sap.declare("pwc.app.js.SaveWAUtility");
jQuery.sap.require("pwc.app.js.CommonUtility");
jQuery.sap.require("pwc.app.js.ViewWADetailsUtility");
jQuery.sap.require("pwc.app.js.RejectWAUtility");

pwc.app.js.SaveWAUtility = {//test
	_createSavePayload: function (that,isApproved) {
		var oPayload = {
				"EngineSl": "",
				"MainOrder": "",
				"SubOrder": "",
				"Activity": "",
				"WorkScope": "",
				"Operation": "",
				"OperationText": "",
				"ResvNumber": "",
				"Posnr": "",
				"PartNumber": "",
				"ServiceProv": "",
				"EspQuantity": "",
				"EspQtyUnit": "",
				"EspPrice": "",
				"EspPriceUnit": "USD",
				"CommentText": "",
				"Revision": "",
				"TtsnActual": "",
				"RefOrder": "",
				"AogInd": "",
				"CompantName": "",
				"ContactName": "",
				"ContactPhone": "",
				"ContactEmail": "",
				"ReasonCode": "",
				"LongText": ""
	          };
		
		var Z_HDR_ITMN = [];
		
		var ttsn = (sap.ui.getCore().getModel("ttsn")).getData();
		var localCacheTTSN = (sap.ui.getCore().getModel("localCacheTTSN")).getData();
		var localCacheComp = (sap.ui.getCore().getModel("localCacheComp")).getData();
		var compDtls = (sap.ui.getCore().getModel("compDtls"));
		var waTopAndHdrModel = (sap.ui.getCore().getModel("waTopAndHdrModel"));
		
		var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
		
		/***Generate header payload***/
		if(typeof waTopAndHdrModel != "undefined"){
			var newHdr = JSON.parse(JSON.stringify(oPayload));
			newHdr.MainOrder = globalWANo;
			if(waTopAndHdrModel.oData.RefWoNumber != "" && typeof waTopAndHdrModel.oData.RefWoNumber != "undefined"){
//				newHdr.RefOrder = waTopAndHdrModel.oData.RefWoNumber.toUpperCase().replace("WA","");
				var value = waTopAndHdrModel.oData.RefWoNumber;
				var isError = pwc.app.util.WAFormatter.checkRefWANumberFormat(value);
				if(isError){
					return;
				}
				newHdr.RefOrder = value;
			}
			//TODO newHdr.Revision = "";
			if(waTopAndHdrModel.oData.Aog){
				newHdr.AogInd = "X";	
			}
			newHdr.Revision = waTopAndHdrModel.getData().RevisionNum;
			//newHdr.EventDate = "20170427";
			
			newHdr.Activity = "HD";
			Z_HDR_ITMN[Z_HDR_ITMN.length] = newHdr;
		}
		
		/***Generate post payload for ttsn***/
		for(var i=0;i<ttsn.results.length;i++){
			var oTTSN = ttsn.results[i];
			
			if(isNaN(oTTSN.EventReTtsn))
	        {
				sap.m.MessageBox.alert("Incorrect value in Actual TTSN for Engine "+oTTSN.EnSlNumber, {
					title: "Warning Message",
					icon: sap.m.MessageBox.Icon.WARNING,
					onClose: null,
					styleClass: ""
			});
				return;
	        }
			
			
			var isValiedttsn = this._floatingvalidation(oTTSN.EventReTtsn);
			if(isValiedttsn == false)
			{
				sap.m.MessageBox.alert("Provide correct value [e.g. 99999.9] in Actual TTSN for Engine "+oTTSN.EnSlNumber, {
					title: "Error Message",
					icon: sap.m.MessageBox.Icon.ERROR,
					onClose: null,
					styleClass: ""
				});
				return;
			}
			
			
			oTTSN.EventReTtsn = (this.roundNumber(oTTSN.EventReTtsn,1)).toString();
			
			
			var newTTSN = JSON.parse(JSON.stringify(oPayload));
			newTTSN.MainOrder = globalWANo;
			newTTSN.EngineSl = oTTSN.EnSlNumber;
			newTTSN.SubOrder = oTTSN.CsOrderSub;
			newTTSN.Activity = "EU";
			newTTSN.TtsnActual = oTTSN.EventReTtsn;
			Z_HDR_ITMN[Z_HDR_ITMN.length] = newTTSN;	
		}
		
		/***Generate post payload for company details***/
		if(typeof compDtls != "undefined" && typeof compDtls.oData != "undefined" ){
			for(var i=0;i<compDtls.oData.results.length;i++){
				var comp = compDtls.oData.results[i];
				if(typeof comp.CompName != "undefined" && comp.CompName != ""){
					var newComp = JSON.parse(JSON.stringify(oPayload));
					newComp.MainOrder = globalWANo;
					//TODO newComp.ServiceProv = 
					newComp.Activity = "CT";
					newComp.CompantName = comp.CompName;
					newComp.ContactName = comp.ContName;
					newComp.ContactPhone = comp.Phone;
					newComp.ContactEmail = comp.Email;
					newComp.ServiceProv = comp.CustNum;
					Z_HDR_ITMN[Z_HDR_ITMN.length] = newComp;	
				}
				
			}
		}
		
		var engLocalJson = (sap.ui.getCore().getModel("engDtlsLocalJSON"));
		console.log(engLocalJson);
		
		/***Loop for Engine ***/
		if(typeof engLocalJson != "undefined"){
			for(var i=0;i<engLocalJson.oData.engDtls.length;i++){
				var eng = engLocalJson.oData.engDtls[i];
				/*** add 10 with the last component Posnr value ***/
				eng.Posnr = Number(eng.Posnr) + 10;
				
				var longText = "";
				/***Loop for Workscope ***/
				if(typeof eng.wrkScpDtls != "undefined"){
					for(var k=0;k<eng.wrkScpDtls.length;k++){
						var wrkscp =eng.wrkScpDtls[k];
						/*** if workscope long text change then concat each long text(of workscope) ***/
						longText = longText + wrkscp.workscopekey+wrkscp.freetext + "#@!END!@#";

						/*** if reason code changes***/
						if(wrkscp.flag == "E"){
							var newWrkScp = JSON.parse(JSON.stringify(oPayload));
							newWrkScp.MainOrder = globalWANo;
							newWrkScp.SubOrder = eng.SubOrder;
							newWrkScp.Activity = "RC";
							newWrkScp.ReasonCode = wrkscp.reason;
							newWrkScp.WorkScope = wrkscp.workscopekey
							Z_HDR_ITMN[Z_HDR_ITMN.length] = newWrkScp;
						}

						/***Loop for Operations ***/
						if(typeof wrkscp.operations != "undefined"){
							for(var p=0;p<wrkscp.operations.length;p++){
								var oper = wrkscp.operations[p];
								if(oper.flag != "D" && isApproved && (typeof oper.ServicePrvd == "undefined" || oper.ServicePrvd == "")){
									errorWhileApprove = true;
									pwc.app.js.CommonUtility.validationMessage("Select Service Provider of "+ "Engine: " +eng.engSlNo +" Operation no: " + oper.Operation,"Error Message",sap.m.MessageBox.Icon.ERROR);
									return;
								}
								
								
								// Price Validation
								
								var isValiedPrice = pwc.app.js.ViewWADetailsUtility.priceValidation(oper.Price);
								if(oper.flag != "D" && isValiedPrice == false)
								{
									sap.m.MessageBox.alert("Provide correct Price [e.g: 99999999.99] in operation# "+ oper.Operation + " of workscope:"+ wrkscp.wrkscpname + " of Engine:" + eng.engSlNo , {
										title: "Error Message",
										icon: sap.m.MessageBox.Icon.ERROR,
										onClose: null,
										styleClass: ""
									});
									return;
								}
								
								
								
								/***Create operation new object for post payload1 ***/
								var newOper = JSON.parse(JSON.stringify(oPayload));
								newOper.Operation = oper.Operation;
								newOper.SubOrder = eng.SubOrder;
								newOper.MainOrder = globalWANo;
								newOper.WorkScope = wrkscp.workscopekey;
								newOper.Revision = oper.RevisionNum;
								switch(oper.flag) {
								    case "A":
								    	newOper.Activity = "OA";
										newOper.OperationText = oper.OperationDesc;
										newOper.EspPrice = oper.Price;
										newOper.ServiceProv = oper.vendorId;
										newOper.LongText = oper.LongText;
										Z_HDR_ITMN[Z_HDR_ITMN.length] = newOper;
								        break;
								    case "D":
								    	newOper.Activity = "OD";
								    	Z_HDR_ITMN[Z_HDR_ITMN.length] = newOper;
								        break;
								    case "E":
								    	newOper.Activity = "OC";
								    	newOper.OperationText = oper.OperationDesc;
										newOper.EspPrice = oper.Price;
										newOper.ServiceProv = oper.vendorId;
										newOper.LongText = oper.LongText;
										Z_HDR_ITMN[Z_HDR_ITMN.length] = newOper;
										break;
								    default:
								        console.log("wrong flag" + oper.flag);
								} 
							}
						}
						
						/***Loop for Components ***/
						if(typeof wrkscp.components != "undefined"){
							for(var c=0;c<wrkscp.components.length;c++){
								var comp = wrkscp.components[c];
								/*if(isApproved && (typeof comp.PartNumber == "undefined" || comp.PartNumber == "")){
									errorWhileApprove = true;
									pwc.app.js.CommonUtility.validationMessage("Select Part Number of "+ "Engine: " +eng.engSlNo +" Operation no: " + comp.Operation,"Error Message",sap.m.MessageBox.Icon.ERROR);
									return;
								}*/
						    	if(comp.flag != "D" && isApproved && (typeof comp.ServicePrvd == "undefined" || comp.ServicePrvd == "")){
						    		errorWhileApprove = true;
						    		pwc.app.js.CommonUtility.validationMessage("Select Part's Service Provider of "+ "Engine: " +eng.engSlNo +" Operation no: " + comp.Operation,"Error Message",sap.m.MessageBox.Icon.ERROR);
									return;
								}
						    	if(comp.flag != "D" && isApproved && (typeof comp.PartQuantity == "undefined" || comp.PartQuantity == ""  || comp.PartQuantity == 0)){
						    		errorWhileApprove = true;
						    		pwc.app.js.CommonUtility.validationMessage("Parts qty should not be 0 of "+ "Engine: " +eng.engSlNo +" Operation no: " + comp.Operation,"Error Message",sap.m.MessageBox.Icon.ERROR);
									return;
								}
								/***Create component new object for post payload12345 ***/
								var newComp = JSON.parse(JSON.stringify(oPayload));
								newComp.Operation = comp.Operation;
								newComp.SubOrder = eng.SubOrder;
								newComp.PartNumber = comp.PartNumber;
								newComp.MainOrder = globalWANo;
								newComp.Posnr = comp.Posnr;
								newComp.EspPriceUnit = "";
								newComp.Revision = comp.RevisionNum;
								switch(comp.flag) {
								    case "A":
								    	if(typeof comp.Operation == "undefined" || comp.Operation == ""){
								    		
								    		errorWhileApprove = true;
											pwc.app.js.CommonUtility.validationMessage("Engine: " +eng.engSlNo +", Workscope: "+wrkscp.wrkscpname+". Part table should have Operation Number","Error Message",sap.m.MessageBox.Icon.ERROR);
											return;
										}
								    	if(typeof comp.PartDesc == "undefined" || comp.PartDesc == ""){
								    		
								    		errorWhileApprove = true;
											pwc.app.js.CommonUtility.validationMessage("Engine: " +eng.engSlNo +", Workscope: "+wrkscp.wrkscpname+". Part table should have Part details","Error Message",sap.m.MessageBox.Icon.ERROR);
											return;
										}
								    	newComp.PartDesc = comp.PartDesc;
								    	newComp.NewOperation = comp.Operation;
								    	newComp.Activity = "PA";
								    	newComp.ServiceProv = comp.vendorId;
								    	newComp.WorkScope = wrkscp.workscopekey;
								    	newComp.EspQuantity = comp.PartQuantity.toString();
								    	newComp.LongText = comp.LongText;
								    	newComp.Posnr = (eng.Posnr).toString();
								    	eng.Posnr = Number(eng.Posnr) + 10;
								    	Z_HDR_ITMN[Z_HDR_ITMN.length] = newComp;
								        break;
								    case "D":
								    	newComp.Activity = "PD";
								    	newComp.ResvNumber = comp.PartItmNo;
								    	Z_HDR_ITMN[Z_HDR_ITMN.length] = newComp;
								        break;
								    case "E":
								    	if(typeof comp.Operation == "undefined" || comp.Operation == ""){
											pwc.app.js.CommonUtility.validationMessage("Engine: " +eng.engSlNo +", Workscope: "+wrkscp.wrkscpname+". Part table should have Operation Number","Error Message",sap.m.MessageBox.Icon.ERROR);
											return;
										}
								    	if(typeof comp.PartDesc == "undefined" || comp.PartDesc == ""){
											pwc.app.js.CommonUtility.validationMessage("Engine: " +eng.engSlNo +", Workscope: "+wrkscp.wrkscpname+". Part table should have Part Number or Description","Error Message",sap.m.MessageBox.Icon.ERROR);
											return;
										}
								    	newComp.PartDesc = comp.PartDesc;
								    	newComp.NewOperation = comp.Operation;
								    	newComp.Operation = comp.OldPartOperNum;
								    	newComp.Activity = "PC";
								    	newComp.ServiceProv = comp.vendorId;
								    	newComp.WorkScope = wrkscp.workscopekey;
								    	newComp.EspQuantity = comp.PartQuantity.toString();
								    	newComp.ResvNumber = comp.PartItmNo;
								    	newComp.LongText = comp.LongText;
								    	Z_HDR_ITMN[Z_HDR_ITMN.length] = newComp;
								        break;
								    default:
								        console.log("wrong flag" + comp.flag);
								} 
							}
						}
					}//end of workscope list
					/*** save workscope long text. no matter it has changed or not ***/
					var newWrkScp = JSON.parse(JSON.stringify(oPayload));
					newWrkScp.MainOrder = globalWANo;
					newWrkScp.SubOrder = eng.SubOrder;
					newWrkScp.Activity = "LT";
					newWrkScp.LongText= longText;
					if(typeof longText != "undefined" && longText != "" && longText.length > 1333){
						pwc.app.js.SaveWAUtility.breakLongText(Z_HDR_ITMN,longText,newWrkScp);	
					}
					else{
						Z_HDR_ITMN[Z_HDR_ITMN.length] = newWrkScp;	
					}
					
				}
			}//end of main loop
			
		}
		var postPayload ={};
		if(Z_HDR_ITMN.length > 0){
			postPayload ={
					  "d": {
						    "EngineSl": Z_HDR_ITMN[0].EngineSl,
						    "Z_HDR_ITMN": Z_HDR_ITMN
						  }
					};
		}
		return postPayload;
	},
	
	
	roundNumber: function(num, scale) {
	      var number = Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
	      if(num - number > 0) {
	        return (number + Math.floor(2 * Math.round((num - number) * Math.pow(10, (scale + 1))) / 10) / Math.pow(10, scale));
	      } else {
	        return number;
	      }
	    },
	
	
	_floatingvalidation: function(val)
	{
		if(isNaN(val))
        {
			return false
        }
		
		val = (this.roundNumber(val,1)).toString();
		
        var dindex = val.indexOf(".");
        var intpart; 
        var decpart;
        if(dindex != -1 )
        {
               intpart = val.substring(0,dindex);
               decpart = val.substring(dindex+1, val.length);
               if(intpart.length > 5 || decpart.length > 1 )
               {
            	  return false;
               }
               else
               {
            	  return true;
               }
        }
        else
        {
               if(val.length > 5)
               {
            	   return false;
        	   }
               else
               {
            	   return true;
               }
        }
        return true;


	},
	
	breakLongText : function(Z_HDR_ITMN,longText,newWrkScp){
		var l = longText.length;
		var cnt = parseInt(parseInt(l) / 131);
		for(var i=1;i<=cnt;i++){
			var s = longText.substring(0,131);
			console.log("s > "+ s);
			longText = longText.substring(131);
			console.log("remaining text >> " + longText + "  >>>Length:  " + longText.length);
			var newObj = JSON.parse(JSON.stringify(newWrkScp));
			newObj.LongText = s;
			Z_HDR_ITMN[Z_HDR_ITMN.length] = newObj;	
		}
		if(longText.length > 0){
			console.log("last text >> " + longText + "  >>>Length:  " + longText.length);
			var newObj = JSON.parse(JSON.stringify(newWrkScp));
			newObj.LongText = longText;
			Z_HDR_ITMN[Z_HDR_ITMN.length] = newObj;	
		}
	},
	
	
	
	
	_saveWorkAuthorization : function(that,isApproved,isReject,isAddWS,isDeleteEngine,deleteEngPostPayload){
//		var postPayload= "";
//		if(isDeleteEngine){
//			postPayload = deleteEngPostPayload;
//		}
//		else{
//			postPayload= pwc.app.js.SaveWAUtility._createSavePayload(that,isApproved);	
//		}
//		
//		
//		if(typeof postPayload == "undefined"){
//			return;
//		}
//	    var jsonPayload = JSON.stringify(postPayload);
//	    console.log(jsonPayload);
//	    sap.ui.core.BusyIndicator.show(0);
//	    $.ajax({
////	    url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet?$expand=Z_HDR_ITMN&$format=json",
//	  url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet?$expand=Z_HDR_ITMN&$format=json",
//	    type: "GET",
//	    async: true,
//	    contentType: "application/json",
////	    username: "P926442",
////	    password: "Saltlake@107",
//	    headers:  {       
//	               "Content-Type": "application/json", 
//	               "DataServiceVersion": "2.0",          
//	               "X-CSRF-Token":"Fetch"      
//	                                  },
//	      success: function(oData, status, request){
//	                console.log("GET " + status);
//	                console.log(oData);
//	                var xCSRFToken = request.getResponseHeader("x-csrf-token");
//	                console.log(xCSRFToken);
//	                
//	                $.ajax({
////	                url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet",
//	                        url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet",
//	                type: "POST",
//	                async: true,
//	                contentType: "application/json",
//	                data: jsonPayload,
////	                username: "P926442",
////	                password: "Saltlake@107",
//	                headers:  {       
//	                           "Content-Type": "application/json", 
//	                           "X-CSRF-Token":xCSRFToken      
//	                          },
//	                    success: function(oData, status, request) {
//	                    	sap.ui.core.BusyIndicator.hide();
//	                            console.log("POST " + status);
//	                            if(isAddWS){
//	                            	console.log("Changed data saved on click of Add WS");
//	                            }
//	                            else if(isApproved){
//	                            	var postPayloadApp= pwc.app.js.ApproveWAUtility._approvePostPayload(that);
//	                            	var jsonPayloadApp = JSON.stringify(postPayloadApp);
//	                            	pwc.app.js.ApproveWAUtility._approvePostCall(jsonPayloadApp,that);
//	                            }
//	                            else if(isReject){
//	                            	var postPayloadApp= pwc.app.js.RejectWAUtility._rejectPostPayload(that);
//	                            	var jsonPayloadApp = JSON.stringify(postPayloadApp);
//	                            	pwc.app.js.RejectWAUtility._rejectPostCall(jsonPayloadApp,that);
//	                            }
//	                            else{
//	                                //redirect to master controller method to fetch WA Number.
////	                            	splitAppInstance.getMasterPages()[0].getController()._getWADetails(globalWANo);
//	                            	pwc.app.js.ViewWADetailsUtility.getWADetails(globalWANo,that);
	                            	pwc.app.js.CommonUtility.messageToast("Data saved successfully");
//	                            }
//	                    },
//	                    error: function(oData, status, request) {
//	                    	sap.ui.core.BusyIndicator.hide();
//	                    	  if(isAddWS){
//	                          	console.log("ERROR [_saveWorkAuthorization]: Changed data saved on click of Add WS");
//	                          }
//	                            console.log("POST " + status);
//	                            console.log(oData);
//	                            pwc.app.js.CommonUtility.messageToast("Error occured while saving");
	                    
//	        });
	  

	}
	
}