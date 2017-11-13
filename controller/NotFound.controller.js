//sap.ui.controller("pwc.app.controller.NotFound", {
sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
	], function(jQuery, Controller, JSONModel) {
		"use strict";
		var oController = Controller.extend("pwc.app.controller.NotFound", {
		/**
		* Called when a controller is instantiated and its View controls (if available) are already created.
		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		* @memberOf view.NotFound
		*/
			onInit: function() {
				
				
		
			},
		
		/**
		* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		* (NOT before the first rendering! onInit() is used for that one!).
		* @memberOf view.NotFound
		*/
			onBeforeRendering: function() {
				
				var sValue = jQuery.sap.getUriParameters().get("waNo");
				var s = window.location.href.toString();
				if(sValue != undefined || null != sValue) 
				{
					this.getView().byId("notFoundMessagePage").setTitle("");
					this.getView().byId("notFoundMessagePage").setText("");
					this.getView().byId("notFoundMessagePage").setDescription("");
					this.getView().byId("notFoundMessagePage").setShowHeader(false);
					var target = s.replace("index.html?waNo=","#/waDetail/");
					sap.ui.core.BusyIndicator.show(0);
				    window.location.href = target;//s.substring(0,s.indexOf("waNo")-1)+"#/waDetail/"+sValue;
				    	//(this.getView().byId("idSearchWANo")).setValue(sValue);
				    	//(this.getView().byId("idIconSearch")).firePress();
				}
				else
				{
					this.getView().byId("notFoundMessagePage").setTitle("Not Found");
					this.getView().byId("notFoundMessagePage").setText("Sorry, but the requested resource is not available.");
					this.getView().byId("notFoundMessagePage").setDescription("Please check the URL and try again.");
					this.getView().byId("notFoundMessagePage").setShowHeader(true);
				}
				
		
			},
		
		/**
		* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		* This hook is the same one that SAPUI5 controls get after being rendered.
		* @memberOf view.NotFound
		*/
			onAfterRendering: function() {
				
				
			},
		
		/**
		* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		* @memberOf view.NotFound
		*/
		//	onExit: function() {
		//
		//	}
		});
		
		return oController;
});