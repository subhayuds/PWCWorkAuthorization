jQuery.sap.declare("pwc.app.js.CommentsUtility");

pwc.app.js.CommentsUtility = {

	/*** Comments Pop over Start ***/
	_handleCommentsPopoverPress : function(thisContext) {
		var oDataModel = sap.ui.getCore().getModel("waModel");
		var entity = "ZZ_COMMENT_TEXTSet('" + globalWANo + "')";
		//			oDataModel.read(entity, null, {
		//				"$format" : "json"
		//			}, false, function(oData, oResponse) {
		var obj = {
			"d" : {
				"__metadata" : {
					"id" : "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_COMMENT_TEXTSet('70009775')",
					"uri" : "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_COMMENT_TEXTSet('70009775')",
					"type" : "Z_ESP_GW_SERVICE_SRV.ZZ_COMMENT_TEXT"
				},
				"CsOrder" : "70009775",
				"Operation" : "",
				"CommentText" : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccc",
				"IssueText" : "",
				"ContractText" : "2009-02-02: Requested Termination. A/C reconciled. Changed status fromNot Paid to Terminated - RS2008-10-01: the status changed from Active to NP; EH 2008-06-30: thestatus changed to Active; EH 2008-06-19: the customer paid theoutstanding amount up to April'08; the status changed to NP as there isstill outstanding payment for the hours flown in April; As the paymentreceived, the status will be changed to Active; EH 2008-05-14: PS Noticesent to the customer; the status changed from A to PS; EH"
			}
		};

		var commentDialog = obj.d;
		delete commentDialog["__metadata"];
		delete commentDialog["__proto__"];

		pwc.app.js.CommentsUtility.getRevisionTableData(thisContext,
				commentDialog);

	},

	getRevisionTableData : function(thisContext, commentDialog) {
		var oDataModel = sap.ui.getCore().getModel("waModel");
		var entity = "ZZ_REVISIONSet";
		var filter = "ImCsOrder eq '" + globalWANo + "'";
//		oDataModel.read(entity, null, {
//			"$format" : "json",
//			"$filter" : filter
//		}, false, function(oData, oResponse) {
			var obj = {
					  "d": {
						    "results": [
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "2",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170526",
						        "CreatedTime": "235233"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "5",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170531",
						        "CreatedTime": "144413"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "6",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170531",
						        "CreatedTime": "145244"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "7",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170531",
						        "CreatedTime": "145327"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "1",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170526",
						        "CreatedTime": "234148"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "3",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170531",
						        "CreatedTime": "143312"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "4",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170531",
						        "CreatedTime": "143555"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "13",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170616",
						        "CreatedTime": "152220"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "14",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170620",
						        "CreatedTime": "222349"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "15",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170705",
						        "CreatedTime": "185506"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "9",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170601",
						        "CreatedTime": "164841"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "12",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170615",
						        "CreatedTime": "153236"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "8",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170531",
						        "CreatedTime": "151931"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "10",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170605",
						        "CreatedTime": "144917"
						      },
						      {
						        "__metadata": {
						          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_REVISIONSet('000070009775')",
						          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_REVISION"
						        },
						        "ImCsOrder": "",
						        "CsOrder": "000070009775",
						        "ResvNumber": "11",
						        "CreatedBy": "Sampat Gopalpatil",
						        "CreatedDate": "20170606",
						        "CreatedTime": "164647"
						      }
						    ]
						  }
						};

			var revisionTbl = obj.d;
			delete revisionTbl["__metadata"];
			delete revisionTbl["__proto__"];

			if (!thisContext._commentsSDialog) {
				thisContext._commentsSDialog = sap.ui.xmlfragment(
						"pwc.app.fragment.WACommentsDialog", thisContext);
				thisContext._commentsSDialog.setEndButton(new sap.m.Button({
					text : 'Cancel',
					press : function() {
						thisContext._commentsSDialog.close();
					}
				}));
				thisContext._commentsSDialog.setBeginButton(new sap.m.Button({
					text : 'Confirm', // string
					press : [
							function(oEvent) {
								var control = oEvent.getSource();
								pwc.app.js.CommentsUtility
										._handleCommentsDialogConfirm(oEvent);
								thisContext._commentsSDialog.close();
							}, this ]
				}));
				thisContext.getView()
						.addDependent(thisContext._commentsSDialog);
			}

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact",
					thisContext.getView(), thisContext._commentsSDialog);
			var waTopAndHdrModel = sap.ui.getCore()
					.getModel("waTopAndHdrModel");
			if (waTopAndHdrModel.getData().ViewOnly == "X") {
				var x = thisContext._commentsSDialog.getBeginButton();
				x.setVisible(false); //Confirm button
			} else {
				var x = thisContext._commentsSDialog.getBeginButton();
				x.setVisible(true); //Confirm button
			}
			thisContext._commentsSDialog.open();

			var commentTxtArea = sap.ui.getCore().byId("commentTxtArea");
			commentTxtArea.setValue(commentDialog.CommentText);
			var contractArea = sap.ui.getCore().byId("contractTxtArea");
			contractArea.setValue(commentDialog.ContractText);
			sap.ui.getCore().setModel(commentDialog, "commentDialog");

			var revTable = sap.ui.getCore().byId("revisionTable");
			revTable.setVisibleRowCount(revisionTbl.results.length);
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(revisionTbl)
			revTable.setModel(oModel, "revisionTbl");

		
	},

	_handleCommentsDialogConfirm : function() {
		var commentValue = sap.ui.getCore().byId("commentTxtArea").getValue();
		//			var issueTxtArea = sap.ui.getCore().byId("issueTxtArea").getValue();
		var flag = false;
		var commentDialog = sap.ui.getCore().getModel("commentDialog");
		if (commentDialog.CommentText.trim() != commentValue.trim()) {
			flag = true;
			commentDialog.CommentText = commentValue;
		} else
			commentDialog.CommentText = "";

		//			if(commentDialog.IssueText.trim() !=  issueTxtArea.trim()){
		//				flag = true;
		//				commentDialog.IssueText = issueTxtArea;
		//			} else {
		//				commentDialog.IssueText = "";
		//			}

		var postPayload = {};
		if (flag){
				postPayload.d=  commentDialog;	
				$.ajax({
						//			    	url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_COMMENT_TEXTSet?$format=json",
						url : "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_COMMENT_TEXTSet?$format=json",
						type : "GET",
						async : true,
						contentType : "application/json",
						//			    	username: "P926442",
						//			    	password: "Saltlake@107",
						headers : {
							"Content-Type" : "application/json",
							"DataServiceVersion" : "2.0",
							"X-CSRF-Token" : "Fetch"
						},
						success : function(oData, status, request) {
							console.log("GET " + status);
							console.log(oData);
							var xCSRFToken = request.getResponseHeader("x-csrf-token");
			    		console.log(xCSRFToken);
			    		
						var jsonPayload = JSON.stringify(postPayload);
			    		
			    		$.ajax({
										//			    	    	url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_COMMENT_TEXTSet",
										url : "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_COMMENT_TEXTSet",
										type : "POST",
										async : true,
										contentType : "application/json",
										data : jsonPayload,
										//			    	    	username: "P926442",
										//			    	    	password: "Saltlake@107",
										headers : {
											"Content-Type" : "application/json",
											"X-CSRF-Token" : xCSRFToken
										},
										success : function(oData, status,
												request) {
											console.log("POST " + status);
										},
										error : function(oData, status, request) {
											console.log("POST " + status);
											console.log(oData);
										}
									});
						},
						error : function(oData, status, request) {
							console.log("GET" + status);
							console.log(oData);
						}
					});
		}
		//			console.log(issueTxtArea + "   " + commentValue);
	},

}