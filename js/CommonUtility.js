jQuery.sap.declare("pwc.app.js.CommonUtility");

pwc.app.js.CommonUtility = {
		validationMessage: function(msg,msgTitle,iconType){
		sap.m.MessageBox.alert(msg, {
		    title: msgTitle,
		    icon: iconType,
		    onClose: null,
		    styleClass: ""
		});
	},
	
	messageToast : function(msg){
		sap.m.MessageToast.show(msg, {
	        duration: 5000,                  // default
	        width: "30em",                   // default
	        my: "center top",             // default
	        at: "center top",             // default
	        of: window,                      // default
	        offset: "0 0",                   // default
	        collision: "fit fit",            // default
	        onClose: null,                   // default
	        autoClose: true,                 // default
	        animationTimingFunction: "ease", // default
	        animationDuration: 1000,         // default
	        closeOnBrowserNavigation: true   // default
	    })
	},
	
	
	dateFormat: function(value) {
		var dtValYear=value.substring(6, 10);
		var dtValMont=value.substring(0, 2);
		var dtValDate=value.substring(3, 5);
		
		var accDate = dtValYear+"/"+dtValMont+"/"+dtValDate;
		var CDate = new Date(accDate);
		
		if (CDate) {
			var oDateFormat =  sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd-MMM-yyyy"}); 
			return oDateFormat.format(new Date(CDate));
		} else {
			return value;
		}
	},
}