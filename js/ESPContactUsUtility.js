jQuery.sap.declare("pwc.app.js.ESPContactUsUtility");

pwc.app.js.ESPContactUsUtility ={
		_handleContactUsPopoverPress: function(thisContext,oEvent) {
			var oDataModel = sap.ui.getCore().getModel("waModel");
			var filterStr = "ImCsOrder  eq '"+globalWANo+"'";
//			var expand = "Z_CSORDER_OPRN,Z_CSORDER_COMP,Z_CSORDER_ENG";
//			oDataModel.read('ZZ_ESP_CONTACT_DISPLAYSet', null, {
//				"$format" : "json",
//				"$filter" : filterStr
//			}, false, function(oData, oResponse) {
		        var obj = {
		        		  "d": {
		        			    "results": [
		        			      {
		        			        "__metadata": {
		        			          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ESP_CONTACT_DISPLAYSet('000070009775')",
		        			          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ESP_CONTACT_DISPLAYSet('000070009775')",
		        			          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_ESP_CONTACT_DISPLAY"
		        			        },
		        			        "ImCsOrder": "000070009775",
		        			        "CsOrder": "000070009775",
		        			        "ContactName": "deep",
		        			        "EmailId": "dkd",
		        			        "Telf1": "ewo",
		        			        "Telf2": "odid"
		        			      }
		        			    ]
		        			  }
		        			};

		        var oContact = obj.d.results[0];
		    	
				if (!thisContext._WAContactUsPopover) {
					thisContext._WAContactUsPopover = sap.ui.xmlfragment("pwc.app.fragment.WAContactUsPopover", thisContext);
					thisContext._WAContactUsPopover.setEndButton(new sap.m.Button({text:'Cancel',press: function () {thisContext._WAContactUsPopover.close();}}));
					
					 thisContext._WAContactUsPopover.setBeginButton(
						      new sap.m.Button({
								text : 'Confirm', // string
								press : [ function(oEvent) {
									var control = oEvent.getSource();
									pwc.app.js.ESPContactUsUtility._handleConfirmContactUs(thisContext);
									thisContext._WAContactUsPopover.close();
								}, this ]
						      })
				      );
					thisContext.getView().addDependent(thisContext._WAContactUsPopover);
			    }
				
				if(oContact == undefined)
				{
					oContact = {
							ContactName : "",	
							CsOrder : globalWANo,
							EmailId : "",
							ImCsOrder : "",
							Telf1 : "",
							Telf2 : ""
					};
					var oModel = new sap.ui.model.json.JSONModel(oContact);
					thisContext._WAContactUsPopover.setModel(oModel);

				}
				else
				{
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(oContact);
					thisContext._WAContactUsPopover.setModel(oModel);
				}
			
				var tempModel = new sap.ui.model.json.JSONModel();
				var temp = JSON.parse(JSON.stringify(oContact));
				tempModel.setData(temp);
				sap.ui.getCore().setModel(tempModel,"contactUsModel");
				
				
		
			    // toggle compact style
			    jQuery.sap.syncStyleClass("sapUiSizeCompact", thisContext.getView(), thisContext._WAContactUsPopover);
			   
			    var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
				 if(waTopAndHdrModel.getData().ViewOnly == "X"){
					 var x=thisContext._WAContactUsPopover.getBeginButton();
					 x.setVisible(false); //Confirm button
				 }
				 else{
					 var x=thisContext._WAContactUsPopover.getBeginButton();
					 x.setVisible(true); //Confirm button
				 }
				
			    thisContext._WAContactUsPopover.openBy(oEvent.getSource());
			
			
		},
		
		_handleConfirmContactUs: function(that) {
			var oModel = that._WAContactUsPopover.getModel().getData();
			var contactUsModel = sap.ui.getCore().getModel("contactUsModel").getData();
			var flag = false;
			if(oModel.ContactName != contactUsModel.ContactName){
				flag = true;
			}
			if(oModel.EmailId != contactUsModel.EmailId){
				flag = true;
			}
			if(oModel.Telf1 != contactUsModel.Telf1){
				flag = true;
			}
			if(oModel.Telf2 != contactUsModel.Telf2){
				flag = true;
			}

			var postPayload = {};
			if(flag){
				postPayload.d=  oModel;
				$.ajax({
//			    	url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ESP_CONTACT_UPDSet?$format=json",
					url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ESP_CONTACT_DISPLAYSet?$format=json",
			    	type: "GET",
			    	async: true,
			    	contentType: "application/json",
//			    	username: "P926442",
//			    	password: "Saltlake@107",
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
			    		
						var jsonPayload = JSON.stringify(postPayload);
			    		
			    		$.ajax({
//			    	    	url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ESP_CONTACT_UPDSet",
			    			url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ESP_CONTACT_DISPLAYSet",
			    	    	type: "POST",
			    	    	async: true,
			    	    	contentType: "application/json",
			    	    	data: jsonPayload,
//			    	    	username: "P926442",
//			    	    	password: "Saltlake@107",
			    	    	headers:  {       
						        	  	"Content-Type": "application/json", 
						        	  	"X-CSRF-Token":xCSRFToken      
									  },
			    	    	success: function(oData, status, request) {
			    	    		console.log("POST " + status);
			    	    	},
			    	    	error: function(oData, status, request) {
			    	    		console.log("POST " + status);
			    	    		console.log(oData);
			    	    	}
			    	    });
			    	},
			    	error: function(oData, status, request) {
	    	    		console.log("GET" + status);
	    	    		console.log(oData);
	    	    	}
			    });
			}
			
			that._WAContactUsPopover.close();
		},
		/*** Contact Us Pop over End ***/

}
