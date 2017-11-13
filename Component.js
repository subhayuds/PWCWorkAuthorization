sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
	"use strict";

	return UIComponent.extend("pwc.app.Component", {
		metadata: {
            manifest: "json"
        },
        
        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // create the views based on the url/hash
            this.getRouter().initialize();
        },
        
        createContent : function() {
        	var hostName = location.hostname;
        	var sServiceUrl = "";
        	var modelParameters = {
        		headers: {"x-csrf-token": "Fetch"},
        		tokenHandling: false,
        		json: true
        	};
        	
        	if(hostName == "localhost") {
    			sServiceUrl = "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV";
//    			modelParameters["user"] = "P926442";
//    			modelParameters["password"] = "Saltlake@091";
    			modelParameters["user"] = "P926443";
    			modelParameters["password"] = "Asdf2345";
    		} else {
	    		sServiceUrl = "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV";
        	}

    		//var waModel = new sap.ui.model.odata.ODataModel(sServiceUrl,modelParameters);
    		//sap.ui.getCore().setModel(waModel,"waModel");
			
    		// create root view
			var oView = sap.ui.view({
				id : "idApp",
				viewName : "pwc.app.view.App",
				type : "XML",
				viewData : { component : this }
			});

//			var oView = sap.ui.view({
//				id : "idSplitApp",
//				viewName : "pwc.app.view.SplitApp",
//				type : "XML",
//				viewData : { component : this }
//			});
			
			return oView;
		}
	});
});
var globalLocalOrServer = "";
var globalWANo = "";
var splitAppInstance = null;
var chkAttachUpdateFinishedMethodCall = "";
var errorWhileApprove = false;
var workScopeOpened = new Set();
var engineTabOpened = "";
var waDetailController = "";
var forwardIcon = "";