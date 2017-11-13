sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'pwc/app/util/Formatter',
		'pwc/app/js/SearchWAUtility'
	], function(jQuery, Controller, JSONModel) {
	
	"use strict";
	
	var oController = Controller.extend("pwc.app.controller.MasterSearch", {
		/**
		* Called when a controller is instantiated and its View controls (if available) are already created.
		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		* @memberOf view.MasterSearch
		*/
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if(!this._oRouter) this._oRouter = oRouter;
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
			var s = window.location.href.toString();
		    if(sValue != undefined || null != sValue) {
		    	window.location.href = s.substring(0,s.indexOf("waNo")-1)+"#/waDetail/"+sValue;
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
		
		/**
		 * Created By Subhayu De Sarkar
		 * This method called when the search result item is pressed
		 */
		handleListItemPress : function(oEvent) {
			sap.ui.core.BusyIndicator.show(0);
			workScopeOpened = new Set();
			engineTabOpened = "";
			var wano = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Aufnr;
			this._oRouter.navTo("waDetails",{workAuthNo:wano});
			
			if (splitAppInstance.getMode() === "ShowHideMode") {
				splitAppInstance.setMode(sap.m.SplitAppMode.HideMode);
			} else {
				splitAppInstance.setMode(sap.m.SplitAppMode.ShowHideMode);
				splitAppInstance.setMode(sap.m.SplitAppMode.HideMode);
			}
//			splitAppInstance.setMode("HideMode");
			sap.ui.core.BusyIndicator.hide();
			
			
			var wadetails = this.getView().getParent().getParent().getParent().getParent().getParent().byId("WADetails");
			if(wadetails != undefined)
			{
				var shippingIcon = wadetails.byId("shippingIcon");
				shippingIcon.setColor("#666666");
			}
			
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
			sap.ui.core.BusyIndicator.show(0);
			var searchWAModel = sap.ui.getCore().getModel("waModel");
			var waNo = this.getView().byId("idSearchWANo").getValue().trim();
			var enSl = this.getView().byId("idEngineSL").getValue().trim().toUpperCase();
			var acTNo = this.getView().byId("idAcTNo").getValue().trim().toUpperCase();
			var acSNo = this.getView().byId("idAcSNo").getValue().trim().toUpperCase();
			var contNo = this.getView().byId("idContNo").getValue().trim().toUpperCase();
			
			waNo= waNo.toUpperCase().replace("WA","");
			var waSearchFilter = [];			
			waSearchFilter.push(new sap.ui.model.Filter("ImWaNo", sap.ui.model.FilterOperator.EQ, waNo));
			waSearchFilter.push(new sap.ui.model.Filter("ImEngineSl", sap.ui.model.FilterOperator.EQ,enSl ));
			waSearchFilter.push(new sap.ui.model.Filter("ImAircraftTl", sap.ui.model.FilterOperator.EQ,acTNo));
			waSearchFilter.push(new sap.ui.model.Filter("ImAircraftSl", sap.ui.model.FilterOperator.EQ,acSNo));
			waSearchFilter.push(new sap.ui.model.Filter("ImEspContract", sap.ui.model.FilterOperator.EQ,contNo));

			var searchParameters = {
				filters : waSearchFilter,
		        urlParameters:{},
		        success : function(oData) {
		       
		        	pwc.app.js.SearchWAUtility.populateSearchResult(this,oData);
		       
		        }.bind(this),
		        error: function (oError) {
		        	console.log("ERROR Occurred...");
		        	sap.ui.core.BusyIndicator.hide();
		        }.bind(this)
			};
			
			if(searchWAModel) {
				searchWAModel.read("/Z_SEARCHSet",searchParameters);
		    }
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
		}
		
	});
	
	return oController;
});