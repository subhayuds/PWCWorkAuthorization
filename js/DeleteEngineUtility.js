jQuery.sap.declare("pwc.app.js.DeleteEngineUtility");

pwc.app.js.DeleteEngineUtility = {
		deleteEngine : function(thisContext,deletedEngArr){
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
					"EspPriceUnit": "USD",
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
			//get the engine sub order from ttsn model
			var ttsnarr = sap.ui.getCore().getModel("ttsn").getData().results;
			var Z_HDR_ITMN = [];
			var engmsg = "";
			for(var i=0;i<deletedEngArr.length;i++){
				var engslno = deletedEngArr[i];
				var newDelEngPayload = JSON.parse(JSON.stringify(oPayload));
				newDelEngPayload.EngineSl = engslno;
				newDelEngPayload.MainOrder = globalWANo;
				newDelEngPayload.Activity = "DE";
				for(var z=0;z<ttsnarr.length;z++){
					var obj = ttsnarr[z];
					if(obj.EnSlNumber == engslno){
						engmsg = engmsg + " " + engslno;
						newDelEngPayload.SubOrder = obj.CsOrderSub;
						break;
					}
				}
				Z_HDR_ITMN[Z_HDR_ITMN.length] = newDelEngPayload;

			}
			var postPayload ={
					  "d": {
						    "EngineSl": engslno,
						    "Z_HDR_ITMN": Z_HDR_ITMN
						  }
					};
			sap.m.MessageBox.confirm("Last workscope for Engine(s) ["+engmsg+"]. Continue to close sub order(s)?",
					function (oAction) {
					if (sap.m.MessageBox.Action.OK === oAction) {
						pwc.app.js.SaveWAUtility._saveWorkAuthorization(thisContext,false,false,false,true,postPayload);
					}
				}
			);
			
		}
}