jQuery.sap.declare("pwc.app.js.WorkScopeUtility");
jQuery.sap.require("pwc.app.js.SaveWAUtility");
jQuery.sap.require("pwc.app.js.CommonUtility");

pwc.app.js.WorkScopeUtility = {
		
		_getWorkTypes:function(thisContext){
//			var oDataModel = sap.ui.getCore().getModel("waModel");
			
//			oDataModel.read('ZZ_WORKTYPE_LISTSet', null, {
//				"$format" : "json"
//				}, false, function(oData, oResponse) {
		        var obj = {"d":{"results":[{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('ENGINE%20REPAIR%20%28IN%20FIELD%29')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('ENGINE%20REPAIR%20%28IN%20FIELD%29')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"ENGINE REPAIR (IN FIELD)"},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('FIELD%20W-SCOPE')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('FIELD%20W-SCOPE')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"FIELD W-SCOPE"},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('HSI')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('HSI')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"HSI"},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('INTERNAL')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('INTERNAL')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"INTERNAL"},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('L1.3')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('L1.3')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"L1.3"},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('LLP''S')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('LLP''S')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"LLP'S"},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('LRU%20REPLACEMENT')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('LRU%20REPLACEMENT')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"LRU REPLACEMENT"},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('OVERHAUL')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('OVERHAUL')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"OVERHAUL"},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('PERIODIC%20INSP')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('PERIODIC%20INSP')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"PERIODIC INSP"},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('SB%20INCORP.')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('SB%20INCORP.')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"SB INCORP."},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('SHOP%20W-SCOPE')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('SHOP%20W-SCOPE')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"SHOP W-SCOPE"},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('SVC%20BULLETIN')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('SVC%20BULLETIN')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"SVC BULLETIN"},{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('TROUBLESHOOTING')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKTYPE_LISTSet('TROUBLESHOOTING')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKTYPE_LIST"},"WorkType":"TROUBLESHOOTING"}]}};
		        var oData = {};
		        oData.results = obj.d.results;
		        
		       //Add Work Scope Dialog box
				if (!thisContext._searchWSDialog) {
					thisContext._searchWSDialog = sap.ui.xmlfragment("pwc.app.fragment.searchWSDialog", thisContext.getView().getController());
					thisContext._searchWSDialog.setEndButton(new sap.m.Button({text:'Cancel',press: function () {
						thisContext._searchWSDialog.close();
						pwc.app.js.WorkScopeUtility._resetWSPopup();
						}
					}));
					thisContext._searchWSDialog.setBeginButton(
								      new sap.m.Button({
										text : 'Confirm', // string
										press : [ function(oEvent) {
											var control = oEvent.getSource();
											var add = pwc.app.js.WorkScopeUtility._confirmAddWS(thisContext);
											if(add == true)
												thisContext._searchWSDialog.close();
										}, this ]
								      })
					);
					thisContext.getView().addDependent(thisContext._searchWSDialog);
			    }
	
			    // toggle compact style
			    jQuery.sap.syncStyleClass("sapUiSizeCompact", thisContext.getView(), thisContext._searchWSDialog);
			    thisContext._searchWSDialog.open();
			    
			    //initiate add workscopoe table.
			    var addWSData = {addWrkScpTbl :[]};
			    var oModel = new sap.ui.model.json.JSONModel();
			    oModel.setData(addWSData)
			    sap.ui.getCore().setModel(oModel,"addWSData"); 
			    
			    //set engine check box
			    var oTTSN = sap.ui.getCore().getModel("ttsn");
			    var hBoxEng = sap.ui.getCore().byId('engChkBoxPrnt');
			    var x = $('#engChkBoxPrnt').children();
				if(x.length > 0){
					var cnt = sap.ui.getCore().byId("engChkBox");
					cnt.destroy();	
				}
				var chlBox = new sap.m.HBox({
					id : "engChkBox", 
				});
				hBoxEng.addItem(chlBox);
				
			    for(var i=0;i<oTTSN.oData.results.length;i++){
			    	var ttsn = oTTSN.oData.results[i];
				    var chkBox =new sap.m.CheckBox({
						id : "W"+ttsn.EnSlNumber, 
						name : ttsn.EnSlNumber,
						text : ttsn.EnSlNumber,
						select : [ function(oEvent) {
							var control = oEvent.getSource();
						}, this ]
					});
				    chlBox.addItem(chkBox);
			    }
			    
			    //Set data into work scope drop down.
			    oData.results.splice(0, 0,{"WorkType" : "Select WorkType"});
			    var mModel = new sap.ui.model.json.JSONModel(oData); 
			    sap.ui.getCore().setModel(mModel,"ddData"); 
//			    var oItemTemplate = new sap.ui.core.ListItem({key:"{ddData>WorkType}",text:"{ddData>WorkType}"});
			    var oItemTemplate = new sap.ui.core.Item({key:"{WorkType}",text:"{WorkType}"});
			    var oSelectMenu = sap.ui.getCore().byId('wrkTypeSelectMenu');
			    oSelectMenu.setModel(mModel);
			    oSelectMenu.bindItems("/results", oItemTemplate);
			    oSelectMenu.attachChange(
	    		   function(){
	    			   pwc.app.js.WorkScopeUtility._getWorkScopeForSelectedWorkType(oSelectMenu.getSelectedItem().mProperties.key);
	    		   }
			    );
				
			
		},
		
		_getWorkScopeForSelectedWorkType:function(selWrkType){
			var oDataModel = sap.ui.getCore().getModel("waModel");
			var filterStr = "ImWorkType eq '"+selWrkType+"' and ImMainOrder eq '"+globalWANo+"'";
//			oDataModel.read('ZZ_WORKSCOPE_LISTSet', null, {
//				"$format" : "json",
//				"$filter" : filterStr,
//				}, false, function(oData, oResponse) {
		        var obj = {"d":{"results":[{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKSCOPE_LISTSet('ENGINE%20REPAIR%20%28IN%20FIELD%29')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORKSCOPE_LISTSet('ENGINE%20REPAIR%20%28IN%20FIELD%29')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_WORKSCOPE_LIST"},"ImWorkType":"","ImMainOrder":"","WorkType":"ENGINE REPAIR (IN FIELD)","WorkScope":"A0000031301","WorkScopeTxt":"GK Test 12345678912345678912345678912345"}]}};
		        var oData = {};
		        oData.results = obj.d.results;
		        
			    //Set data into work scope drop down.
		        oData.results.splice(0, 0,{"WorkScope" : "","WorkScopeTxt":"Select Workscope"});
			    var mModel = new sap.ui.model.json.JSONModel(oData); 
			    sap.ui.getCore().setModel(mModel,"ddWrkScopeData"); 
			    var oItemTemplate = new sap.ui.core.ListItem({key : "{WorkScope}",text:"{WorkScopeTxt}"});
			    var oSelectMenu = sap.ui.getCore().byId('wrkScopeSelectMenu');
			    oSelectMenu.setModel(mModel);
			    oSelectMenu.bindItems("/results", oItemTemplate);
			    oSelectMenu.setSelectedIndex(0)
			    
			    if(typeof mModel != "undefined" && typeof mModel.oData !="undefined" && mModel.oData.results != null && mModel.oData.results.length > 0)
			    {
			    	oSelectMenu.setVisible(true);
			    }	
			    else
			    {
			    	oSelectMenu.setVisible(false);
			    }
			    
//			}, function(oError) { //
//				console.log("error");
//			});
		},		
		
		_generateEngDtlsLocalJSON : function(){
			var oTTSN = sap.ui.getCore().getModel("ttsn");
			var addWSData =  sap.ui.getCore().getModel("addWSData");
			var addWSResponse =  sap.ui.getCore().getModel("addWSResponse");
			var engDtlsLocalJSON =  sap.ui.getCore().getModel("engDtlsLocalJSON");
			var z_ord_crtn = [];
			
			//loop ttsn list
			for(var i=0;i<oTTSN.oData.results.length;i++){
				var oTTSNObj = oTTSN.oData.results[i];
				//loop table of ADD WS popup
				for(var j=0;j<addWSData.oData.addWrkScpTbl.length;j++){
					var oTblWS = addWSData.oData.addWrkScpTbl[j];
					//check whether ttsn engine sl. no. is matched with table of ADD WS popup
					var indx = oTblWS.affEng.indexOf(oTTSNObj.EnSlNumber);
					//if matched, create a new workscope obj for post payload 
					if(indx > -1){
						var wrkScope = {};
						wrkScope.EngineSl = oTTSNObj.EnSlNumber;
						wrkScope.MainOrder = globalWANo;
						wrkScope.SubOrder = oTTSNObj.CsOrderSub;
						if(wrkScope.SubOrder.trim() == ""){
							wrkScope.Activity = "CW";							
						} else {
							wrkScope.Activity = "AW";
						}
						wrkScope.WorkScope = oTblWS.wrkscpkey;
						wrkScope.LongText = oTblWS.issueDesc;
						z_ord_crtn[z_ord_crtn.length] = wrkScope;
					}
				}
			}
			var postPayload ={};
			if(z_ord_crtn.length > 0){
				postPayload = {
				  "d": {
					    "EngineSl": z_ord_crtn[0].EngineSl,
					    "Z_HDR_ITMN": z_ord_crtn
					  }
				}
			}
			
			return postPayload;
		},


		/**
		 * Save workscope on confirmation of Add Workscope popup.
		 */
		_saveWorkScope : function (thisContext){
			var blankPayloadRow = {};
			sap.ui.core.BusyIndicator.show(0);
//			$.ajax({
////		    	url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet?$expand=Z_HDR_ITMN&$format=json",
//		    	url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet?$expand=Z_HDR_ITMN&$format=json",
//		    	type: "GET",
//		    	async: true,
//		    	contentType: "application/json",
////		    	username: "P926442",
////		    	password: "Saltlake@107",
//		    	headers:  {       
//			        	  	"Content-Type": "application/json", 
//			        	  	"DataServiceVersion": "2.0",          
//			        	  	"X-CSRF-Token":"Fetch"      
//						  },
//		    	success: function(oData, status, request){
		    		
		    		//call save work authorization to save any changed data
		    		pwc.app.js.SaveWAUtility._saveWorkAuthorization(thisContext,false,false,true,false,"");
		    		
		    	//	var xCSRFToken = request.getResponseHeader("x-csrf-token");
		    		oData={"d":{"results":[{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet('SL0001')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet('SL0001')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_UPDATE_HDR"},"EngineSl":"SL0001","Z_HDR_ITMN":{"results":[{"__metadata":{"id":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_ITMSet(EngineSl='SL0001',MainOrder='70009026')","uri":"http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_ITMSet(EngineSl='SL0001',MainOrder='70009026')","type":"Z_ESP_GW_SERVICE_SRV.ZZ_UPDATE_ITM"},"EngineSl":"SL0001","MainOrder":"70009026","SubOrder":"70009026","Activity":"CW","WorkScope":"A0000022201","Operation":"0010","OperationText":"","ResvNumber":"0000","Posnr":"","NewOperation":"","PartNumber":"","PartDesc":"","ServiceProv":"","EspQuantity":"","EspQtyUnit":"","EspPrice":"","EspPriceUnit":"","CommentText":"","Revision":"","TtsnActual":"","RefOrder":"","AogInd":"","CompantName":"","ContactName":"","ContactPhone":"","ContactEmail":"","ReasonCode":"","LongText":"","EventData":"","WorkType":""}]}}]}};
		    		blankPayloadRow = oData.d.results[0].Z_HDR_ITMN.results[0];
		    		delete blankPayloadRow["__metadata"];
		    		delete blankPayloadRow["__proto__"];
		    		console.log(blankPayloadRow);		    		
		    		oData.d = oData.d.results;
		    		var postPayload = pwc.app.js.WorkScopeUtility._generateEngDtlsLocalJSON();
		    		
		    		pwc.app.js.WorkScopeUtility._resetWSPopup();
		    		
					var jsonPayload = JSON.stringify(postPayload);
		    		
//		    		$.ajax({
////		    	    	url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet",
//		    	    	url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet",
//		    	    	type: "POST",
//		    	    	async: true,
//		    	    	contentType: "application/json",
//		    	    	data: jsonPayload,
////		    	    	username: "P926442",
////		    	    	password: "Saltlake@107",
//		    	    	headers:  {       
//					        	  	"Content-Type": "application/json", 
//					        	  	"X-CSRF-Token":xCSRFToken      
//								  },
//		    	    	success: function(oData, status, request) {
//		    	    		sap.ui.core.BusyIndicator.hide();
//		    	    		console.log("POST " + status);
		    	    		//redirect to master controller method to fetch WA Number.
                        	pwc.app.js.ViewWADetailsUtility.getWADetails(globalWANo,thisContext);
                        	pwc.app.js.CommonUtility.messageToast("Workscope added successfully");
//		    	    	error: function(oData, status, request) {
//		    	    		sap.ui.core.BusyIndicator.hide();
//		    	    		console.log("POST " + status);
//		    	    		console.log(oData);
//		    	    		pwc.app.js.CommonUtility.messageToast("Error occured while adding Workscope");
//		    	    	}
		    	
		    	
		},

		_confirmAddWS:function(thisContext){
			var addWSData =  sap.ui.getCore().getModel("addWSData");
			if(typeof addWSData != "undefined" && typeof addWSData.oData != "undefined"){
				if(addWSData.oData.addWrkScpTbl.length == 0){
					pwc.app.js.CommonUtility.validationMessage("No Workscope is added","Error Message",sap.m.MessageBox.Icon.ERROR);
					return false;
				}
			}			
			var oDataModel = sap.ui.getCore().getModel("waModel");

			var filterStr = "";
			for(var i=0;i<addWSData.oData.addWrkScpTbl.length;i++){
				var tObj = addWSData.oData.addWrkScpTbl[i];
				filterStr += "WorkScope eq '"+tObj.wrkscpkey+"' or ";
			}
			if(filterStr.length > 0){
				filterStr = "(" + filterStr;
				filterStr = filterStr.substring(0,filterStr.lastIndexOf("or")) + ")";
			}
				
			/* confirm message add workscope created by Mriganka --Start */
			
			var expand = "Z_WS_OPRN,Z_WS_COMP,Z_WORKSC_TEXTN";
//			oDataModel.read('ZZ_WORK_SCOPESet', null, {
//				"$format" : "json",
//				"$filter" : filterStr,
//				"$expand" : expand
//				}, false, function(oData, oResponse) {
			        var obj = {
			        		  "d": {
			        			    "results": [
			        			      {
			        			        "__metadata": {
			        			          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORK_SCOPESet('A0000029601')",
			        			          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORK_SCOPESet('A0000029601')",
			        			          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_WORK_SCOPE"
			        			        },
			        			        "WorkScope": "A0000029601",
			        			        "Z_WORKSC_TEXTN": {
			        			          "results": [
			        			            {
			        			              "__metadata": {
			        			                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORK_SCOPE_TEXTSet('')",
			        			                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORK_SCOPE_TEXTSet('')",
			        			                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_WORK_SCOPE_TEXT"
			        			              },
			        			              "WorkScope": "",
			        			              "WorkScopeText": ""
			        			            }
			        			          ]
			        			        },
			        			        "Z_WS_COMP": {
			        			          "results": [
			        			            {
			        			              "__metadata": {
			        			                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORK_SCOPE_COMPSet(WorkScope='A0000029601',OperationNo='0010',PartNo='AS3209-010')",
			        			                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORK_SCOPE_COMPSet(WorkScope='A0000029601',OperationNo='0010',PartNo='AS3209-010')",
			        			                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_WORK_SCOPE_COMP"
			        			              },
			        			              "WorkScope": "A0000029601",
			        			              "OperationNo": "0010",
			        			              "PartNo": "AS3209-010",
			        			              "PartDesc": "PACKING-PREFORMED, .239 X .070 test2",
			        			              "PartPrice": "         0.25",
			        			              "PartPriceUnit": "USD",
			        			              "PartQty": "1.000",
			        			              "PartUom": "EA"
			        			            }
			        			          ]
			        			        },
			        			        "Z_WS_OPRN": {
			        			          "results": [
			        			            {
			        			              "__metadata": {
			        			                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORK_SCOPE_OPERNSet(WorkScope='A0000029601',OperationNo='0010')",
			        			                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_WORK_SCOPE_OPERNSet(WorkScope='A0000029601',OperationNo='0010')",
			        			                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_WORK_SCOPE_OPERN"
			        			              },
			        			              "WorkScope": "A0000029601",
			        			              "OperationNo": "0010",
			        			              "OperationTxt": "Perform Overhaul",
			        			              "OperationQty": "0.000",
			        			              "OperationUom": "",
			        			              "WorkCenter": "SERVP-01",
			        			              "CustomerNo": "",
			        			              "ServicePrv1": ""
			        			            }
			        			          ]
			        			        }
			        			      }
			        			    ]
			        			  }
			        			};
			        var oData = {};
			        oData.results = obj.d.results;
			        
				    //Set data into work scope drop down.
				    var mModel = new sap.ui.model.json.JSONModel(oData); 
				    sap.ui.getCore().setModel(mModel,"addWSResponse"); 
				    
				    pwc.app.js.WorkScopeUtility._saveWorkScope(thisContext);
				
			return true;
			
			/* confirm message add workscope created by Mriganka --End */ 
		},
	
		_resetWSPopup : function(){
			//reset worktype dd
			var wt = sap.ui.getCore().byId('wrkTypeSelectMenu');
			wt.setSelectedKey("Select WorkType");
			
			//invisible workscope dd
			var oSelectMenu = sap.ui.getCore().byId('wrkScopeSelectMenu');
			oSelectMenu.setVisible(false);
			
			//reset workscope dd
			var ddModel = sap.ui.getCore().getModel("ddWrkScopeData");
			if(typeof ddModel!= "undefined" && typeof ddModel.oData != "undefined"){
				ddModel.oData.results = [];
			    sap.ui.getCore().setModel(ddModel,"ddWrkScopeData");	
			}
			
			
		    var oItemTemplate = new sap.ui.core.ListItem({key : "{ddWrkScopeData>WorkScope}",text:"{ddWrkScopeData>WorkScopeTxt}"});
		    var oSelectMenu = sap.ui.getCore().byId('wrkScopeSelectMenu');
		    oSelectMenu.setModel(ddModel);
		    oSelectMenu.bindAggregation("items", "ddWrkScopeData>/results", oItemTemplate);
		    
		    //reset issue descriptions
			sap.ui.getCore().byId('issueDesc').setValue("");
			
			//reset add workscope table
			var addWSData =  sap.ui.getCore().getModel("addWSData");
			if(typeof addWSData != "undefined" && typeof addWSData.oData != "undefined"){
				addWSData.oData.addWrkScpTbl = [];
				var oTable = sap.ui.getCore().byId('idWSTable');
				oTable.setModel(addWSData,"addWSData");
				oTable.bindRows("addWSData>/addWrkScpTbl");		
			}
			
		},
		
		_handleDeleteWorkScope: function(oEvent)
        {
               var delIndex = oEvent.getSource().getParent().getIndex();
               var oTable = sap.ui.getCore().byId('idWSTable');
               var addWSData =  oTable.getModel("addWSData");
               //var addWSData =  sap.ui.getCore().getModel("addWSData");
               addWSData.oData.addWrkScpTbl.splice(delIndex,1);
               addWSData.refresh();
        },


		/**
		 * This method called from ADD WS Fragment
		 */
		_handleAddWrkScope : function(){
			//
			var oSelectMenu = sap.ui.getCore().byId('wrkScopeSelectMenu');
			if(oSelectMenu.getSelectedItem() == null || typeof oSelectMenu.getSelectedItem() == "undefined"){
				pwc.app.js.CommonUtility.validationMessage("Please select Workscope","Error Message",sap.m.MessageBox.Icon.ERROR);
				return;
			}
			var wrkscp = oSelectMenu.getSelectedItem().mProperties.text;
			if(wrkscp == "Select Workscope"){
				pwc.app.js.CommonUtility.validationMessage("Please select Workscope","Error Message",sap.m.MessageBox.Icon.ERROR);
				return;
			}
			var wrkscpkey = oSelectMenu.getSelectedItem().mProperties.key;
			var oTTSN = sap.ui.getCore().getModel("ttsn");
			var eng = "";
			var flag = true;
			for(var i=0;i<oTTSN.oData.results.length;i++){
				var ttsn = oTTSN.oData.results[i];
				var chkBox = sap.ui.getCore().byId("W"+ttsn.EnSlNumber);
				if(chkBox.getSelected()){
					flag = false;
					eng = eng + (chkBox.sId).substring(1) + ",";
				}
			}
			if(flag){
				pwc.app.js.CommonUtility.validationMessage("Please select Engine(s)","Error Message",sap.m.MessageBox.Icon.ERROR);
				return;
			}
			
			eng = eng.substring(0,eng.lastIndexOf(','));
			var isDes= sap.ui.getCore().byId('issueDesc').getValue();
			
			var obj = {
					"wrkDesc" : wrkscp,
					"affEng" : eng,
					"issueDesc" : isDes,
					"wrkscpkey" : wrkscpkey
			};
			
			var addWSData =  sap.ui.getCore().getModel("addWSData");
			
			
          /*  for(var i = 0 ; i < addWSData.oData.addWrkScpTbl.length; i++)
            {
                  addWSData.oData.addWrkScpTbl[i].index = i;
            }
            
            obj.index = addWSData.oData.addWrkScpTbl.length;*/
            

			
			addWSData.oData.addWrkScpTbl.push(obj);
	
			//add workscope table
			var oTable = sap.ui.getCore().byId('idWSTable');
			oTable.setVisibleRowCount(addWSData.oData.addWrkScpTbl.length);
			oTable.setSelectionMode(sap.ui.table.SelectionMode.None);
			oTable.setModel(addWSData,"addWSData");
			oTable.bindRows("addWSData>/addWrkScpTbl");
		},
		
		/**
		 * This method is alternative of removeWS (this and thisContext is replaced by that)
		 */
		removeWorkScope : function(that) {
		    if (!that._removeWSDialog) {
		        that._removeWSDialog = sap.ui.xmlfragment("pwc.app.fragment.removeWSDialog", that.getView().getController());
		        that._removeWSDialog.setEndButton(
		            new sap.m.Button({
		                text:'Cancel',
		                press: function ()  {
		                    that._removeWSDialog.close();
		                    that._removeWSDialog.destroy();
		                    that._removeWSDialog=false;
		                }
		            })
		        );
		                    
		        that._removeWSDialog.setBeginButton(
		            new sap.m.Button({
		                text : 'Confirm', // string
		                press : [ function(oEvent) {
		                                var control = oEvent.getSource();
		                                pwc.app.js.WorkScopeUtility.confirmRemoveWS(that,false,[]);
		                                that._removeWSDialog.close();
		                                that._removeWSDialog.destroy();
		                                that._removeWSDialog=false;
		                }, that ]
		             })
		        );
		                    
		        that.getView().addDependent(that._removeWSDialog);
		        jQuery.sap.syncStyleClass("sapUiSizeCompact", that.getView(), that._removeWSDialog);
		        that._removeWSDialog.open();
		    }
		    
		    var workscopeCollection = []; 
		    //var newOperationObj = new Object();
		    var jsonWorkScopeObj = new Object();
		    var tblRemoveWorkscope = sap.ui.getCore().byId('tblRemoveWorkscope');
		                    
		    var engineCount = sap.ui.getCore().getModel("engDtlsLocalJSON").getData().engDtls.length;
		    for(var k=0;k<engineCount;k++){
		        var engineDetail=sap.ui.getCore().getModel("engDtlsLocalJSON").getData().engDtls[k];
		        var engSlNo=engineDetail.engSlNo;
		        var WorkscopeLength= 0;
		        if(typeof engineDetail.wrkScpDtls != "undefined"){
		               WorkscopeLength=engineDetail.wrkScpDtls.length;
		        }
//			    if(WorkscopeLength > 1){
			        for(var j=0;j<WorkscopeLength;j++){
			            var workscopeDetails=engineDetail.wrkScpDtls[j];
			            
			            var workScopeObj = new Object();
			            workScopeObj["engSlNo"] = engSlNo;
			            workScopeObj["wrkscpname"] = workscopeDetails.wrkscpname;
			            workScopeObj["workscopekey"] = workscopeDetails.workscopekey;
			            workscopeCollection.push(workScopeObj);
			        }
//			    }    
		    }
		    jsonWorkScopeObj["engineToWorkscope"]=workscopeCollection;
		    tblRemoveWorkscope.attachColumnSelect(function(event){
		    	console.log("event.... " +event);
		    });
		    tblRemoveWorkscope.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({
					text: "Engine" // Creates an Header with value defined for the text attribute
				}),
				template: new sap.ui.commons.TextField({
					value: '{engSlNo}', // binds the value into the text field defined using JSON
					editable: false  // Non editable
				}),// width of the column

		    }));
		    tblRemoveWorkscope.addColumn(new sap.ui.table.Column({
		    	label: new sap.ui.commons.Label({
		    		text: "Workscope" // Creates an Header with value defined for the text attribute
		    	}),
		    	template: new sap.ui.commons.TextField({
		    		value: '{wrkscpname}', // binds the value into the text field defined using JSON
		    		editable: false  // Non editable
		    	}) 

		    }));
		    var workscopeModel = new sap.ui.model.json.JSONModel(jsonWorkScopeObj);
		    tblRemoveWorkscope.setModel(workscopeModel);
		    tblRemoveWorkscope.bindRows("/engineToWorkscope");
		},
		
		/**
		 * This method will generate remove workscope post payload
		 * 
		 */
		generateRmovePostPayload : function(deletedEngArr){
			 var tblRemoveWorkscope = sap.ui.getCore().byId('tblRemoveWorkscope');
			 var modelarr = tblRemoveWorkscope.getModel().getData().engineToWorkscope;
			 var selList = tblRemoveWorkscope.getSelectedIndices();
			 var engslno = modelarr[0].engSlNo;
			 var cnt = 1;
			 var selcnt = selList.indexOf(0) == -1? 0 : 1; //if first row selected then selected count 1
			 for(var i=1;i<modelarr.length;i++){
				 var obj = modelarr[i];
				 if(engslno == obj.engSlNo){
					 cnt  = parseInt(cnt) + 1;
					 selcnt = parseInt(selcnt) + (selList.indexOf(i) == -1? 0 : 1);
				 }
				 else{
					 if(cnt == selcnt){//if number of workscope count and selected count are same
						 deletedEngArr[deletedEngArr.length] = engslno;
					 }
					 engslno = modelarr[i].engSlNo;
					 cnt = 1;
					 selcnt = selList.indexOf(i) == -1? 0 : 1; 
				 }
			 }
			 
			 if(cnt == selcnt){
				 deletedEngArr[deletedEngArr.length] = engslno;
			 }

			 var z_ord_crtn = [];
		     for(var m=0;m<selList.length;m++){
			     var selectedContextObj=tblRemoveWorkscope.getContextByIndex(selList[m]).getObject();
			     if(deletedEngArr.indexOf(selectedContextObj.engSlNo) > -1){
			    	 continue;
			     }
			     var oWrkScp = {};
			     oWrkScp.EngineSl = selectedContextObj.engSlNo;
			     oWrkScp.MainOrder = globalWANo;
			     oWrkScp.Activity = "RW";
			     oWrkScp.WorkScope = selectedContextObj.workscopekey;
			     z_ord_crtn[z_ord_crtn.length] = oWrkScp;
		     }
		     return z_ord_crtn;
		},
		
		
		/**
		 * This method remove workscope
		 */
		 confirmRemoveWS : function(thisContext,isCallFromOperationDeleteFun,z_ord_crtn_FromDeleteFun){
		     var z_ord_crtn = [];
		     var deletedEngArr = [];
		     if(isCallFromOperationDeleteFun){//call comes from 'handleOperationComponentDelete' method
		    	 z_ord_crtn = z_ord_crtn_FromDeleteFun;
		     }
		     else{//call comes from Remove Workscope popup
		    	 z_ord_crtn =  pwc.app.js.WorkScopeUtility.generateRmovePostPayload(deletedEngArr);
		     }
		     
		     if(z_ord_crtn.length > 0){
		    	//call save work authorization to save any changed data
					pwc.app.js.SaveWAUtility._saveWorkAuthorization(thisContext,false,false,true,false,"");
					
					console.log("pressed ok in warning popup");
					var postPayload ={};
				     if(z_ord_crtn.length > 0){
				         postPayload = {
			                       "d": {
			                             "EngineSl": z_ord_crtn[0].EngineSl,
			                             "Z_HDR_ITMN": z_ord_crtn
				                    	}
				                   }
			     }
//			 sap.ui.core.BusyIndicator.show(0);
				 
//				 $.ajax({
////					 url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet?$expand=Z_HDR_ITMN&$format=json",
//					 url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet?$expand=Z_HDR_ITMN&$format=json",
//					 type: "GET",
//					 async: true,
//					 contentType: "application/json",
////					 username: "P926442",
////					 password: "Saltlake@107",
//			         headers:  {       
//			                    "Content-Type": "application/json", 
//			                    "DataServiceVersion": "2.0",          
//			                    "X-CSRF-Token":"Fetch"      
//			         			},
//			         success: function(oData, status, request){
//		                 console.log("GET " + status);
//		                 console.log(oData);
//		                 var xCSRFToken = request.getResponseHeader("x-csrf-token");
//		                 console.log(xCSRFToken);
//		                 var jsonPayload = JSON.stringify(postPayload);
//	                                 
//	                     $.ajax({
////		                     url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet",
//	                       url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet",
//		                     type: "POST",
//		                     async: true,
//		                     contentType: "application/json",
//		                     data: jsonPayload,
////		                     username: "P926442",
////		                     password: "Saltlake@107",
//		                     headers:  {       
//		                                "Content-Type": "application/json", 
//		                                "X-CSRF-Token":xCSRFToken      
//		                               },
//		                     success: function(oData, status, request) {
//			                             thisContext.getView().setBusy(false);
//			                             console.log("POST " + status);
//			                             
//			                             if(deletedEngArr.length > 0){
//			            		    		 pwc.app.js.DeleteEngineUtility.deleteEngine(thisContext,deletedEngArr);
//			            		    	 }
//			                             else{
//				                             //redirect to master controller method to fetch WA Number.
//				                             pwc.app.js.ViewWADetailsUtility.getWADetails(globalWANo,thisContext);
				                             pwc.app.js.CommonUtility.messageToast("Workscope removed successfully");
		                             
//			                             
//		                                     
//		                     },
//		                     error: function(oData, status, request) {
//		                    	 		sap.ui.core.BusyIndicator.hide();
//	                                    console.log("POST " + status);
//	                                    console.log(oData);
//	                                    pwc.app.js.CommonUtility.messageToast("Error occured while removing Workscope");
//		                     		}
//	                     });
//	                 	},
//		         	error: function(oData, status, request) {
//		         				sap.ui.core.BusyIndicator.hide();
//						        console.log("GET" + status);
//						        console.log(oData);
//						        pwc.app.js.CommonUtility.messageToast("Error occured while removing Workscope");
//		         			}
//					 });  
	    	 }
		     else{
		    	 if(deletedEngArr.length > 0){
		    		 pwc.app.js.DeleteEngineUtility.deleteEngine(thisContext,deletedEngArr);
		    	 }
		     }
		     
				
				
		 },
			/* confirm message remove workscope created by Mriganka --End */
		
		
		/**
		 * This method is called when Copy Work Scope icon is clicked
		 */
		copyWS: function(oEvent,that) {
			var oTTSN = sap.ui.getCore().getModel("ttsn");
			var z_ord_crtn = [];
			var x=oEvent.getSource().getParent();
			var z=x.getContent()[4].sId;
			var issuedesc = sap.ui.getCore().byId(z).getValue();
			var wrskey = z.substring(z.length-11);
			var currEng=oEvent.getSource().getParent().getParent().getParent().getText();
			var wrkscpPanel = oEvent.getSource().getParent().getParent();
			var workScpLT = oEvent.getSource().getParent().getParent().getContent()[0].getContent()[0].mProperties.value;
			var oper = wrkscpPanel.getContent()[1].getModel().getData().oper;
			var workScpName = oEvent.getSource().getParent().getContent()[0].mProperties.text;
			//validation for operation table save before copy
			for(var op=0;op<oper.length;op++){
				var opObj = oper[op];
				if(opObj.flag == "D" || opObj.flag == "A"  || opObj.flag == "E"){
					pwc.app.js.CommonUtility.validationMessage("Please save Task Table before copy","Error Message",sap.m.MessageBox.Icon.ERROR);
					return;
				}
			}
			//validation for component table save before copy
			var comp = wrkscpPanel.getContent()[2].getModel().getData().comp;
			for(var c=0;c<comp.length;c++){
				var compObj = comp[c];
				if(compObj.flag == "D" || compObj.flag == "A" || compObj.flag == "E"){
					pwc.app.js.CommonUtility.validationMessage("Please save Parts Table before copy","Error Message",sap.m.MessageBox.Icon.ERROR);
					return;
				}
			}
			//validation for workscope text and reason for work text save before copy
			var engLocalJson = (sap.ui.getCore().getModel("engDtlsLocalJSON"));
			if(typeof engLocalJson != "undefined"){
				for(var t=0;t<engLocalJson.oData.engDtls.length;t++){
					var eng = engLocalJson.oData.engDtls[t];
					/***Loop for Workscope ***/
					if(typeof eng.wrkScpDtls != "undefined"){//if target engine matched in model then get the wrkscp text and concat
						for(var k=0;k<eng.wrkScpDtls.length;k++){
							var wrkscp =eng.wrkScpDtls[k];
							if(currEng == eng.engSlNo && wrskey == wrkscp.workscopekey && wrkscp.freetext != wrkscp.freetextActual){
								pwc.app.js.CommonUtility.validationMessage("Please save WorkScope Text before copy","Error Message",sap.m.MessageBox.Icon.ERROR);
								return;
							}
							if(currEng == eng.engSlNo && wrskey == wrkscp.workscopekey && wrkscp.reason != wrkscp.reasonActual){
								pwc.app.js.CommonUtility.validationMessage("Please save Reason for Work before copy","Error Message",sap.m.MessageBox.Icon.ERROR);
								return;
							}
						}
					}
				}
			}
			var refOrder = "";
			for(var i=0;i<oTTSN.oData.results.length;i++){
				var oTTSNObj = oTTSN.oData.results[i];
				var wrkScope = {};
				wrkScope.EngineSl = oTTSNObj.EnSlNumber;
				wrkScope.MainOrder = globalWANo;
				wrkScope.SubOrder = oTTSNObj.CsOrderSub;
				wrkScope.RefOrder = "";
				if(currEng == oTTSNObj.EnSlNumber){
					refOrder = oTTSNObj.CsOrderSub;	
				}
				wrkScope.Activity = "CP";
				wrkScope.WorkScope = wrskey;
				wrkScope.LongText = wrskey+workScpLT+"#@!END!@#";
				z_ord_crtn[z_ord_crtn.length] = wrkScope;
			}
			for(var i=0;i<z_ord_crtn.length;i++){
				var obj = z_ord_crtn[i];
				obj.RefOrder = refOrder;
				obj.oper = oper;
				obj.comp = comp;
			}
			
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(workScpLT);
			sap.ui.getCore().setModel(oModel,"workScpLT");
			var dialog = new sap.m.Dialog({
				title: workScpName,
				content: 
					new sap.m.List({
					id: "wsCopyToList",
					mode: "SingleSelect",
				}),
				beginButton: new sap.m.Button({
					text: 'Copy',
					press: function () {
						pwc.app.js.WorkScopeUtility.selectedCopyWS(oEvent,that,z_ord_crtn);
						dialog.close();
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
			
			var x=oEvent.getSource().getParent().getParent().getParent();
			var currEng = x.mProperties.text;
			
			x=oEvent.getSource().getParent().getParent().getParent().getParent();
			var y=x.getItems();
			var oList = sap.ui.getCore().byId("wsCopyToList");
			for(var i=0;i<oTTSN.oData.results.length;i++){
				var oTTSNObj = oTTSN.oData.results[i];
				if(oTTSNObj.EnSlNumber == currEng){
					continue;
				}
				oList.addItem(new sap.m.StandardListItem({title: oTTSNObj.EnSlNumber}));
			}
			
			that.getView().addDependent(dialog);
			dialog.open();
		},
		
		selectedCopyWS : function(oEvent,that,z_ord_crtn){
			var z_payload = [];
			var x=oEvent.getSource().getParent().getContent();
			var y=x[0].getSelectedItems();
			var engLocalJson = (sap.ui.getCore().getModel("engDtlsLocalJSON"));
			console.log(engLocalJson);
			var z_payload_cp = [];
			for(var i=0;i<y.length;i++){//iterate loop over selected engine where workscope will be copied
				console.log(y[i].mProperties.title);
				for(var j=0;j<z_ord_crtn.length;j++){//iterate loop over all engines for which payload already created
					var obj = z_ord_crtn[j];
					if(obj.EngineSl == y[i].mProperties.title){//if selected target engine is matched with payload
						//for workscope long text --
						
						/***Loop for Engine ***/
						if(typeof engLocalJson != "undefined"){
							var longText = "";
							for(var t=0;t<engLocalJson.oData.engDtls.length;t++){
								var eng = engLocalJson.oData.engDtls[t];
								if(eng.engSlNo != y[i].mProperties.title){//if target engine not matched then continue
									continue;
								}
								/***Loop for Workscope ***/
								if(typeof eng.wrkScpDtls != "undefined"){//if target engine matched in model then get the wrkscp text and concat
									for(var k=0;k<eng.wrkScpDtls.length;k++){
										var wrkscp =eng.wrkScpDtls[k];
										longText = longText + wrkscp.workscopekey+wrkscp.freetext + "#@!END!@#";
									}
								}
								break;
							}
							if(obj.LongText != ""){
								longText = longText + obj.LongText;
								var Z_HDR_ITMN = [];
								var newWrkScp = {"SubOrder":eng.SubOrder,"Activity":"CT","LongText":""};
								pwc.app.js.SaveWAUtility.breakLongText(Z_HDR_ITMN,longText,newWrkScp); //create wrkscp text payload of 131 character
								obj.LongText = "";
								for(var n=0;n<Z_HDR_ITMN.length;n++){//add all wrkscp text payload in actual payload
									z_payload[z_payload.length] = Z_HDR_ITMN[n];
								}
							}
						}
						
						for(var op=0;op<obj.oper.length;op++){
							var opObj = obj.oper[op];
							var newOper = {"RefOrder":obj.RefOrder,"SubOrder":obj.SubOrder,"Activity":"TC","LongText":opObj.LongText,"Operation":opObj.Operation};
							z_payload[z_payload.length] = newOper; 
						}
						for(var c=0;c<obj.comp.length;c++){
							var compObj = obj.comp[c];
							var newComp = {"RefOrder":obj.RefOrder,"SubOrder":obj.SubOrder,"Activity":"CC","LongText":compObj.LongText,"Operation":compObj.Operation,"Posnr":compObj.Posnr};
							z_payload[z_payload.length] = newComp; 
						}
						delete obj["comp"];
						delete obj["oper"];
						z_payload_cp[z_payload_cp.length] = obj; //add source wrkscp payload details in actual payload
						break;
					}
				}
			}
			if(z_payload_cp.length > 0){
				for(var i=0;i<z_payload_cp.length;i++){
					z_payload.unshift(z_payload_cp[i]);
				}
			}
//			if(true)return;
			var postPayload ={};
			if(z_payload.length > 0){
				postPayload = {
				  "d": {
					    "EngineSl": z_payload[0].EngineSl,
					    "Z_HDR_ITMN": z_payload
					  }
				}
			}
			pwc.app.js.WorkScopeUtility._saveWorkScopeOfCopyWS(that,postPayload,z_payload);
		},
		
		_saveWorkScopeOfCopyWS : function (thisContext,postPayload,z_payload){
			var blankPayloadRow = {};
			sap.ui.core.BusyIndicator.show(0);
			$.ajax({
//		    	url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet?$expand=Z_HDR_ITMN&$format=json",
		    	url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet?$expand=Z_HDR_ITMN&$format=json",
		    	type: "GET",
		    	async: true,
		    	contentType: "application/json",
//		    	username: "P926442",
//		    	password: "Saltlake@107",
		    	headers:  {       
			        	  	"Content-Type": "application/json", 
			        	  	"DataServiceVersion": "2.0",          
			        	  	"X-CSRF-Token":"Fetch"      
						  },
		    	success: function(oData, status, request){
		    		
		    		//call save work authorization to save any changed data
		    		pwc.app.js.SaveWAUtility._saveWorkAuthorization(thisContext,false,false,true,false,"");
		    		
		    		console.log("GET " + status);
		    		console.log(oData);
		    		var xCSRFToken = request.getResponseHeader("x-csrf-token");
		    		console.log(xCSRFToken);
					var jsonPayload = JSON.stringify(postPayload);
		    		$.ajax({
//		    	    	url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet",
		    	    	url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_UPDATE_HDRSet",
		    	    	type: "POST",
		    	    	async: true,
		    	    	contentType: "application/json",
		    	    	data: jsonPayload,
//		    	    	username: "P926442",
//		    	    	password: "Saltlake@107",
		    	    	headers:  {       
					        	  	"Content-Type": "application/json", 
					        	  	"X-CSRF-Token":xCSRFToken      
								  },
		    	    	success: function(oData, status, request) {
		    	    		sap.ui.core.BusyIndicator.hide();
		    	    		console.log("POST " + status);
		    	    		//redirect to master controller method to fetch WA Number.
                        	pwc.app.js.ViewWADetailsUtility.getWADetails(globalWANo,thisContext);
                        	pwc.app.js.CommonUtility.messageToast("Workscope copied successfully");
		    	    	},
		    	    	error: function(oData, status, request) {
		    	    		sap.ui.core.BusyIndicator.hide();
		    	    		console.log("POST " + status);
		    	    		console.log(oData);
		    	    		pwc.app.js.CommonUtility.messageToast("Error occured while copying Workscope");
		    	    	}
		    	    });
		    	},
		    	error: function(oData, status, request) {
		    		sap.ui.core.BusyIndicator.hide();
    	    		console.log("GET" + status);
    	    		console.log(oData);
    	    		pwc.app.js.CommonUtility.messageToast("Error occured while copying Workscope");
    	    	}
		    });
		},
		
		
		
		
}
var deletedEngSlNo = "";