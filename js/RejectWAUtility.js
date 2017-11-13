jQuery.sap.declare("pwc.app.js.RejectWAUtility");
jQuery.sap.require("pwc.app.js.SaveWAUtility");
jQuery.sap.require("pwc.app.js.ViewWADetailsUtility");
jQuery.sap.require("pwc.app.js.CommonUtility");

pwc.app.js.RejectWAUtility = {
		
		
		/*** Confirmation message before Reject***/
		 _rejectAndSaveWA:function(that){
			sap.m.MessageBox.confirm("Please confirm to Decline.",
					function (oAction) {
					if (sap.m.MessageBox.Action.OK === oAction) {
						var json= pwc.app.js.SaveWAUtility._createSavePayload(that,false);
						if(typeof json.d != "undefined" && json.d.Z_HDR_ITMN.length>0){
							console.log("user has changed something and it will saved automatically");
							pwc.app.js.SaveWAUtility._saveWorkAuthorization(that,false,true,false,false,"");					
						}
						else{
							console.log("Reject without any changes");
							var postPayloadApp= pwc.app.js.RejectWAUtility._rejectPostPayload(that);
					    	var jsonPayloadApp = JSON.stringify(postPayloadApp);
					    	pwc.app.js.RejectWAUtility._rejectPostCall(jsonPayloadApp,that);
						}
					}
				}
				);
		},

		/*** Return post payload for Reject WA***/
		 _rejectPostPayload:function(that){
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
					"EspPriceUnit": "",
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
			
			var newApp = JSON.parse(JSON.stringify(oPayload));
			newApp.MainOrder= globalWANo;
			newApp.Activity = "RJ";
			
			Z_HDR_ITMN[0] = newApp;
			
			var postPayload ={};
			if(Z_HDR_ITMN.length > 0){
				postPayload ={
						  "d": {
							    "EngineSl": "Reject",
							    "Z_HDR_ITMN": Z_HDR_ITMN
							  }
						};
			}
			return postPayload;
		},
		/*** Post call to Reject WA***/
		 _rejectPostCall:function(jsonPayload,that){
			 sap.ui.core.BusyIndicator.show(0);
		    $.ajax({
//		    url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet?$expand=Z_HDR_ITMN&$format=json",
		  url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet?$expand=Z_HDR_ITMN&$format=json",
		    type: "GET",
		    async: true,
		    contentType: "application/json",
//		    username: "P926442",
//		    password: "Saltlake@107",
		    headers:  {       
		               "Content-Type": "application/json", 
		               "DataServiceVersion": "2.0",          
		               "X-CSRF-Token":"Fetch"      
		                                  },
		      success: function(oData, status, request){
		                console.log("GET " + status);
		                console.log(oData);
		                var xCSRFToken = request.getResponseHeader("x-csrf-token");
		                console.log(xCSRFToken);
		                
		                $.ajax({
//		                url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet",
		                        url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet",
		                type: "POST",
		                async: true,
		                contentType: "application/json",
		                data: jsonPayload,
//		                username: "P926442",
//		                password: "Saltlake@107",
		                headers:  {       
		                           "Content-Type": "application/json", 
		                           "X-CSRF-Token":xCSRFToken      
		                          },
		                    success: function(oData, status, request) {
		                    	sap.ui.core.BusyIndicator.hide();
		                            console.log("POST " + status);
		                            
		                            //redirect to master controller method to fetch WA Number.
		                            pwc.app.js.ViewWADetailsUtility.getWADetails(globalWANo,that);
		                        	pwc.app.js.CommonUtility.messageToast("Decline successfully");
		                    },
		                    error: function(oData, status, request) {
		                    	sap.ui.core.BusyIndicator.hide();
		                            console.log("POST " + status);
		                            console.log(oData);
		                            pwc.app.js.CommonUtility.messageToast("Error occured while rejecting");
		                    }
		        });
		    },
		    error: function(oData, status, request) {
		    	sap.ui.core.BusyIndicator.hide();
		    console.log("GET" + status);
		    console.log(oData);
		    pwc.app.js.CommonUtility.messageToast("Error occured while rejecting");
			}
			});
		}
		
		
}