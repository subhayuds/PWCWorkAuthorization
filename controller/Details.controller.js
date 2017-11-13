sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageBox',
	'pwc/app/js/DetailsUtility',
	'pwc/app/js/DetailsHelper'
	], function(jQuery, Controller, JSONModel) {
		"use strict";
		
		var oController = Controller.extend("pwc.app.controller.Details", {
		/**
		* Called when a controller is instantiated and its View controls (if available) are already created.
		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		* @memberOf view.Details
		*/
		onInit: function() {
			
		},
		
		/**
		* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		* (NOT before the first rendering! onInit() is used for that one!).
		* @memberOf view.Details
		*/
		onBeforeRendering: function() {

		},
		
		/**
		* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		* This hook is the same one that SAPUI5 controls get after being rendered.
		* @memberOf view.Details
		*/
		onAfterRendering: function() {

		},
		
		/**
		* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		* @memberOf view.Details
		*/
		onExit: function() {
	
		},
		
		/**
		 * This method is called when Copy Work Scope icon is clicked
		 */
		copyWS: function(oEvent) {
			var dialog = new sap.m.Dialog({
				title: 'Copy WS To:',
				content: new sap.m.List({
					id: "wsCopyToList",
					mode: "MultiSelect",
				}),
				beginButton: new sap.m.Button({
					text: 'Copy',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			
			var oList = sap.ui.getCore().byId("wsCopyToList");
			oList.addItem(new sap.m.StandardListItem({title: "CH0051"}));
			oList.addItem(new sap.m.StandardListItem({title: "CH0052"}));
			oList.addItem(new sap.m.StandardListItem({title: "CH0053"}));
			oList.addItem(new sap.m.StandardListItem({title: "CH0054"}));
			oList.addItem(new sap.m.StandardListItem({title: "CH0055"}));
			
			this.getView().addDependent(dialog);
			dialog.open();
		},
		
		/*** Items Search Start ***/
//		searchItems: function(oEvent) {
//			var that = this;
//			if (!this._searchItemsDialog) {
//		      this._searchItemsDialog = sap.ui.xmlfragment("pwc.app.fragment.searchItemsDialog", this);
//		      this.getView().addDependent(this._searchItemsDialog);
//		    }
//	
//		    // toggle compact style
//		    jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._searchItemsDialog);
//		    this._searchItemsDialog.open();
//		},
//		
//		handleSelectItem: function(oEvent) {
//			this._searchItemsDialog.close();
//		},
//		
//		handleCancelItemSearch: function(oEvent) {
//			this._searchItemsDialog.close();
//		},
		/*** Items Search End ***/
		
		/**
		 * 
		 */
		_generateEngDtlsLocalJSON : function(blankPayloadRow){
			var thisContext = this;
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
		}
	});
	
	return oController;
});

var tempID = null;
var selectedTableRowItem = null;