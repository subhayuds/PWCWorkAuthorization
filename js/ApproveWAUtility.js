jQuery.sap.declare("pwc.app.js.ApproveWAUtility");
jQuery.sap.require("pwc.app.js.SaveWAUtility");
jQuery.sap.require("pwc.app.js.ViewWADetailsUtility");
jQuery.sap.require("pwc.app.util.WAFormatter");
jQuery.sap.require("pwc.app.js.CommonUtility");
jQuery.sap.require("pwc.app.js.ShippingInfoUtility");

pwc.app.js.ApproveWAUtility = {
		
	/*** Confirmation message before Approve WA***/
	 _approveAndSaveWA : function(that,oEvent){//
		var engLocalJson = (sap.ui.getCore().getModel("engDtlsLocalJSON"))
		if(typeof engLocalJson == "undefined"){
			sap.m.MessageBox.alert("Work Authorization does not have any Engine details or Workscopes to Approve", {
			    title: "Error Message",
			    icon: sap.m.MessageBox.Icon.ERROR,
			    onClose: null,
			    styleClass: ""
			});
			
			return;
		}
		if(typeof engLocalJson != "undefined"){
			if(engLocalJson.oData.engDtls.length == 0){
				sap.m.MessageBox.alert("Work Authorization does not have any Engine details or Workscopes to Approve", {
				    title: "Error Message",
				    icon: sap.m.MessageBox.Icon.ERROR,
				    onClose: null,
				    styleClass: ""
				});
				return;
			}	
		}
		var engLocalJson = (sap.ui.getCore().getModel("engDtlsLocalJSON")).getData();
		if(engLocalJson.engDtls.length == 0){
			return;
		}
		
		var shipTo = sap.ui.getCore().getModel("primaryShipTo");
		var endPoint = sap.ui.getCore().getModel("endpointShipTo"); 
		
		
		this.getRevisionNumber();
		var isPdcShpfrm = sap.ui.getCore().getModel("isPdcShpfrm").getData();
//		if(true)return;
		if(isPdcShpfrm)
		{
		
			if(typeof shipTo != "undefined"){
				if(endPoint != undefined)
					pwc.app.js.ApproveWAUtility._openPrimaryShipToDetails(that,oEvent,shipTo.getData() , endPoint.getData()); 
				else
					pwc.app.js.ApproveWAUtility._openPrimaryShipToDetails(that,oEvent,shipTo.getData() , null); 
			}
			else{
				pwc.app.js.ApproveWAUtility._getShipTo(that,oEvent);
			}
		
		}
		else
		{
			this._approvewithNoCheck(that,oEvent);
		}
		
		
		},
		
		
		_approvewithNoCheck:function(that,oEvent){
			var json= pwc.app.js.SaveWAUtility._createSavePayload(that,true);
			if(!errorWhileApprove)
			{//check if any error occurred while creating post payload for saving
				if(typeof json != "undefined" && typeof json.d != "undefined" && json.d.Z_HDR_ITMN.length>0)
				{
					console.log("user has changed something and it will saved automatically");
					pwc.app.js.SaveWAUtility._saveWorkAuthorization(that,true,false,false,false,"");					
				}
				else
				{
					console.log("Approv without any changes");
					var postPayloadApp= pwc.app.js.ApproveWAUtility._approvePostPayload(that);
			    	var jsonPayloadApp = JSON.stringify(postPayloadApp);
			    	pwc.app.js.ApproveWAUtility._approvePostCall(jsonPayloadApp,that);
				}
			}	
			errorWhileApprove = false;
		},
	
		
		_openPrimaryShipToDetails:function(that,oEvent,shipTo,endPoint){
			if (!that.ShipToBeforeApproveDialog) {
				that.ShipToBeforeApproveDialog = sap.ui.xmlfragment("pwc.app.fragment.ShipToBeforeApproveDialog", that.getView().getController());
				that.ShipToBeforeApproveDialog.setEndButton(new sap.m.Button({text:'Cancel',press: function () {
					that.ShipToBeforeApproveDialog.close();
					sap.ui.getCore().byId("endpointdetails").removeAllItems(); 
					sap.ui.getCore().byId("primarydetails").removeAllItems(); 
					}
				}));
			      that.ShipToBeforeApproveDialog.setBeginButton(
					      new sap.m.Button({
							text : 'Confirm', // string
							press : [ function(oEvent) {
								var control = oEvent.getSource();
								var reqBy = that.ShipToBeforeApproveDialog.getModel().getData().DelvDate;
								if(typeof reqBy != "undefined" && reqBy != "" && reqBy != 'null'){
									var splReqBy = reqBy.split("-");
									reqBy = splReqBy[2] + " " + splReqBy[1] + " " + splReqBy[0] // "2017 Jun 19" for IE 11
									var delDt = new Date(reqBy);
									var lngDelDt = delDt.getTime();
									var crrDt = new Date().setHours(0,0,0,0);
									if(lngDelDt < crrDt){
										pwc.app.js.CommonUtility.validationMessage("Required By should not be less than Current Date.","Error Message",sap.m.MessageBox.Icon.ERROR);
										return;
									}
								}
								else{
									pwc.app.js.CommonUtility.validationMessage("Required By should not be blank.","Error Message",sap.m.MessageBox.Icon.ERROR);
									return;
								}
							
									//invoke save
									var json= pwc.app.js.SaveWAUtility._createSavePayload(that,true);
								if(!errorWhileApprove){//check if any error occurred while creating post payload for saving
									if(typeof json != "undefined" && typeof json.d != "undefined" && json.d.Z_HDR_ITMN.length>0){
										console.log("user has changed something and it will saved automatically");
										pwc.app.js.SaveWAUtility._saveWorkAuthorization(that,true,false,false,false,"");					
									}
									else{
										console.log("Approv without any changes");
										var postPayloadApp= pwc.app.js.ApproveWAUtility._approvePostPayload(that);
								    	var jsonPayloadApp = JSON.stringify(postPayloadApp);
								    	pwc.app.js.ApproveWAUtility._approvePostCall(jsonPayloadApp,that);
									}
								}
								errorWhileApprove = false;
								that.ShipToBeforeApproveDialog.close();
								
								sap.ui.getCore().byId("endpointdetails").removeAllItems(); 
								sap.ui.getCore().byId("primarydetails").removeAllItems(); 
								
							}, this ]
					      })
			      );
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(shipTo);
				that.ShipToBeforeApproveDialog.setModel(oModel);
				that.getView().addDependent(that.ShipToBeforeApproveDialog);
		    }
			else{
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(shipTo);
				that.ShipToBeforeApproveDialog.setModel(oModel);
				that.getView().addDependent(that.ShipToBeforeApproveDialog);
			}
	
		    // toggle compact style
		    jQuery.sap.syncStyleClass("sapUiSizeCompact", that.getView(), that.ShipToBeforeApproveDialog);
		    that.ShipToBeforeApproveDialog.open();
		    
		    
		    var width = "76px";
		    if(endPoint == null)
		    {
		    	width = "22px";
		    }
		    var primaryShiptoParentHBox = sap.ui.getCore().byId("primarydetails");
	    	var primaryVBox1 = new sap.m.VBox({
	    		items:[
	    			new sap.m.HBox({
	    				items:[
	    					new sap.m.Label({
	    						text : "Ship to:"
	    					}),
	    					new sap.m.ToolbarSpacer({
	    						width : width
	    					})
	    				]
	    			})
	    		]
	    	});
	    	var primaryVBox2= new sap.m.VBox();
	    	
	    	if(shipTo.CareOf != null && shipTo.CareOf != "" && shipTo.CareOf != undefined)
	    	{
	    		var str = "Care of: " +  shipTo.CareOf;
	    		primaryVBox2.addItem(new sap.m.Text({width: "250px", text : str, wrapping : true}).addStyleClass("boldText"));
	    		
	    	}
	    	
	    	if(shipTo.Name1 != ""){
	    		primaryVBox2.addItem(new sap.m.Text({text : shipTo.Name1 , wrapping : true}).addStyleClass("boldText"));	
	    	}
	    	if(shipTo.Adressline1 != ""){
	    		primaryVBox2.addItem(new sap.m.Text({width: "280px", text : shipTo.Adressline1 , wrapping : true}).addStyleClass("boldText"));
	    	}
	    	if(shipTo.Adressline2 != ""){
	    		primaryVBox2.addItem(new sap.m.Text({width: "280px", text : shipTo.Adressline2 , wrapping : true}).addStyleClass("boldText"));
	    	}
	    	if(shipTo.Adressline3 != ""){
	    		primaryVBox2.addItem(new sap.m.Text({width: "280px", text : shipTo.Adressline3 , wrapping : true}).addStyleClass("boldText"));
		    }
	    	var hbox = new sap.m.HBox();
	    	if(shipTo.City != ""){
	    		hbox.addItem(new sap.m.Text({text : shipTo.City , wrapping : true}).addStyleClass("boldText"));
	    		hbox.addItem(new sap.m.Text({text : " ,\u00a0" , wrapping : true}).addStyleClass("boldText"));
	    	}
	    	if(shipTo.RegDesc != ""){
	    		hbox.addItem(new sap.m.Text({text : shipTo.RegDesc , wrapping : true}).addStyleClass("boldText"));
	    		hbox.addItem(new sap.m.Text({text : " ,\u00a0" , wrapping : true}).addStyleClass("boldText"));
	    	}
	    	if(shipTo.PostCode != ""){
	    		hbox.addItem(new sap.m.Text({text : shipTo.PostCode , wrapping : true}).addStyleClass("boldText"));
		    }
	    	primaryVBox2.addItem(hbox);
	    	if(shipTo.CountryName != ""){
	    		primaryVBox2.addItem(new sap.m.Text({text : shipTo.CountryName , wrapping : true}).addStyleClass("boldText"));
		    }
	    	
	    	
	    	
	    	
	    	primaryShiptoParentHBox.addItem(primaryVBox1);
	    	primaryShiptoParentHBox.addItem(primaryVBox2);
		    
		    
		    if( endPoint != null)
		    {
		    	var parentHBox = sap.ui.getCore().byId("endpointdetails");
		    	var vBox1 = new sap.m.VBox({
		    		items:[
		    			new sap.m.HBox({
		    				items:[
		    					new sap.m.Label({
		    						text : "End Destination:"
		    					}),
		    					new sap.m.ToolbarSpacer({
		    						width : "20px"
		    					})
		    				]
		    			})
		    		]
		    	});
		    	
		    	var vBox2= new sap.m.VBox();
		    	if(endPoint.CareOf != null && endPoint.CareOf != "" && endPoint.CareOf != undefined)
		    	{
		    		var str = "Care of: " +  endPoint.CareOf;
		    		vBox2.addItem(new sap.m.Text({width: "250px", text : str, wrapping : true}).addStyleClass("boldText"));
		    		
		    	}
		    	
		    	if(endPoint.Name1 != ""){
		    		vBox2.addItem(new sap.m.Text({text : endPoint.Name1 , wrapping : true}).addStyleClass("boldText"));	
		    	}
		    	if(endPoint.Adressline1 != ""){
		    		vBox2.addItem(new sap.m.Text({width: "280px", text : endPoint.Adressline1 , wrapping : true}).addStyleClass("boldText"));
		    	}
		    	if(endPoint.Adressline2 != ""){
		    		vBox2.addItem(new sap.m.Text({width: "280px", text : endPoint.Adressline2 , wrapping : true}).addStyleClass("boldText"));
		    	}
		    	if(endPoint.Adressline3 != ""){
		    		vBox2.addItem(new sap.m.Text({width: "280px", text : endPoint.Adressline3 , wrapping : true}).addStyleClass("boldText"));
			    }
		    	var hbox = new sap.m.HBox();
		    	if(endPoint.City != ""){
		    		hbox.addItem(new sap.m.Text({text : endPoint.City , wrapping : true}).addStyleClass("boldText"));
		    		hbox.addItem(new sap.m.Text({text : " ,\u00a0" , wrapping : true}).addStyleClass("boldText"));
		    	}
		    	if(endPoint.RegDesc != ""){
		    		hbox.addItem(new sap.m.Text({text : endPoint.RegDesc , wrapping : true}).addStyleClass("boldText"));
		    		hbox.addItem(new sap.m.Text({text : " ,\u00a0" , wrapping : true}).addStyleClass("boldText"));
		    	}
		    	if(endPoint.PostCode != ""){
		    		hbox.addItem(new sap.m.Text({text : endPoint.PostCode , wrapping : true}).addStyleClass("boldText"));
			    }
		    	vBox2.addItem(hbox);
		    	if(endPoint.CountryName != ""){
		    		vBox2.addItem(new sap.m.Text({text : endPoint.CountryName , wrapping : true}).addStyleClass("boldText"));
			    }
		    	parentHBox.addItem(vBox1);
		    	parentHBox.addItem(vBox2);
		    }
		    
			
		},
		
		getCountryAndRegion : function(rsltValue){

			var oDataModel = sap.ui.getCore().getModel("waModel");
			var filterStr = "ImMainOrder eq '"+globalWANo+"'";
			oDataModel.read('ZZ_CNTRY_REGIOSet', null, {
				"$format" : "json",
				"$filter" : filterStr
			},false,function(oData,oResponse){
				var obj = JSON.parse(oResponse.body);
				var oData ={};
		        oData.results = obj.d.results;
		        
				for(var j=0;j<oData.results.length;j++){
					var obj = oData.results[j];
					if(rsltValue.Country == obj.Country){
						rsltValue.CountryName = obj.CountryDesc;
					}
					if(rsltValue.Country == obj.Country && rsltValue.Region == obj.Region){
						rsltValue.RegDesc = obj.RegionDesc;
					}
				}



		        
		        
			}, function(oError) { //
				console.log("error");
			});
			
		},
		
		
		_getShipTo :function(that,oEvent){
			var oDataModel = sap.ui.getCore().getModel("waModel");
			var filterStr = "Aufnr eq '"+globalWANo+"'";
			var thisContext = this;
			oDataModel.read('ZShipment_UpdateSet', null, {
				"$format" : "json",
				"$filter" : filterStr
			}, false, function(oData, oResponse) {
		        var obj = JSON.parse(oResponse.body);
		        var oData ={};
		        if(typeof obj != "undefined" && typeof obj.d !="undefined"){
		        	var primaryfound = false; 
		        	var endpointfound = false; 
		        	var primaryObject, enpointObject; 
		        	oData.results = obj.d.results;
					for(var count=0;count<obj.d.results.length;count++) {
						var rsltValue=obj.d.results[count];
						if(rsltValue.PrimaryShip == "X"){
							rsltValue.PrimaryShip = "Primary";
							if(typeof rsltValue.DelvDate != "undefined" && rsltValue.DelvDate != ""){
								 var s = rsltValue.DelvDate.split("-");
								 var dt = s[2]+s[1]+s[0];
								 rsltValue.DelvDate = pwc.app.util.WAFormatter._convDate(dt);	 
							}
							pwc.app.js.ApproveWAUtility.getCountryAndRegion(rsltValue);
							primaryfound = true;  
							primaryObject = rsltValue;  
							//pwc.app.js.ApproveWAUtility._openPrimaryShipToDetails(that,oEvent,rsltValue); 
							//return; 
						}
						
						
						if(rsltValue.EndPoint == "X"){
							rsltValue.EndPoint = "EndPoint";
							if(typeof rsltValue.DelvDate != "undefined" && rsltValue.DelvDate != ""){
								 var s = rsltValue.DelvDate.split("-");
								 var dt = s[2]+s[1]+s[0];
								 rsltValue.DelvDate = pwc.app.util.WAFormatter._convDate(dt);	 
							}
							pwc.app.js.ApproveWAUtility.getCountryAndRegion(rsltValue);
							endpointfound = true; 
							enpointObject = rsltValue; 
						}
						
					}
					
					if(primaryfound == true)
					{
						if(endpointfound == true)
						{
							primaryObject.EndPoint = true;
						pwc.app.js.ApproveWAUtility._openPrimaryShipToDetails(that,oEvent,primaryObject,enpointObject);
						return
						}
						else
						{
							primaryObject.EndPoint = false;
							pwc.app.js.ApproveWAUtility._openPrimaryShipToDetails(that,oEvent,primaryObject,null);
							return
						}
					}
					else
					{
					
					pwc.app.js.CommonUtility.validationMessage("No Primary Ship To found","Error Message",sap.m.MessageBox.Icon.ERROR);
					return;
					} 
		        }
				pwc.app.js.CommonUtility.validationMessage("No Primary Ship To found","Error Message",sap.m.MessageBox.Icon.ERROR);
				
			}, function(oError) { //
				console.log("error");
				pwc.app.js.CommonUtility.validationMessage("Error while retrieving Ship To information","Error Message",sap.m.MessageBox.Icon.ERROR);
			});
		},
		
		/*** Return post payload for Approve WA***/
		 _approvePostPayload : function(that){
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
			var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
			
			var newApp = JSON.parse(JSON.stringify(oPayload));
			newApp.MainOrder= globalWANo;
			newApp.Activity = "AP";
			//newApp.Revision = (typeof waTopAndHdrModel.getData().RevisionNum != "undefined" && waTopAndHdrModel.getData().RevisionNum != "") ? (parseInt(waTopAndHdrModel.getData().RevisionNum) + 1).toString() : "";
			newApp.Revision = (pwc.app.js.ApproveWAUtility.getRevisionNumber()).toString();
			Z_HDR_ITMN[0] = newApp;
			
			var postPayload ={};
			if(Z_HDR_ITMN.length > 0){
				postPayload ={
						  "d": {
							    "EngineSl": "Approve",
							    "Z_HDR_ITMN": Z_HDR_ITMN
							  }
						};
			}
			return postPayload;
		},
		
		getRevisionNumber : function(){
			var engLocalJson = (sap.ui.getCore().getModel("engDtlsLocalJSON"));
			console.log(engLocalJson);
			var isPdcShpfrm = false;
			var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
			var maxRev = 0;
			/***Loop for Engine ***/
			if(typeof engLocalJson != "undefined"){
				for(var i=0;i<engLocalJson.oData.engDtls.length;i++){
					var eng = engLocalJson.oData.engDtls[i];
					if(typeof eng.wrkScpDtls != "undefined"){
						var compMaxObj = "";
						for(var k=0;k<eng.wrkScpDtls.length;k++){
							var wrkscp =eng.wrkScpDtls[k];
							
							//operation
							if(typeof wrkscp.operations != "undefined"){
								for(var p=0;p<wrkscp.operations.length;p++){
									var oper = wrkscp.operations[p];
									if(oper.RevisionNum !="" && parseInt(oper.RevisionNum) >= parseInt(maxRev)){
										maxRev = parseInt(oper.RevisionNum);
										compMaxObj = "";
									}
								}
							}
							
							//component
							if(typeof wrkscp.components != "undefined"){
								var comMaxRev = 0;
								var compObj = "";
								
								for(var c=0;c<wrkscp.components.length;c++){
									var comp = wrkscp.components[c];
									
									if(comp.RevisionNum !="" && parseInt(comp.RevisionNum) >= parseInt(maxRev)){
										maxRev = parseInt(comp.RevisionNum);
										compMaxObj = comp;
									}
									
									/*if(comp.RevisionNum !="" && parseInt(comp.RevisionNum) >= parseInt(comMaxRev)){
										comMaxRev = parseInt(comp.RevisionNum);
									}*/
									compObj = comp;
								}
								/*if((waTopAndHdrModel.getData().Status == "DRAFT" && compObj.PdcShpfrm == "X" || compObj.PdcShpfrm == "x") || (compMaxObj != "" && (compMaxObj.PdcShpfrm == "X" || compMaxObj.PdcShpfrm == "x"))){
									isPdcShpfrm = true;
								}*/
								
							}
							
						}
						if(waTopAndHdrModel.getData().Status == "DRAFT" && compObj.PdcShpfrm == "X" || compObj.PdcShpfrm == "x"){
							isPdcShpfrm = true;
						}
						else if(compMaxObj != "" && (compMaxObj.PdcShpfrm == "X" || compMaxObj.PdcShpfrm == "x")){
							isPdcShpfrm = true;
						}
						
						
					}
				}
			}
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(isPdcShpfrm);
			sap.ui.getCore().setModel(oModel,"isPdcShpfrm");
			return maxRev;
		},

		/*** Post call for Approve***/
		 _approvePostCall:function(jsonPayload,that){
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
		                        	pwc.app.js.CommonUtility.messageToast("Approved successfully");
		                    },
		                    error: function(oData, status, request) {
		                    	sap.ui.core.BusyIndicator.hide();
		                            console.log("POST " + status);
		                            console.log(oData);
		                            pwc.app.js.CommonUtility.messageToast("Error occured while approving");
		                    }
		        });
		    },
		    error: function(oData, status, request) {
		    	sap.ui.core.BusyIndicator.hide();
		    console.log("GET" + status);
		    console.log(oData);
		    pwc.app.js.CommonUtility.messageToast("Error occured while approving");
			}
			});
		}	
}
