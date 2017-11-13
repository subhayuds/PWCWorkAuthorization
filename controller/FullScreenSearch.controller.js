sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/m/MessageBox',
		'sap/ui/model/json/JSONModel',
		'pwc/app/util/Formatter',
		'pwc/app/js/SearchWAUtility',
		'sap/ui/core/util/Export',
		'sap/ui/core/util/ExportTypeCSV'
	], function(jQuery, Controller, JSONModel) {
	
	"use strict";
	
	var oController = Controller.extend("pwc.app.controller.FullScreenSearch", {
		/**
		* Called when a controller is instantiated and its View controls (if available) are already created.
		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		* @memberOf view.MasterSearch
		*/
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if(!this._oRouter) this._oRouter = oRouter;
			var reportCounts={
					"count1":"0",
					"count2":"0",
					"count3":"0",
					"count4":"0"			
			};
			
			var oModelReportCounts= new sap.ui.model.json.JSONModel();
			oModelReportCounts.setData(reportCounts);
			sap.ui.getCore().setModel(oModelReportCounts,"oModelReportCounts");
			this.getView().byId("idApproved").setTitle(oModelReportCounts.oData.count1);
			this.getView().byId("idDraft").setTitle(oModelReportCounts.oData.count2);
			this.getView().byId("idDeclined").setTitle(oModelReportCounts.oData.count3);
			this.getView().byId("idRev").setTitle(oModelReportCounts.oData.count4);
			
			//alert(this.getView().byId("id1").getText());
		},
		
//		onAfterRendering : function(){
//			
//			
//		}
//		,
		
       
		handleReset : function(oEvent)
{
		for (var i=1;i<=3;i++){
			this.getView().byId("idCriteria"+i).setSelectedKey("none");
//			if(this.getView().byId("filter"+i).getVisible()){
				this.getView().byId("filter"+i).setValue("");
		//	}
//			else if (this.getView().byId("date"+i).getVisible()){
//				
//				this.getView().byId("date"+i).setVisible(false);
//				this.getView().byId("filter"+i).setVisible(true);
//				
//			}
		
			}
		this.getView().byId("fromDateSearch").setValue("");
		this.getView().byId("toDateSearch").setValue("");
		this.getView().byId("fromDateSearch").setDisplayFormat("dd-MM-yyyy");
		this.getView().byId("toDateSearch").setDisplayFormat("dd-MM-yyyy");
	//    this.getView().byId("idSearchResultTable").unbindRows();

		var searchResultJSONModel = new sap.ui.model.json.JSONModel();
		var searchResultCustomTable = this.getView().byId("idSearchResultTable");
		searchResultCustomTable.setModel(searchResultJSONModel);
		searchResultCustomTable.setVisibleRowCount(0);
		
		
		}
,
		onReportResult:function(oEvent){
			
			
			var fromDate=this.getView().byId("fromDate").getValue();
			var toDate=this.getView().byId("toDate").getValue();

			
			if(fromDate==''||toDate==''){
				sap.m.MessageBox.alert("Both From Date and To Date are mandatory", {
					title: "Error Message",
					icon: sap.m.MessageBox.Icon.ERROR,
					onClose: null,
					styleClass: ""
			});
				return;
				
			}
			var eDate = this.getView().byId("toDate").getDateValue().getTime();
			var sDate = this.getView().byId("fromDate").getDateValue().getTime();
				if(sDate>eDate){
				sap.m.MessageBox.alert("Please ensure that the To Date is greater than or equal to the From Date", {
					title: "Error Message",
					icon: sap.m.MessageBox.Icon.ERROR,
					onClose: null,
					styleClass: ""
			});
				return;

			}
				
				
               
				
			        	var oData={
			        		    "App": "68 ",
			        		    "Dec": "5 ",
			        		    "Drt": "378 ",
			        		    "RevApp": "6 ",
			        		    "RevDec": "0 ",
			        		    "RevDrt": "0 "
			            };
						var oModelReportCounts = sap.ui.getCore().getModel("oModelReportCounts");						
						oModelReportCounts.oData.count1=(oData.App!="")?oData.App:0;
						oModelReportCounts.oData.count2=(oData.Drt!="")?oData.Drt:0;
						oModelReportCounts.oData.count3=(oData.Dec!="")?oData.Dec:0;
						var revApp=(oData.RevApp!="")?parseInt(oData.RevApp):0;
						var revDec=(oData.RevDec!="")?parseInt(oData.RevDec):0;
						var revDrt=(oData.RevDrt!="")?parseInt(oData.RevDrt):0;		
						oModelReportCounts.oData.count4=revApp+revDec+revDrt;
						this.getView().byId("idApproved").setTitle(oModelReportCounts.oData.count1);
						this.getView().byId("idDraft").setTitle(oModelReportCounts.oData.count2);
						this.getView().byId("idDeclined").setTitle(oModelReportCounts.oData.count3);
						this.getView().byId("idRev").setTitle(oModelReportCounts.oData.count4);
						sap.ui.getCore().getModel("oModelReportCounts").refresh();
			        
			        	
	

//				var searchWAModel = sap.ui.getCore().getModel("waModel");
//				var qString="(Value1='"+fromDate+"',Value2='"+toDate+"')";
//				if(searchWAModel) {
//					searchWAModel.read("/ZZ_ENH_STATUSSet"+qString,reportParameters);
//			    }
			
		},
		/**
		* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		* (NOT before the first rendering! onInit() is used for that one!).
		* @memberOf view.MasterSearch
		*/
		onBeforeRendering: function() {
	
		},
		
		/**
		* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		* This hook is the same one that SAPUI5 controls get after being rendered.
		* @memberOf view.MasterSearch
		*/
		onAfterRendering: function() {
			splitAppInstance = this.getView().getParent().getParent();
			var sValue = jQuery.sap.getUriParameters().get("waNo");
		    if(sValue != undefined || null != sValue) {
		    	(this.getView().byId("idSearchWANo")).setValue(sValue);
		    	(this.getView().byId("idIconSearch")).firePress();
		    }
		},
		
		/**
		* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		* @memberOf view.MasterSearch
		*/
		onExit: function() {
	
		},
		
		
		handleForwardDetailPress: function(oEvent)
		{
			this._oRouter.navTo("waDetailsForward");
			//window.location.replace(window.location.href+"/"+globalWANo);
		},
		
		/**
		 * Created By Subhayu De Sarkar
		 * This method called when the search result item is pressed
		 */
		handleListItemPress : function(oEvent) {
			sap.ui.core.BusyIndicator.show(0);
//			var wano = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Aufnr;
			var wano
			if(oEvent.getSource().getSelectedIndex() != -1)
			{
				wano = oEvent.getSource().getRows()[oEvent.getSource().getSelectedIndex()].getBindingContext().getObject().Aufnr;
				
			}
			else
			{
				wano = oEvent.getSource().getRows()[oEvent.getParameters().rowIndex].getBindingContext().getObject().Aufnr;
				var index = oEvent.getParameters().rowIndex;
				oEvent.getSource().setSelectedIndex(index);
			}
			this._oRouter.navTo("waDetails",{workAuthNo:wano});
//			if (splitAppInstance.getMode() === "ShowHideMode") {
//				splitAppInstance.setMode(sap.m.SplitAppMode.HideMode);
//			} else {
//				splitAppInstance.setMode(sap.m.SplitAppMode.ShowHideMode);
//				splitAppInstance.setMode(sap.m.SplitAppMode.HideMode);
//			}
			sap.ui.core.BusyIndicator.hide();
		},
		
		
		/**
		 * Created By Subhayu De Sarkar
		 * This method shows TTSN Popover
		 */
		handleTTSNPopoverPress: function(oEvent) {
			if (!this._ttsnPopover) {
				this._ttsnPopover = sap.ui.xmlfragment("pwc.app.fragment.PopoverTTSN", this);
				this.getView().addDependent(this._ttsnPopover);
				
				var searchResultCustomList = sap.ui.getCore().byId("idSearchResultCustomList");
				var tempJSONModel = new sap.ui.model.json.JSONModel(searchResultCustomList.getSelectedItem().getBindingContext().getObject());
				this._ttsnPopover.setModel(tempJSONModel);
				this._ttsnPopover.bindElement("/");
			}
			
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function () {
				this._ttsnPopover.openBy(oButton);
			});
		},
		
		/**
		 * Created By Subhayu De Sarkar
		 * This method shows Work Type Popover
		 */
		handleWorkTypePopoverPress: function(oEvent) {
			if (!this._workTypePopover) {
				this._workTypePopover = sap.ui.xmlfragment("pwc.app.fragment.PopoverWorkType", this);
				this.getView().addDependent(this._workTypePopover);
				
				var searchResultCustomList = sap.ui.getCore().byId("idSearchResultCustomList");
				var tempJSONModel = new sap.ui.model.json.JSONModel(searchResultCustomList.getSelectedItem().getBindingContext().getObject());
				this._workTypePopover.setModel(tempJSONModel);
				this._workTypePopover.bindElement("/");
			}
			
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function () {
				this._workTypePopover.openBy(oButton);
			});
		},
		
		/**
		 * Created By Subhayu De Sarkar
		 * This is the call of the Search oData.
		 */
		handleSearchResult : function(oEvent) {
		
			var fromDate=this.getView().byId("fromDateSearch").getValue();
			var toDate=this.getView().byId("toDateSearch").getValue();

			
			if(fromDate==''||toDate==''){
				sap.m.MessageBox.alert("Both From Date and To Date are mandatory", {
					title: "Error Message",
					icon: sap.m.MessageBox.Icon.ERROR,
					onClose: null,
					styleClass: ""
			});
				return;
				
			}
			var eDate = this.getView().byId("toDateSearch").getDateValue().getTime();
			var sDate = this.getView().byId("fromDateSearch").getDateValue().getTime();
				if(sDate>eDate){
				sap.m.MessageBox.alert("Please ensure that the To Date is greater than or equal to the From Date", {
					title: "Error Message",
					icon: sap.m.MessageBox.Icon.ERROR,
					onClose: null,
					styleClass: ""
			});
				return;

			}
		    sap.ui.core.BusyIndicator.show(0);

			//var searchWAModel = sap.ui.getCore().getModel("waModel");
			
		
			var waSearchFilter = [];			
			
//			var searchParameters = {
//				filters : waSearchFilter,
//		        urlParameters:{},
//		        success : function(oData) {
//		        	pwc.app.js.SearchWAUtility.populateSearchResult(this,oData);
//		        	var searchResultCustomTable = this.getView().byId("idSearchResultTable");
//		        	var obj = searchResultCustomTable.getModel().getData();
//		        	if(obj.results.length == 1){
//		        		sap.ui.core.BusyIndicator.show(0);
//		        		var wano = obj.results[0].Aufnr;
//		        		this._oRouter.navTo("waDetails",{workAuthNo:wano});
//		        		sap.ui.core.BusyIndicator.hide();
//		        	}
//		        }.bind(this),
//		        error: function (oError) {
//		        	console.log("ERROR Occurred...");
//		        	sap.ui.core.BusyIndicator.hide();
//		        }.bind(this)
//			};
			
			var oData={
					"results": [
			      	{
			          "__metadata": {
			            "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ENH_SEARCHSet('000070009775')",
			            "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ENH_SEARCHSet('000070009775')",
			            "type": "Z_ESP_GW_SERVICE_SRV.ZZ_ENH_SEARCH"
			          },
			          "Filter1": "",
			          "Filter2": "",
			          "Filter3": "",
			          "Fromdate": "",
			          "Todate": "",
			          "Value1": "000070009775",
			          "Value2": "",
			          "Value3": "",
			          "WaNumber": "000070009775",
			          "Erdat": "04/29/2017",
			          "ZespContr": "0991-01",
			          "Serialnr": "",
			          "Zesplastre": "",
			          "WaType": "",
			          "Status": "Approved",
			          "Ernam": "",
			          "ZespOpid": "PWC-05921-J0P7",
			          "Customer": "Dassault Falcon Aircraft Servi",
			          "ZespTailn": "N-416QX",
			          "ZespSerno": "4083",
			          "ZespRevsn": "15",
			          "CreatedOn": "095356",
			          "CreatedDt": "20170429"
			        },
			        {
			          "__metadata": {
			            "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ENH_SEARCHSet('000070009775')",
			            "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ENH_SEARCHSet('000070009775')",
			            "type": "Z_ESP_GW_SERVICE_SRV.ZZ_ENH_SEARCH"
			          },
			          "Filter1": "",
			          "Filter2": "",
			          "Filter3": "",
			          "Fromdate": "",
			          "Todate": "",
			          "Value1": "000070009775",
			          "Value2": "",
			          "Value3": "",
			          "WaNumber": "000070009775",
			          "Erdat": "",
			          "ZespContr": "",
			          "Serialnr": "CD0231",
			          "Zesplastre": "                 4758",
			          "WaType": "",
			          "Status": "",
			          "Ernam": "",
			          "ZespOpid": "",
			          "Customer": "",
			          "ZespTailn": "",
			          "ZespSerno": "",
			          "ZespRevsn": "",
			          "CreatedOn": "095356",
			          "CreatedDt": "20170429"
			        },
			        {
			          "__metadata": {
			            "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ENH_SEARCHSet('000070009775')",
			            "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ENH_SEARCHSet('000070009775')",
			            "type": "Z_ESP_GW_SERVICE_SRV.ZZ_ENH_SEARCH"
			          },
			          "Filter1": "",
			          "Filter2": "",
			          "Filter3": "",
			          "Fromdate": "",
			          "Todate": "",
			          "Value1": "000070009775",
			          "Value2": "",
			          "Value3": "",
			          "WaNumber": "000070009775",
			          "Erdat": "",
			          "ZespContr": "",
			          "Serialnr": "CD0244",
			          "Zesplastre": "                 4590",
			          "WaType": "",
			          "Status": "",
			          "Ernam": "",
			          "ZespOpid": "",
			          "Customer": "",
			          "ZespTailn": "",
			          "ZespSerno": "",
			          "ZespRevsn": "",
			          "CreatedOn": "095356",
			          "CreatedDt": "20170429"
			        },
			        {
			          "__metadata": {
			            "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ENH_SEARCHSet('000070009775')",
			            "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_ENH_SEARCHSet('000070009775')",
			            "type": "Z_ESP_GW_SERVICE_SRV.ZZ_ENH_SEARCH"
			          },
			          "Filter1": "",
			          "Filter2": "",
			          "Filter3": "",
			          "Fromdate": "",
			          "Todate": "",
			          "Value1": "000070009775",
			          "Value2": "",
			          "Value3": "",
			          "WaNumber": "000070009775",
			          "Erdat": "",
			          "ZespContr": "",
			          "Serialnr": "CD0246",
			          "Zesplastre": "5828",
			          "WaType": "",
			          "Status": "",
			          "Ernam": "",
			          "ZespOpid": "",
			          "Customer": "",
			          "ZespTailn": "",
			          "ZespSerno": "",
			          "ZespRevsn": "",
			          "CreatedOn": "095356",
			          "CreatedDt": "20170429"
			        }
			      ]
			};
			
        	pwc.app.js.SearchWAUtility.populateSearchResult(this,oData);
        	var searchResultCustomTable = this.getView().byId("idSearchResultTable");
        	var obj = searchResultCustomTable.getModel().getData();
        	if(obj.results.length == 1){
        		sap.ui.core.BusyIndicator.show(0);
        		var wano = obj.results[0].Aufnr;
        		this._oRouter.navTo("waDetails",{workAuthNo:wano});
        		sap.ui.core.BusyIndicator.hide();
        	}
            var s = new Set();
            for(var i=1;i<=3;i++)
            {	
            	var filter  = this.getView().byId("idCriteria"+i).getSelectedKey();
                  if(filter == "none")
                        continue;
                  if(s.has(filter))
                        {
                	      sap.m.MessageBox.alert("Please ensure that filter1,filter2 and filter 3 are different", {
        					title: "Error Message",
        					icon: sap.m.MessageBox.Icon.ERROR,
        					onClose: null,
        					styleClass: ""
        			}); 
                	return;
                	
                     }
                        s.add(filter);
                   
                        if(filter=="WANO" && this.getView().byId("filter"+i).getValue().trim()!="")
                        	
                        {
                        	
                			waSearchFilter.push(new sap.ui.model.Filter("Filter"+i, sap.ui.model.FilterOperator.EQ,filter));
                			waSearchFilter.push(new sap.ui.model.Filter("Value"+i, sap.ui.model.FilterOperator.EQ,this.getView().byId("filter"+i).getValue().trim().toUpperCase().replace("WA","")));

                  
                        }
                           
//                        else if(filter=="CREATE_DT" && this.getView().byId("datePicker"+i).getValue()!=""){
//                          //  waSearchFilter.push(new sap.ui.model.Filter(filter, sap.ui.model.FilterOperator.EQ, this.getView().byId("datePicker"+i).getValue()));
//                			waSearchFilter.push(new sap.ui.model.Filter("Filter"+i, sap.ui.model.FilterOperator.EQ,filter));
//                			waSearchFilter.push(new sap.ui.model.Filter("Value"+i, sap.ui.model.FilterOperator.EQ,this.getView().byId("datePicker"+i).getValue()));
//
//                        }
                        
                        else if(this.getView().byId("filter"+i).getValue()!=""){
                        	
                         // waSearchFilter.push(new sap.ui.model.Filter(filter, sap.ui.model.FilterOperator.EQ, this.getView().byId("filter"+i).getValue().trim()));
                			waSearchFilter.push(new sap.ui.model.Filter("Filter"+i, sap.ui.model.FilterOperator.EQ,filter));
                			waSearchFilter.push(new sap.ui.model.Filter("Value"+i, sap.ui.model.FilterOperator.EQ,this.getView().byId("filter"+i).getValue().trim()));


                        }
            }     
            
            waSearchFilter.push(new sap.ui.model.Filter("Fromdate", sap.ui.model.FilterOperator.EQ,fromDate));
            waSearchFilter.push(new sap.ui.model.Filter("Todate", sap.ui.model.FilterOperator.EQ,toDate));
            
            
            
//			if(searchWAModel) {
//				searchWAModel.read("/ZZ_ENH_SEARCHSet",searchParameters);
//		    }
			
			globalWANo = "";
			this.getView().byId("forwardButton").setVisible(false);
			forwardIcon = this.getView().byId("forwardButton");
			
		},
		
		
		/**
		 * created by Ashok Sarkar
		 * get search result. odata read filter use in traditional way.
		 */
		handleSearchResult_old : function(oEvent) {
			sap.ui.core.BusyIndicator.show(0);
			var searchWAModel = sap.ui.getCore().getModel("waModel");
			var waNo = this.getView().byId("idSearchWANo").getValue().trim();
			var enSl = this.getView().byId("idEngineSL").getValue().trim().toUpperCase();
			var acTNo = this.getView().byId("idAcTNo").getValue().trim().toUpperCase();
			var acSNo = this.getView().byId("idAcSNo").getValue().trim().toUpperCase();
			var contNo = this.getView().byId("idContNo").getValue().trim().toUpperCase();
			
			waNo= waNo.toUpperCase().replace("WA","");

			var fStr = "ImWaNo eq '"+waNo+"' and ImEngineSl eq '"+enSl+"' and ImAircraftTl eq '"+acTNo+"' and ImAircraftSl eq '"+acSNo+"' and ImEspContract eq '"+contNo+"'";
			var thisContext = this;
			searchWAModel.read('Z_SEARCHSet', null, {
				"$format" : "json",
				"$filter" : fStr
			}, false, function(oData, oResponse) {
		        var obj = JSON.parse(oResponse.body);
		        
		        var oData ={};
		        if(typeof obj != "undefined" && typeof obj.d !="undefined"){
		        	oData = obj.d;
		        }
		        
		        pwc.app.js.SearchWAUtility.populateSearchResult(thisContext,oData);
				
			}, function(oError) { //
				console.log("ERROR Occurred...");
	        	sap.ui.core.BusyIndicator.hide();
			});
		},
		
	 exportToExcel : function(oEvent){
			var oTable = this.getView().byId("idSearchResultTable");
			var aColumns = this.getColumns(oTable);
	        var oExport  = new sap.ui.core.util.Export({
	            exportType : new sap.ui.core.util.ExportTypeCSV({
	                separatorChar : "\t",
	                charset : "utf-8",
	                fileExtension:"xls",
	                mimeType:"application/vnd.ms-excel"
	            }),
	            models : oTable.getModel(),
	            rows : {
	                path : oTable.getBinding("rows").getPath(),
	            },
	            columns : aColumns
	        });

	        oExport.saveFile().always(function() {
	            this.destroy();
	        });
		},
		
		 getColumns : function(oTable) {
		        var aColumns  = oTable.getColumns();
		        var aItems    = oTable.getRows();
		        var aTemplate = [];

		        for (var i = 0; i< aColumns.length; i++) {
		            var oColumn = { 
		                name : aColumns[i].getLabel().getText(),
		                template : {
		                    content : {
		                        path : null
		                    }
		                }
		            };
		            if (aItems.length > 0) {
		                oColumn.template.content.path = aColumns[i].getTemplate().getBindingPath("text");
		            }
		            aTemplate.push(oColumn);
		        }
		        return aTemplate;
		    }
		
	});
	
	return oController;
});