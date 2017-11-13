jQuery.sap.declare("pwc.app.js.SearchWAUtility");
jQuery.sap.require("pwc.app.js.CommonUtility");

pwc.app.js.SearchWAUtility = {
	/**
	 * Created By Subhayu De Sarkar
	 * This method converts the search result JSON to formatted one
	 */
	populateSearchResult: function(callingControl,oData) {
		
		var searchJsonData = oData.results;
		//todo
		var customJSON = {results : []};
		if(searchJsonData.length > 0){
			var waNumber = "";
			var jsonIndex = -1;
			for(var count=0;count<searchJsonData.length;count++){
				if(waNumber != searchJsonData[count].WaNumber) {
					waNumber = searchJsonData[count].WaNumber;
					jsonIndex++;
					var tempJSON = {};
					tempJSON["Aufnr"] = searchJsonData[count].WaNumber;
					tempJSON["Erdat"] = pwc.app.js.CommonUtility.dateFormat(searchJsonData[count].Erdat);
					tempJSON["Kdauf"] = searchJsonData[count].ZespContr;
					tempJSON["Name1"] = searchJsonData[count].Customer;
				//    tempJSON["Serialnr"] = searchJsonData[count].Serialnr;
					tempJSON["CustomerPo"] = searchJsonData[count].ZespContr;
					tempJSON["Status"] = searchJsonData[count].Status;
					tempJSON["Created By"] = searchJsonData[count].Ernam;
					tempJSON["ZespOpid"] = searchJsonData[count].ZespOpid;
					tempJSON["ZespTailn"] = searchJsonData[count].ZespTailn;
					tempJSON["ZESP_SERNO"] = searchJsonData[count].ZespSerno;
					tempJSON["ZESP_REVSN"] = searchJsonData[count].ZespRevsn;
					if(searchJsonData[count].Serialnr.trim()!="" && searchJsonData[count].Zesplastre.trim()!=""){
					Readg=searchJsonData[count].Serialnr.trim()+" ("+searchJsonData[count].Zesplastre.trim()+")";
					}
					else if (searchJsonData[count].Serialnr.trim()=="" && searchJsonData[count].Zesplastre.trim()!=""){
						Readg=searchJsonData[count].Zesplastre.trim();
					}
					else if(searchJsonData[count].Serialnr.trim()!="" && searchJsonData[count].Zesplastre.trim()==""){
						Readg=searchJsonData[count].Serialnr.trim();
					}
					else 
						Readg="";
					tempJSON["Readg"] =Readg;
					tempJSON["WorkType"] = searchJsonData[count].WaType.trim();
					
					customJSON.results[jsonIndex] = tempJSON;
				} 
				
				else 
				
				{
					if(searchJsonData[count].Serialnr.trim() != ""||searchJsonData[count].Zesplastre.trim()!="") {
						var t1 = customJSON.results[jsonIndex];
						if(t1["Erdat"] == ""){
							t1["Erdat"] = pwc.app.js.CommonUtility.dateFormat(searchJsonData[count].Erdat);
						}
						if(t1["Kdauf"] == ""){
							t1["Kdauf"] = searchJsonData[count].ZespContr;
						}
						if(t1["Name1"] == ""){
							t1["Name1"] = searchJsonData[count].Customer;
						}
//						if(t1["Serialnr"] == ""){
//							t1["Serialnr"] = searchJsonData[count].Serialnr;
//						}
						if(t1["CustomerPo"] == ""){
							t1["CustomerPo"] = searchJsonData[count].ZespContr;
						}
						if(t1["Status"] == ""){
							t1["Status"] = searchJsonData[count].Status;
						}
						if(t1["Created By"] == ""){
							t1["Created By"] = searchJsonData[count].Ernam;
						}
						if(t1["ZespOpid"] == ""){
							t1["ZespOpid"] = searchJsonData[count].ZespOpid;
						}
						if(t1["ZespTailn"] == ""){
							t1["ZespTailn"] = searchJsonData[count].ZespTailn;
						}
						if(t1["ZESP_SERNO"] == ""){
							t1["ZESP_SERNO"] = searchJsonData[count].ZespSerno;
						}
						if(t1["ZESP_REVSN"] == ""){
							t1["ZESP_REVSN"] = searchJsonData[count].ZespRevsn;
						}
						if(searchJsonData[count].Serialnr.trim()!="" && searchJsonData[count].Zesplastre.trim()!=""){
							Readg=searchJsonData[count].Serialnr.trim()+" ("+searchJsonData[count].Zesplastre.trim()+")";
							}
							else if (searchJsonData[count].Serialnr.trim()=="" && searchJsonData[count].Zesplastre.trim()!=""){
								Readg=searchJsonData[count].Zesplastre.trim();
							}
							else if(searchJsonData[count].Serialnr.trim()!="" && searchJsonData[count].Zesplastre.trim()==""){
								Readg=searchJsonData[count].Serialnr.trim();
							}
						
						var tempReadg = {};
						tempReadg["Ttsn"] = Readg;
						if(customJSON.results[jsonIndex].Readg.trim()!="")
							customJSON.results[jsonIndex].Readg=customJSON.results[jsonIndex].Readg.trim()+" , "+tempReadg["Ttsn"];
						else
							customJSON.results[jsonIndex].Readg=tempReadg["Ttsn"];
						
					} 
					if(searchJsonData[count].WaType.trim() != "") {
						var t1 = customJSON.results[jsonIndex];
						if(t1["Erdat"] == ""){
							t1["Erdat"] = pwc.app.js.CommonUtility.dateFormat(searchJsonData[count].Erdat);
						}
						if(t1["Kdauf"] == ""){
							t1["Kdauf"] = searchJsonData[count].ZespContr;
						}
						if(t1["Name1"] == ""){
							t1["Name1"] = searchJsonData[count].Customer;
						}
//						if(t1["Serialnr"] == ""){
//							t1["Serialnr"] = searchJsonData[count].Serialnr;
//						}
						if(t1["CustomerPo"] == ""){
							t1["CustomerPo"] = searchJsonData[count].ZespContr;
						}
						if(t1["Status"] == ""){
							t1["Status"] = searchJsonData[count].Status;
						}
						if(t1["Created By"] == ""){
							t1["Created By"] = searchJsonData[count].Ernam;
						}
						if(t1["ZespOpid"] == ""){
							t1["ZespOpid"] = searchJsonData[count].ZespOpid;
						}
						if(t1["ZespTailn"] == ""){
							t1["ZespTailn"] = searchJsonData[count].ZespTailn;
						}
						if(t1["ZESP_SERNO"] == ""){
							t1["ZESP_SERNO"] = searchJsonData[count].ZespSerno;
						}
						if(t1["ZESP_REVSN"] == ""){
							t1["ZESP_REVSN"] = searchJsonData[count].ZespRevsn;
						}
						var tempWorkType = {};
						tempWorkType["WorkType"] = searchJsonData[count].WaType.trim();
						if(customJSON.results[jsonIndex].WorkType.trim()!="")
							customJSON.results[jsonIndex].WorkType=customJSON.results[jsonIndex].WorkType.trim()+" , "+tempWorkType["WorkType"];
						else
							customJSON.results[jsonIndex].WorkType=tempWorkType["WorkType"];
						
					}
					else{
						var t1 = customJSON.results[jsonIndex];
						if(t1["Erdat"] == ""){
							t1["Erdat"] = pwc.app.js.CommonUtility.dateFormat(searchJsonData[count].Erdat);
						}
						if(t1["Kdauf"] == ""){
							t1["Kdauf"] = searchJsonData[count].ZespContr;
						}
						if(t1["Name1"] == ""){
							t1["Name1"] = searchJsonData[count].Customer;
						}
//						if(t1["Serialnr"] == ""){
//							t1["Serialnr"] = searchJsonData[count].Serialnr;
//						}
						if(t1["CustomerPo"] == ""){
							t1["CustomerPo"] = searchJsonData[count].ZespContr;
						}
						if(t1["Status"] == ""){
							t1["Status"] = searchJsonData[count].Status;
						}
						if(t1["Created By"] == ""){
							t1["Created By"] = searchJsonData[count].Ernam;
						}
						if(t1["ZespOpid"] == ""){
							t1["ZespOpid"] = searchJsonData[count].ZespOpid;
						}
						if(t1["ZespTailn"] == ""){
							t1["ZespTailn"] = searchJsonData[count].ZespTailn;
						}
						if(t1["ZESP_SERNO"] == ""){
							t1["ZESP_SERNO"] = searchJsonData[count].ZespSerno;
						}
						if(t1["ZESP_REVSN"] == ""){
							t1["ZESP_REVSN"] = searchJsonData[count].ZespRevsn;
						}
					}
				}
			}
		}

		var searchResultJSONModel = new sap.ui.model.json.JSONModel(customJSON);
		var searchResultCustomTable = callingControl.getView().byId("idSearchResultTable");
		searchResultCustomTable.setModel(searchResultJSONModel);
		var v=(customJSON.results.length!=0)?5:customJSON.results.length;
		searchResultCustomTable.setVisibleRowCount(v);
		sap.ui.core.BusyIndicator.hide();
		
		/**
		 *To check whether 'attachUPdateFinished' method call two times or not.
		 *Scenario: search with WANO: 70009773 AND A/C S/N- 4083, click the same for 2nd time
		 * 
		 */
//		chkAttachUpdateFinishedMethodCall = true;  
//		searchResultCustomTable.attachUpdateFinished(function() {
//			if(!chkAttachUpdateFinishedMethodCall)return;//if this method called 2nd time then return without further processing
//			
//			if(searchResultCustomList.getItems().length == 1) {
//				searchResultCustomList.setSelectedItem(searchResultCustomList.getItems()[0]);
//				searchResultCustomList.fireSelectionChange();
//			}
//			else{
//				  sap.ui.core.BusyIndicator.hide();
//			}
//			chkAttachUpdateFinishedMethodCall = false;
//		});
	},
}