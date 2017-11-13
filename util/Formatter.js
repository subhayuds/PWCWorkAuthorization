jQuery.sap.declare("pwc.app.util.WAFormatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");

pwc.app.util.WAFormatter = {
		_convDate : function (value) {
			
		if(value == null || (typeof value == "undefined") || value == ""){
			return value;
		}
		
		var dtValYear=value.substring(0, 4);
		var dtValMont=value.substring(4, 6);
		var dtValDate=value.substring(6, 8);
		
		var accDate = dtValYear+"/"+dtValMont+"/"+dtValDate;
		var CDate = new Date(accDate);
		
		if (CDate) {
			var oDateFormat =  sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd-MMM-yyyy"}); 
			return oDateFormat.format(new Date(CDate));
		} else {
			return value;
		}
	},
	
	_convTime : function(value){
		if(typeof value != "undefined" && value != "" && value != null && value.length == 6){
			var time = value.split("");
			value = time.slice(0, 2).join("") + ":" + time.slice(2, 4).join("")+ ":" + time.slice(4, 6).join("");
		}
		
		return value;
	},
	
	checkRefWANumberFormat:function(value){
		if(typeof value == "undefined" || value == ""){
			return;
		}
        var intvalue = parseInt(value);
        var isError = false;
        if(isNaN(intvalue) || intvalue < 0){
        	isError = true;
	        var dialog = new sap.m.Dialog({
				title: 'Warning',
				type: 'Message',
				state: 'Warning',
				content: new sap.m.Text({
					text: "Please enter Ref WA number using only digits."
				}),
				beginButton: new sap.m.Button({
					text: 'OK',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
        }
        
        return isError;
	}
	

		
		
};