sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageBox',
	'pwc/app/util/Formatter',
	'pwc/app/js/ViewWADetailsUtility',
	'pwc/app/js/ShippingInfoUtility',
	'pwc/app/js/WorkScopeUtility',
	'pwc/app/js/SaveWAUtility',
	'pwc/app/js/ApproveWAUtility',
	'pwc/app/js/RejectWAUtility',
	'pwc/app/js/CommentsUtility',
	'pwc/app/js/ESPContactUsUtility',
	'pwc/app/js/DeleteEngineUtility',
	'pwc/app/js/PDFUtility',
	'pwc/app/util/WAFormatter'
	], function(jQuery, Controller, JSONModel) {
		"use strict";

		var oController =  Controller.extend("pwc.app.controller.WADetails", {
			/**
			* Called when a controller is instantiated and its View controls (if available) are already created.
			* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			* @memberOf view.WADetails
			*/
			onInit: function() {
				/*var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				if(!this._oRouter) this._oRouter = oRouter;
				var splitAppInstance = sap.ui.getCore().byId("idSplitApp");
				splitAppInstance = splitAppInstance.getContent()[0].getContent()[0];
				splitAppInstance.setMode("HideMode");
				this._oRouter.getRoute("waDetails").attachPatternMatched(function(oEvent) {
					this.waNoFromMaster = oEvent.getParameter("arguments").workAuthNo;
					pwc.app.js.ViewWADetailsUtility.getWADetails(this.waNoFromMaster,this);
				}, this);*/
				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				if(!this._oRouter) this._oRouter = oRouter;
				this._oRouter.getRoute("waDetails").attachPatternMatched(function(oEvent) {
					this.waNoFromMaster = oEvent.getParameter("arguments").workAuthNo;
					pwc.app.js.ViewWADetailsUtility.getWADetails(this.waNoFromMaster,this);
				}, this);
			},
			
			/**
			* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			* (NOT before the first rendering! onInit() is used for that one!).
			* @memberOf view.WADetails
			*/
			onBeforeRendering: function() {

			},
			
			/**
			* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			* This hook is the same one that SAPUI5 controls get after being rendered.
			* @memberOf view.WADetails
			*/
			onAfterRendering: function() {
	
			},
			
			/**
			* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			* @memberOf view.WADetails
			*/
			onExit: function() {
				
			},
			
			
			
			/*** Header Events - START ***/
			handleBackToSearchPress: function(oEvent) {
				this._oRouter.navTo("waHome");
			},
			handleRefWoNumber:function(oEvent){
				var value = oEvent.getSource().getValue();
				pwc.app.util.WAFormatter.checkRefWANumberFormat(value);
			},
			
			
			/*** Shipping Info - START ***/
			/* Added by Mriganka for shipping popup functionality ---Start*/
			handleShippingInfoPopoverPress: function(oEvent) {
				pwc.app.js.ShippingInfoUtility._handleShippingInfoPopoverPress(oEvent,this);
			},
			handleConfirmShippingInfo: function(oEvent) {
				pwc.app.js.ShippingInfoUtility._handleConfirmShippingInfo(oEvent,this);
				
			},
			handleCancelShippingInfo: function(oEvent) {
				pwc.app.js.ShippingInfoUtility._handleCancelShippingInfo(oEvent,this);
			},
			handleAddShippingInfo: function(oEvent) {
				pwc.app.js.ShippingInfoUtility._handleAddShippingInfo(oEvent,this);
			},
			
			handleAddOthersShippingInfo: function(oEvent){
				pwc.app.js.ShippingInfoUtility.handleAddOthersShippingInfo(oEvent,this);
			},
			
			handleCancelOthersShippingInfo: function(oEvent){
				pwc.app.js.ShippingInfoUtility.handleCancelOthersShippingInfo(oEvent,this);
			},
			
			/* Added by Mriganka for shipping popup functionality ---End*/
			/*** Shipping Info - END ***/
			
			/*** Contact Us Pop over Start ***/
			handleContactUsPopoverPress: function(oEvent) {
				pwc.app.js.ESPContactUsUtility._handleContactUsPopoverPress(this,oEvent);
			},
			/*** Contact Us Pop over End ***/
			
			/*** Comments Pop over Start ***/
			handleCommentsPopoverPress: function(oEvent) {
				pwc.app.js.CommentsUtility._handleCommentsPopoverPress(this);
			},
			
			
			handleDeleteWorkScope : function(oEvent){
                pwc.app.js.WorkScopeUtility._handleDeleteWorkScope(oEvent,this);
            },
            
            
			floatingvalidation: function(oEvent)
			{
				var inputBox = oEvent.getSource();
				var index = oEvent.getSource().getParent().getIndex();
				var EnSlNumber = sap.ui.getCore().getModel("ttsn").oData.results[index].EnSlNumber;
				var LastReTtsn = sap.ui.getCore().getModel("ttsn").oData.results[index].LastReTtsn;
				
				if(isNaN(inputBox.getValue()))
		        {
					sap.m.MessageBox.alert("Incorrect value in Actual TTSN for Engine "+EnSlNumber, {
						title: "Warning Message",
						icon: sap.m.MessageBox.Icon.WARNING,
						onClose: null,
						styleClass: ""
				});
					return;
		        }
				
				var validaion = pwc.app.js.SaveWAUtility._floatingvalidation(inputBox.getValue(),this);
				if(validaion == false)
				{
					sap.m.MessageBox.alert("Provide correct value [e.g. 99999.9] in Actual TTSN for Engine "+EnSlNumber, {
						title: "Error Message",
						icon: sap.m.MessageBox.Icon.ERROR,
						onClose: null,
						styleClass: ""
				});
				}
				var val = pwc.app.js.SaveWAUtility.roundNumber(inputBox.getValue(),1);
//				inputBox.setValue(val.toString());
				sap.ui.getCore().getModel("ttsn").oData.results[index].EventReTtsn = (val.toString() == "0" ? "" : val.toString());
				sap.ui.getCore().getModel("ttsn").refresh();
				
			},
            
            
			/**
			 * 
			 */
			_handleCommentsDialogConfirm: function(oEvent){
				var commentValue = sap.ui.getCore().byId("commentTxtArea").getValue();
				var issueTextArea = sap.ui.getCore().byId("issueTxtArea").getValue();
				var flag = false;
				var commentDialog = sap.ui.getCore().getModel("commentDialog");
				if(commentDialog.CommentText.trim() !=  commentValue.trim()) {
					flag = true;
					commentDialog.CommentText = commentValue;
				} else commentDialog.CommentText = "";
				
				if(commentDialog.IssueText.trim() !=  issueTextArea.trim()){
					flag = true;
					commentDialog.IssueText = issueTextArea;
				} else {
					commentDialog.IssueText = "";
				}

				var postPayload = {};
				if(flag){
					postPayload.d=  commentDialog;	
					$.ajax({
//				    	url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_COMMENT_TEXTSet?$format=json",
						url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_COMMENT_TEXTSet?$format=json",
				    	type: "GET",
				    	async: true,
				    	contentType: "application/json",
//				    	username: "P926442",
//				    	password: "Saltlake@107",
				    	headers:  {       
					        	  	"Content-Type": "application/json", 
					        	  	"DataServiceVersion": "2.0",          
					        	  	"X-CSRF-Token":"Fetch"      
								  },
				    	success: function(oData, status, request){
				    		console.log("GET " + status);
				    		console.log(oData);
				    		var xCSRFToken = request.getResponseHeader("x-csrf-token");
				    		console.log(xCSRFToken);
				    		
							var jsonPayload = JSON.stringify(postPayload);
				    		
				    		$.ajax({
//				    	    	url: "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_COMMENT_TEXTSet",
				    			url: "/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_COMMENT_TEXTSet",
				    	    	type: "POST",
				    	    	async: true,
				    	    	contentType: "application/json",
				    	    	data: jsonPayload,
//				    	    	username: "P926442",
//				    	    	password: "Saltlake@107",
				    	    	headers:  {       
							        	  	"Content-Type": "application/json", 
							        	  	"X-CSRF-Token":xCSRFToken      
										  },
				    	    	success: function(oData, status, request) {
				    	    		console.log("POST " + status);
				    	    	},
				    	    	error: function(oData, status, request) {
				    	    		console.log("POST " + status);
				    	    		console.log(oData);
				    	    	}
				    	    });
				    	},
				    	error: function(oData, status, request) {
		    	    		console.log("GET" + status);
		    	    		console.log(oData);
		    	    	}
				    });
				}	
				console.log(issueTextArea + "   " + commentValue);
			},
			
			/**
			 * 
			 */
			handleCommentsDialogClose: function(oEvent){
				sap.ui.getCore().byId("vendorSearchError").setVisible(false);
				this._commentsSDialog.close();
			},
			
			
			
			handleCommentsForTableConfirmButton: function(oEvent){
				var textAreaValue = oEvent.getSource().getParent().getParent().getContent()[0].getValue();
				var popup = oEvent.getSource().getParent().getParent();
				var obj = popup.getModel().getData();
				var table = [];
				if(obj.model.getData().hasOwnProperty('oper')){
					table = obj.model.getData().oper;
					for(var i=0;i<table.length;i++){
						var tobj = table[i];
						if(tobj.Operation == obj.operno){
							if(tobj.LongText != textAreaValue){
								tobj.LongText = textAreaValue;
								if(tobj.flag != 'A'){
									tobj.flag = 'E';
								}
								obj.model.refresh();
							}
							break;
						}
					}	
				}
				else{
					table = obj.model.getData().comp;
					var indx = parseInt(obj.tblindx);
					var tobj = table[indx];
					if(tobj.LongText != textAreaValue){
						tobj.LongText = textAreaValue;
						if(tobj.flag != 'A'){
							tobj.flag = 'E';
						}
						obj.model.refresh();
					}
				}
				this._commentsForTable.close();
			},
			
			handleCommentsForTableCancelButton : function(oEvent){
				this._commentsForTable.close();
			},
			
			
			/**
			 * 
			 */
			handleConfirmComment: function(oEvent) {
				this._commentsPopover.close();
			},
			/*** Comments Pop over End ***/
			
			/**
			 * PRINT
			 */
			handlePrint: function(){
				pwc.app.js.PDFUtility.getPDFData(this);
			},
			/*** Header Events - END ***/
			
			/*** Engine, Operation & Component Events - START ***/
			/**
			 * Created by Ashok Sarkar
			 * get the last operation number of a engine. 
			 */
			_getLastOper:function(oEvent){
				var max = 0;
				var x=oEvent.getSource().getParent().getParent().getParent().getParent(); //get the engine tab
				var pnls = x.getContent(); //get panels as an array
				for(var i=0;i<pnls.length;i++){
					var p = pnls[i].getContent(); //get content of a panel like textarea, oper table and comp table
					var opertbl = p[1].getItems(); // get rows of operation table only. i.e. in 1st indx
					for(var j=0;j<opertbl.length;j++){
						var row = opertbl[j];
						var colmns = row.getCells(); //get columns for each row
						var col = colmns[0].getValue();
						if(parseInt(col) > parseInt(max)){
							max = parseInt(col);
						}
					}
				}
				var str = ""
				max = (parseInt(max) + 10);
				if(parseInt(max)>=100 && parseInt(max) <= 999){
					str = "0" + max;
				}
				else if(parseInt(max)>=1000 && parseInt(max) <= 9999){
					str = max;
				}
				else{
					str = "00" + max;
				}
				return str;
			},
			
			/**
			 * Created By Subhayu De Sarkar
			 * Common method for ADD new Operation and Component Row
			 */
			handleOperationComponentAdd: function(oEvent){
				var addRowTable = oEvent.getSource().getParent().getParent();
				var addRowTableItems = addRowTable.getItems();
				var blankRow = {};
				var operationNumber = "0010";
				var addedRowIndex = 0;
				
				if(addRowTableItems.length > 0) {
					var lastModelObj = addRowTableItems[addRowTableItems.length-1].getModel().getProperty(addRowTableItems[addRowTableItems.length-1].getBindingContextPath());
					var blankRow = JSON.parse(JSON.stringify(addRowTableItems[addRowTableItems.length-1].getModel().getProperty(addRowTableItems[addRowTableItems.length-1].getBindingContextPath())));
//					operationNumber = "00" + (parseInt(blankRow.Operation) + 10);
					operationNumber = this._getLastOper(oEvent);
					addedRowIndex = addRowTableItems.length;
				}
				
				var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
				
				/*** Common Fields ***/
//				blankRow.WoNumber = "";
				blankRow.Price = "";
				blankRow.PriceUnit = "";
				blankRow.ServicePrvd = "";
				blankRow.vendorId = "";
				blankRow.TextId = "";
				blankRow.RevisionNum = (typeof waTopAndHdrModel.getData().RevisionNum != "undefined" && waTopAndHdrModel.getData().RevisionNum != "") ? (parseInt(waTopAndHdrModel.getData().RevisionNum) + 1).toString() : "";
				blankRow.flag = "A";
				
				if(addRowTable.mBindingInfos.items.path.indexOf("oper") > -1) {
					blankRow.Operation = operationNumber;
					blankRow.OperationDesc = "";
					blankRow.WorkCenter = "";
					blankRow.WorkScope = "";
					blankRow.LongText = "";
					
					((addRowTable.getModel().oData).oper).push(blankRow);
					
					//add new operation number into dd of component table
					var comptable =addRowTable.getParent().getContent()[2]; //get the comp table
					if(comptable.getItems().length > 0){
						var row = comptable.getItems()[0];//get the first row of comp table
						var dd = row.getCells()[0]; //get the drop down column of first row
						(dd.getModel().getData().operDropDown).push(blankRow); //add new row into drop down model
						dd.getModel().refresh();//refresh the drop down model
					}
					
				} else if(addRowTable.mBindingInfos.items.path.indexOf("comp") > -1) {
					blankRow.PartDesc = "";
					blankRow.PartItmNo = "";
					blankRow.PartNumber = "";
					blankRow.PartQuantity = "";
					blankRow.LongText = "";
					blankRow.ServicePrvd = "";
					blankRow.Operation = ""; 
					
					((addRowTable.getModel().oData).comp).push(blankRow);

					//select first drop down value, if task table has only single record.
					var taskTbl = addRowTable.getParent().getContent()[1];
					if(taskTbl.getItems().length == 1){
						var row = taskTbl.getItems()[0];
						var operno = row.getCells()[0].getValue();

						addRowTable.getModel().refresh();
						var compTblRow = addRowTable.getItems()[addRowTable.getItems().length-1];
						var dd = compTblRow.getCells()[0];
						dd.setSelectedKey(operno);
						blankRow.Operation = operno;
					}
				}
				addRowTable.getModel().refresh();
				
				if(addRowTable.mBindingInfos.items.path.indexOf("oper") > -1) {
					addRowTable.getItems()[addedRowIndex].getCells()[0].setEditable(true);
					addRowTable.getItems()[addedRowIndex].getCells()[1].setEditable(true);
					addRowTable.getItems()[addedRowIndex].getCells()[2].setEditable(true);
				//	addRowTable.getItems()[addedRowIndex].getCells()[4].setEditable(true);
				} else if(addRowTable.mBindingInfos.items.path.indexOf("comp") > -1) {
                    addRowTable.getItems()[addedRowIndex].getCells()[3].setEditable(true); // qty
					addRowTable.getItems()[addedRowIndex].getCells()[0].setEnabled(true);//oper no
					addRowTable.getItems()[addedRowIndex].getCells()[2].setEditable(true); // desc
				//	addRowTable.getItems()[addedRowIndex].getCells()[6].setEditable(true); //comment
					
					
					var rows = 0;
					for(var j = 0 ; j < addRowTable.getItems().length ; j++)
					{
						if(addRowTable.getItems()[j].getVisible() == true)
						{
							rows = rows+1;
						}
					}
					if(rows == 1)
					{
						//delete oper num from drop down of parts table Defect 223
						var taskTbl = addRowTable.getParent().getContent()[1];
						//var taskModel = taskTbl.getModel().getData()
						var dd = addRowTable.getItems()[0].getCells()[0];//get the drop down column from parts table
						var operDropDownModel = dd.getModel().getData().operDropDown;//get the drop down model
						for(var i = 0 ; i < taskTbl.getItems().length ; i++)
						{
							if(taskTbl.getItems()[i].getVisible() == false)	
							{
								for(var k=0;k<operDropDownModel.length;k++)
								{
									var obj = operDropDownModel[k];//get the drop down model's object
									if(obj.Operation == taskTbl.getItems()[i].getCells()[0].getValue())
									{//check op. no. in drop down model with task op. no.
										operDropDownModel.splice(k,1);//remove op. no. from drop down model
										break;
									}
								}
							}
							
							if(taskTbl.getModel().oData.oper[i].flag == "A")
							{
								var found = false;
								for(var k = 0 ; k < operDropDownModel.length ; k++)
								{
									if(operDropDownModel[k].Operation == taskTbl.getModel().oData.oper[i].Operation)
										found = true;
								}
								if(found == false)
								{
									operDropDownModel.push(taskTbl.getModel().oData.oper[i]);
								}
							}
						}
					
						dd.getModel().refresh();//refresh drop down model
					}
					
					
					
				}
			},
			
			changeTaskOperationNumber : function(oEvent){
				var chval = oEvent.mParameters.newValue;
				oEvent.getSource().setValue(""); //set text value to empty to identifying that this row added last
				if(chval == ""){
					oEvent.getSource().setValue(oEvent.getSource().getDomRefForValueStateMessage().defaultValue);
					pwc.app.js.CommonUtility.validationMessage("Operation Number cannot be empty","Error Message",sap.m.MessageBox.Icon.ERROR);
					var cntrl = oEvent.getSource();
					cntrl.focus();
					return;
				}
				if(isNaN(chval)){
					oEvent.getSource().setValue(oEvent.getSource().getDomRefForValueStateMessage().defaultValue);
					pwc.app.js.CommonUtility.validationMessage(chval + " is an invalid Operation number","Error Message",sap.m.MessageBox.Icon.ERROR);
					var cntrl = oEvent.getSource();
					cntrl.focus();
					return;
				}
				var x=oEvent.getSource().getParent().getParent().getParent().getParent(); //get the engine tab
				var pnls = x.getContent(); //get panels as an array
				for(var i=0;i<pnls.length;i++){
					var p = pnls[i].getContent(); //get content of a panel like textarea, oper table and comp table
					var opertbl = p[1].getItems(); // get rows of operation table only. i.e. in 1st indx
					for(var j=0;j<opertbl.length;j++){
						var row = opertbl[j];
						var flag = row.getModel().getProperty(row.getBindingContextPath()+"/flag");//get the row's model flag attribute value
						if(flag != "D"){ //if flag value is delete then don't consider
							var colmns = row.getCells(); //get columns for each row
							var col = colmns[0].getValue();
							if(col != "" && (parseInt(col) == parseInt(chval))){
								oEvent.getSource().setValue(oEvent.getSource().getDomRefForValueStateMessage().defaultValue);
								pwc.app.js.CommonUtility.validationMessage("Operation Number "+chval+" is already exist.","Error Message",sap.m.MessageBox.Icon.ERROR);
								var cntrl = oEvent.getSource();
								cntrl.focus();
								return;
							}
						}
					}
				}
				var str = ""
				if(parseInt(chval)>=100 && parseInt(chval) <= 999){
					str = "0" + parseInt(chval);
				}
				else if(parseInt(chval)>=1000 && parseInt(chval) <= 9999){
					str = parseInt(chval);
				}
				else{
					str = "00" + parseInt(chval);
				}
				oEvent.getSource().setValue(str);
				
				pwc.app.js.ViewWADetailsUtility.setRevOnEdit(oEvent);
				
			},
			
			
			changePartsOperationNumber : function(oEvent){
				console.log(oEvent.mParameters.value);
				var chval = oEvent.mParameters.newValue;
				var x=oEvent.getSource().getParent().getParent().getParent();
				var y=x.getContent()[1];
				var flag = true;
				var operval = "";
				for(var i=0;i<y.getItems().length;i++){
					var r=y.getItems()[i];
					var o = r.getCells()[0].mProperties.value;
					operval = o;
					if(parseInt(o) == parseInt(chval)){
						flag =false;
						break;
					}
				}
				if(flag){
					oEvent.getSource().setValue(oEvent.getSource().getDomRefForValueStateMessage().defaultValue);
					//user clicks on add button
					if(oEvent.getSource().getDomRefForValueStateMessage().defaultValue == ""){
						oEvent.getSource().setValue(operval);
					}
					var cntrl = oEvent.getSource();
					cntrl.focus();
					pwc.app.js.CommonUtility.validationMessage("Operation Number "+chval+" not found in Task table","Error Message",sap.m.MessageBox.Icon.ERROR);
				}

				//if changed value is correct then keep the old operation number within the model for saving.
				var r = oEvent.getSource(); //get the table row
				var m = r.getModel().getData(); // get the model from trable row
				var indx = r.sId.substring(r.sId.lastIndexOf("-")+1); //get the index value of model from table row
				var rm = m.comp[parseInt(indx)]; //get the model row
				rm.OldPartOperNum = oEvent.getSource().getDomRefForValueStateMessage().defaultValue; //keep an old part's operation number within model
			
			},
			
			/**
			 * Created By Subhayu De Sarkar
			 * 
			 */
			handleOperationComponentEdit : function(oEvent){

				var editRowTable = oEvent.getSource().getParent().getParent();
				var selectedItemsToEdit = editRowTable.getSelectedItems();
				var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
				
				if(selectedItemsToEdit.length == 0) {
					sap.m.MessageBox.alert("Select atleast one row to Edit", {
					    title: "Error Message",
					    icon: sap.m.MessageBox.Icon.ERROR,
					    onClose: null,
					    styleClass: ""
					});
				} else {
					for(var i=0;i<selectedItemsToEdit.length;i++) {
						if(selectedItemsToEdit[i].getModel().getProperty(selectedItemsToEdit[i].getBindingContextPath()+"/flag") == "A") {
							editRowTable.removeSelections();
							sap.m.MessageBox.alert("Item is newly added and already editable", {
							    title: "Warning Message",
							    icon: sap.m.MessageBox.Icon.WARNING,
							    onClose: null,
							    styleClass: ""
							});
						} /*else if(selectedItemsToEdit[i].getModel().getProperty(selectedItemsToEdit[i].getBindingContextPath()+"/flag") == "E") {
							editRowTable.removeSelections();
							sap.m.MessageBox.alert("Item is already editable", {
							    title: "Warning Message",
							    icon: sap.m.MessageBox.Icon.WARNING,
							    onClose: null,
							    styleClass: ""
							});
						}*/ else {
							if(selectedItemsToEdit[i].getBindingContextPath().indexOf("oper") > -1) {
								//selectedItemsToEdit[i].getCells()[0].setEditable(true);
								selectedItemsToEdit[i].getCells()[1].setEditable(true);
								selectedItemsToEdit[i].getCells()[2].setEditable(true);
								selectedItemsToEdit[i].getCells()[4].setEditable(true);
								editRowTable.removeSelections();
								
								selectedItemsToEdit[i].getModel().setProperty(selectedItemsToEdit[i].getBindingContextPath() + "/flag","E");
							} else if(selectedItemsToEdit[i].getBindingContextPath().indexOf("comp") > -1) {
								var rev = selectedItemsToEdit[i].getModel().getProperty(selectedItemsToEdit[i].getBindingContextPath()+"/RevisionNum");
								if(rev != "" && parseInt(rev) <= parseInt(waTopAndHdrModel.getData().RevisionNum)){
									selectedItemsToEdit[i].getCells()[0].setEnabled(true); 
									selectedItemsToEdit[i].getCells()[2].setEditable(true); 
									selectedItemsToEdit[i].getCells()[3].setEditable(false); //qty
									//var x=selectedItemsToEdit[i].getCells()[1].getItems()[1];//search icon
									//x.setVisible(false);
				                }
				                else{
				                	selectedItemsToEdit[i].getCells()[0].setEnabled(true);
									selectedItemsToEdit[i].getCells()[2].setEditable(true);
				                	selectedItemsToEdit[i].getCells()[3].setEditable(true);
				                }
//								selectedItemsToEdit[i].getCells()[4].setEditable(true);
								selectedItemsToEdit[i].getCells()[6].setEditable(true);
								editRowTable.removeSelections();
								
								selectedItemsToEdit[i].getModel().setProperty(selectedItemsToEdit[i].getBindingContextPath() + "/flag","E");
							}
						}
					}
					
					editRowTable.getModel().refresh();
				}
			
			},
			
			/**
			 * Created By Subhayu De Sarkar
			 * This method deletes rows from both Operations and Components table
			 */
			handleOperationComponentDelete : function(oEvent){
				var thisContext = this;
				var deleteRowTable = oEvent.getSource().getParent().getParent();
				var selectedItemsToDelete = deleteRowTable.getSelectedItems();
				if(selectedItemsToDelete.length == 0) {
					sap.m.MessageBox.alert("Select atleast one row to delete", {
					    title: "Error Message",
					    icon: sap.m.MessageBox.Icon.ERROR,
					    onClose: null,
					    styleClass: ""
					});
				} else {
					if(selectedItemsToDelete[0].getBindingContextPath().indexOf("oper") > -1){
						//if last/all operation deleted
						if(deleteRowTable.getItems().length == selectedItemsToDelete.length){
							//only one workscope of an engine. Need to delete engine.
							if(deleteRowTable.getParent().getParent().getContent().length == 1){
								sap.m.MessageBox.confirm("This is the last workscope for this engine. Continue to close sub order?",
										function (oAction) {
										if (sap.m.MessageBox.Action.OK === oAction) {
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
											var engslno = deleteRowTable.getParent().getParent().getText(); //get the engine sl. no.
											var newDelEngPayload = JSON.parse(JSON.stringify(oPayload));
											newDelEngPayload.EngineSl = engslno;
											newDelEngPayload.MainOrder = globalWANo;
											newDelEngPayload.Activity = "DE";
											for(var z=0;z<ttsnarr.length;z++){
												var obj = ttsnarr[z];
												if(obj.EnSlNumber == engslno){
													newDelEngPayload.SubOrder = obj.CsOrderSub;
													break;
												}
											}
											var Z_HDR_ITMN = [];
											Z_HDR_ITMN[Z_HDR_ITMN.length] = newDelEngPayload;
											var postPayload ={
													  "d": {
														    "EngineSl": engslno,
														    "Z_HDR_ITMN": Z_HDR_ITMN
														  }
													};
											pwc.app.js.SaveWAUtility._saveWorkAuthorization(thisContext,false,false,false,true,postPayload);
										}
									}
									);
							}
							else{//not the last workscope of an engine
								sap.m.MessageBox.confirm("This is the last operation for workscope. Workscope & and related parts will be deleted. Do you want to continue",
										function (oAction) {
										if (sap.m.MessageBox.Action.OK === oAction) {
											 var z_ord_crtn = [];
										  	 var oWrkScp = {};
										     oWrkScp.EngineSl = deleteRowTable.getParent().getParent().getText();
										     oWrkScp.MainOrder = globalWANo;
										     oWrkScp.Activity = "RW";
										     oWrkScp.WorkScope = selectedItemsToDelete[0].getModel().getProperty(selectedItemsToDelete[0].getBindingContextPath() + "/WorkScope");
										     z_ord_crtn[z_ord_crtn.length] = oWrkScp;
										     
										     pwc.app.js.WorkScopeUtility.confirmRemoveWS(thisContext,true,z_ord_crtn);
										}
									}
									);
								
							}
						}
						else{//deleted operation is not the last/all operation of workscope
							sap.m.MessageBox.confirm("Confirm deletion of operation and any related parts",
									function (oAction) {
									if (sap.m.MessageBox.Action.OK === oAction) {
										for(var i=0;i<selectedItemsToDelete.length;i++) {
											selectedItemsToDelete[i].getModel().setProperty(selectedItemsToDelete[i].getBindingContextPath() + "/flag","D");
											selectedItemsToDelete[i].setVisible(false);
											selectedItemsToDelete[i].setSelected(false);

											//if operation row deleted then delete its component row as well.
											if(selectedItemsToDelete[i].getBindingContextPath().indexOf("oper") > -1){
												var oper = selectedItemsToDelete[i].getCells()[0].getValue();//get the deleted operation number of task table
												var x=deleteRowTable.getParent().getContent()[2];//get the comp table
												for(var j=0;j<x.getModel().getData().comp.length;j++){//iterate comp table
													var cmodel = x.getModel().getData().comp[j];//get the comp table acutal model
													if(cmodel.Operation == oper){//check operation number of task table and part table
														cmodel.flag = "D"; //if matched then marked parts table row as deleted
														x.getItems()[j].setVisible(false);//also set invisible part table row
													}
												}
												x.getModel().refresh(); //refresh the parts table's model
												
												//delete oper num from drop down of parts table
												if(x.getItems().length > 0){//if parts table has atleast one row
													var dd = x.getItems()[0].getCells()[0];//get the drop down column from parts table
													var operDropDownModel = dd.getModel().getData().operDropDown;//get the drop down model
													for(var k=0;k<operDropDownModel.length;k++){
														var obj = operDropDownModel[k];//get the drop down model's object
														if(obj.Operation == oper){//check op. no. in drop down model with task op. no.
															operDropDownModel.splice(k,1);//remove op. no. from drop down model
															break;
														}
													}
													dd.getModel().refresh();//refresh drop down model
												}
											}
											
										}
										deleteRowTable.getModel().refresh();//refresh the task table model
										
									}
								}
								);
						}
						
						
					}
					else{ //if component delete

						for(var i=0;i<selectedItemsToDelete.length;i++) {
							selectedItemsToDelete[i].getModel().setProperty(selectedItemsToDelete[i].getBindingContextPath() + "/flag","D");
							selectedItemsToDelete[i].setVisible(false);

							//if operation row deleted then delete its component row as well.
							if(selectedItemsToDelete[i].getBindingContextPath().indexOf("oper") > -1){
								var oper = selectedItemsToDelete[i].getCells()[0].getValue();
								var x=deleteRowTable.getParent().getContent()[2];
								for(var j=0;j<x.getModel().getData().comp.length;j++){
									var cmodel = x.getModel().getData().comp[j];
									if(cmodel.Operation == oper){
										cmodel.flag = "D";
										x.getItems()[j].setVisible(false);
									}
								}
								x.getModel().refresh();
							}
						}
						deleteRowTable.getModel().refresh();
						
					
					}
					
					
					
					
				}
			},
			
			/*** Vendor Search START ***/
			/**
			 * Created By Subhayu De Sarkar
			 * Selects the vendor value to the screen
			 */
			handleSelectVendor: function(oEvent) {
				var operationTable = sap.ui.getCore().byId(tempID);
				var operationTableSelectedItems = operationTable.getSelectedItems();
				var oModelOperationTable = operationTable.getModel();
				var vendorSearchResultTable = sap.ui.getCore().byId("idSearchVendorsTable");
				var vendorSearchResultModel = vendorSearchResultTable.getModel();
				var vendorSearchTableSelectedItem = vendorSearchResultTable.getSelectedItem();
				var selectedServiceProvider = vendorSearchTableSelectedItem.getModel().getProperty(vendorSearchTableSelectedItem.getBindingContextPath()).Name1;
				var vendorId = vendorSearchTableSelectedItem.getModel().getProperty(vendorSearchTableSelectedItem.getBindingContextPath()).Kunnr;
				
				 
				var PdcShpfrm;
				var maxRev = 0;
				if(operationTableSelectedItems[0].getBindingContextPath().indexOf("comp") > -1)
				{
					//get the max revision number from table
					var comptable = oModelOperationTable.getData().comp;
					for(var i=0;i<comptable.length;i++){
						var obj = comptable[i];
						if(obj.RevisionNum !="" && parseInt(obj.RevisionNum) && parseInt(obj.RevisionNum) > maxRev){
							maxRev = parseInt(obj.RevisionNum);
						}
					}
					PdcShpfrm= vendorSearchTableSelectedItem.getModel().getProperty(vendorSearchTableSelectedItem.getBindingContextPath()).PdcShpfrm;
				}
				
				
				
				var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
				var hdrRev = waTopAndHdrModel.getData().RevisionNum;
				if(typeof hdrRev != "undefined" && hdrRev != ""){
		        	//hdrRev = (parseInt(hdrRev) + 1).toString(); 
		        }
				
				var oldRev = false;;
				for(var i=0;i<operationTableSelectedItems.length;i++) {
					if(operationTableSelectedItems[i].getModel().getProperty(operationTableSelectedItems[i].getBindingContextPath()+"/flag") != "D"){
						if(operationTableSelectedItems[i].getBindingContextPath().indexOf("comp") > -1)
						{
							var currRev = operationTableSelectedItems[i].getModel().getProperty(operationTableSelectedItems[i].getBindingContextPath()+"/RevisionNum");
							if(waTopAndHdrModel.getData().Status == "DRAFT" || (maxRev >= 0 && currRev == maxRev)){
								oModelOperationTable.setProperty(operationTableSelectedItems[i].getBindingContextPath() + "/ServicePrvd",selectedServiceProvider);
								oModelOperationTable.setProperty(operationTableSelectedItems[i].getBindingContextPath() + "/vendorId",vendorId);
								oModelOperationTable.setProperty(operationTableSelectedItems[i].getBindingContextPath() + "/PdcShpfrm",PdcShpfrm);
								if(operationTableSelectedItems[i].getModel().getProperty(operationTableSelectedItems[i].getBindingContextPath()+"/flag") != "A"){
									operationTableSelectedItems[i].getModel().setProperty(operationTableSelectedItems[i].getBindingContextPath() + "/flag","E");
								}
							}
							else{
								oldRev = true;
							}
						}
						else{ //this is for operation table only
							oModelOperationTable.setProperty(operationTableSelectedItems[i].getBindingContextPath() + "/ServicePrvd",selectedServiceProvider);
							oModelOperationTable.setProperty(operationTableSelectedItems[i].getBindingContextPath() + "/vendorId",vendorId);
							if(operationTableSelectedItems[i].getModel().getProperty(operationTableSelectedItems[i].getBindingContextPath()+"/flag") != "A"){
								operationTableSelectedItems[i].getModel().setProperty(operationTableSelectedItems[i].getBindingContextPath() + "/flag","E");
							}
						}
					}
				}
				if(oldRev){
					pwc.app.js.CommonUtility.validationMessage("Line item for old revision cannot be changed","Error Message",sap.m.MessageBox.Icon.ERROR);	
				}
				operationTable.removeSelections();
				operationTable.getModel().refresh();
				this._searchVendorDialog.close();
			},
			
			/**
			 * Created By Subhayu De Sarkar
			 * Populates the Search Vendor Popup
			 */
			loadSearchVendorDialog: function(oEvent) {
				
				var that = this;
				var operationTable = oEvent.getSource().getParent().getParent().getParent();
				tempID = operationTable.getId();
				var selectedRows = operationTable.getSelectedItems();
				
				if(selectedRows.length == 0) {
					sap.m.MessageBox.alert("Select at least one row from Operation table", {
					    title: "Error Message",
					    icon: sap.m.MessageBox.Icon.ERROR,
					    onClose: null,
					    styleClass: ""
					});
				} else {
					if (!this._searchVendorDialog) {
				      this._searchVendorDialog = sap.ui.xmlfragment("pwc.app.fragment.searchVendorDialog", this);
				      this._searchVendorDialog.setEndButton(new sap.m.Button({text:'Cancel',press: function () {that._searchVendorDialog.close();}}));
				      this.getView().addDependent(this._searchVendorDialog);
				    }
			
				    // toggle compact style
				    jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._searchVendorDialog);
				    
				    
				    var OprtnNums = selectedRows[0].getModel().getProperty(selectedRows[0].getBindingContextPath()+"/Operation")
				    for(var i = 1 ; i < selectedRows.length ; i ++)
				    {
				    	//OprtnNums = OprtnNums + " , ";
				    	
				    	if( selectedRows[i].getModel().getProperty(selectedRows[i].getBindingContextPath()+"/Operation") !=  selectedRows[i-1].getModel().getProperty(selectedRows[i-1].getBindingContextPath()+"/Operation"))
				    			OprtnNums = OprtnNums + " , " + selectedRows[i].getModel().getProperty(selectedRows[i].getBindingContextPath()+"/Operation");
				    		
				    }
				    sap.ui.getCore().byId("OprtnNumLbl").setVisible(true);
				    sap.ui.getCore().byId("SelOprtnNums").setVisible(true);
				    sap.ui.getCore().byId("SelOprtnNums").setText(OprtnNums);
				    
				    
				    this._searchVendorDialog.open();
				}
			},
			
			/**
			 * Created By Subhayu De Sarkar
			 * Search Vendor service call
			 */
			searchVendors: function(oEvent){
				var oModel = sap.ui.getCore().getModel("waModel");
				var vendorName = sap.ui.getCore().byId("vendorNameSearch");
				var vendorCity = sap.ui.getCore().byId("vendorCitySearch");
				
				if(vendorName.getValue() == "" && vendorCity.getValue() == "") {
					sap.m.MessageBox.alert("Enter either Vendor Name and/or Vendor City", {
					    title: "Error Message",
					    icon: sap.m.MessageBox.Icon.ERROR,
					    onClose: null,
					    styleClass: ""
					});
				} else {
					//sap.ui.getCore().byId("vendorSearchError").setVisible(false);
					var vendorSearchFilter = [];
					vendorSearchFilter.push(new sap.ui.model.Filter("ImName", sap.ui.model.FilterOperator.EQ, vendorName.getValue()));
					vendorSearchFilter.push(new sap.ui.model.Filter("ImCity", sap.ui.model.FilterOperator.EQ, vendorCity.getValue()));
					
//					var searchParameters = {
//						filters : vendorSearchFilter,
//				        urlParameters:{},
//				        success : function(oData) {
//				        	jQuery.sap.log.info("Odata Read Successfully:::");
//				        	console.log(oData);
					var oData=  {
								  "results": [{
									  "__metadata": {
										  "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_SEARCH_SRVPRVDSet('0000012271')",
										  "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_SEARCH_SRVPRVDSet('0000012271')",
										  "type": "Z_ESP_GW_SERVICE_SRV.ZZ_SEARCH_SRVPRVD"
									  },
									  "ImCity": "",
									  "ImName": "",
									  "Kunnr": "0000012271",
									  "Name1": "Dallas Airmotive",
									  "Ort01": "Orlando",
									  "PdcShpfrm": ""
								  }, {
									  "__metadata": {
										  "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_SEARCH_SRVPRVDSet('0000010410')",
										  "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_SEARCH_SRVPRVDSet('0000010410')",
										  "type": "Z_ESP_GW_SERVICE_SRV.ZZ_SEARCH_SRVPRVD"
									  },
									  "ImCity": "",
									  "ImName": "",
									  "Kunnr": "0000010410",
									  "Name1": "Dallas Airmotive",
									  "Ort01": "Orlando SPLIT",
									  "PdcShpfrm": ""
								  }]
							  };
						  
				        	var vendorSearchResultJSONModel = new sap.ui.model.json.JSONModel(oData);
				        	sap.ui.getCore().byId("idSearchVendorsTable").setModel(vendorSearchResultJSONModel);
				        }
					
//					if(oModel) {
//						oModel.read("/ZZ_SEARCH_SRVPRVDSet",searchParameters);
//				    }
				},

			/**
			 * Created By Subhayu De Sarkar
			 * Closes the search dialog
			 */
			handleCancelVendorSearch: function(oEvent) {
				sap.ui.getCore().byId("vendorSearchError").setVisible(false);
				this._searchVendorDialog.close();
			},
			/*** Vendor Search End ***/

			/*** Vendor Search End ***/
			
			/*** Parts Search Start ***/
			/**
			 * Created By Subhayu De Sarkar
			 * Populates the Parts Vendor Popup
			 */
			loadSearchPartsDialog: function(oEvent) {
				var that = this;
				var partsTable = oEvent.getSource().getParent().getParent().getParent();
				selectedTableRowItem = oEvent.getSource().getParent().getParent();
				tempID = partsTable.getId();
				
				if (!this._searchPartsDialog) {
			      this._searchPartsDialog = sap.ui.xmlfragment("pwc.app.fragment.searchPartsDialog", this);
			      this._searchPartsDialog.setEndButton(new sap.m.Button({text:'Cancel',press: function () {that._searchPartsDialog.close();}}));
			      this.getView().addDependent(this._searchPartsDialog);
			    }
		
			    // toggle compact style
			    jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._searchPartsDialog);
			    this._searchPartsDialog.open();
			},

			/**
			 * Created By Subhayu De Sarkar
			 * Parts Search from Backend
			 */
			searchPart: function(oEvent) {
				var oModel = sap.ui.getCore().getModel("waModel");
				var partNumber = sap.ui.getCore().byId("partNoSearch");
				var partName = sap.ui.getCore().byId("partNameSearch");
				
				if(partNumber.getValue() == "" && partName.getValue() == "") {
					sap.m.MessageBox.alert("Enter either Part Number and/or Part Name", {
					    title: "Error Message",
					    icon: sap.m.MessageBox.Icon.ERROR,
					    onClose: null,
					    styleClass: ""
					});
				} else {
					var partsSearchFilter = [];
					partsSearchFilter.push(new sap.ui.model.Filter("ImPartNo", sap.ui.model.FilterOperator.EQ, partNumber.getValue()));
					partsSearchFilter.push(new sap.ui.model.Filter("ImPartName", sap.ui.model.FilterOperator.EQ, partName.getValue()));
					
//					var searchParameters = {
//						filters : partsSearchFilter,
//				        urlParameters:{},
//				        success : function(oData) {
//				        	jQuery.sap.log.info("Odata Read Successfully:::");
//				        	console.log(oData);
						var	oData={
									"results": [{
										"__metadata": {
											"id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_PART_SEARCHSet('100040')",
											"uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_PART_SEARCHSet('100040')",
											"type": "Z_ESP_GW_SERVICE_SRV.ZZ_PART_SEARCH"
										},
										"ImPartName": "",
										"ImPartNo": "",
										"Partno": "100040",
										"PartName": "100040",
										"PartDesc": "100040"
									}]

								};
				        	var partsSearchResultJSONModel = new sap.ui.model.json.JSONModel(oData);
				        	sap.ui.getCore().byId("idSearchPartsTable").setModel(partsSearchResultJSONModel);
//				        }.bind(this),
//				        error: function (oError) {
//				        	jQuery.sap.log.info("Odata Error occured");
//				        }.bind(this)
//					};
					
					if(oModel) {
						oModel.read("/ZZ_PART_SEARCHSet",searchParameters);
				    }
				}
			},

			/**
			 * Created By Subhayu De Sarkar
			 * Selects the Parts value to the screen
			 */
			handleSelectPart: function(oEvent) {
				var partsTable = sap.ui.getCore().byId(tempID);
				var oModelPartsTable = partsTable.getModel();
				var partsSearchResultTable = sap.ui.getCore().byId("idSearchPartsTable");
				var partsSearchResultModel = partsSearchResultTable.getModel();
				var partsSearchTableSelectedItem = partsSearchResultTable.getSelectedItem();
				
				console.log(partsSearchTableSelectedItem.getModel().getProperty(partsSearchTableSelectedItem.getBindingContextPath()).Partno);
				var selectedPartNumber = partsSearchTableSelectedItem.getModel().getProperty(partsSearchTableSelectedItem.getBindingContextPath()).Partno;
				var PartDesc = partsSearchTableSelectedItem.getModel().getProperty(partsSearchTableSelectedItem.getBindingContextPath()).PartDesc;
				
				oModelPartsTable.setProperty(selectedTableRowItem.getBindingContextPath() + "/PartNumber",selectedPartNumber);
				oModelPartsTable.setProperty(selectedTableRowItem.getBindingContextPath() + "/PartDesc",PartDesc);
				partsTable.getModel().refresh();
				
				this._searchPartsDialog.close();

				var flag = oModelPartsTable.getProperty(selectedTableRowItem.getBindingContextPath() + "/flag");
				if(flag !="A" && flag != "E"){
					oModelPartsTable.setProperty(selectedTableRowItem.getBindingContextPath() + "/flag","E");
				}
				
				var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
				
				//var hdrRev = waTopAndHdrModel.getData().RevisionNum;
				//if(typeof hdrRev != "undefined" && hdrRev != ""){
		        //	//hdrRev = (parseInt(hdrRev) + 1).toString(); 
		        //	//oModelPartsTable.setProperty(selectedTableRowItem.getBindingContextPath() + "/RevisionNum",hdrRev);
				// 
		        //}
				
			
			},
			
			/**
			 * Created By Subhayu De Sarkar
			 * Closes the parts dialog
			 */
			handleCancelPartSearch: function(oEvent) {
				sap.ui.getCore().byId("partsSearchError").setVisible(false);
				this._searchPartsDialog.close();
			},
			/*** Parts Search End ***/
			/*** Engine, Operation & Component Events - END ***/
			
			/*** Work Scope Events - START ***/
			handleCopyWS:function (oEvent){
				pwc.app.js.WorkScopeUtility.copyWS(oEvent,this);
			},
			
			/**
			 * Called from ADD WS Button in Detail Screen
			 */
			handleAddWS: function(oEvent) {
				pwc.app.js.WorkScopeUtility._getWorkTypes(this);
			},
			
			handleAddWrkScope : function(){
				pwc.app.js.WorkScopeUtility._handleAddWrkScope(this);
			},
			/**
			 * This method is called when user clicks on the REMOVE WORKSCOPE button
			 */
			handleRemoveWS: function(oEvent) {
				
				pwc.app.js.WorkScopeUtility.removeWorkScope(this);
			},
			/*** Work Scope Events - END ***/
			
			/*** Work Authorization Events - START ***/
			/**
			 * Called from SAVE Button in Details Page
			 */
			handleSaveWorkAuthorization: function(that,isApproved,isReject,isAddWS){
				pwc.app.js.SaveWAUtility._saveWorkAuthorization(this,false,false,false,false,"");
			},
		
		/**
		 * Called when APPROVE button clicked from Details Page
		 */
		handleApproveWS: function(oEvent) {
			pwc.app.js.ApproveWAUtility._approveAndSaveWA(this,oEvent);
		},
		
		/*** Confirmation message before Reject***/
		handleRejectWS: function(oEvent,that) {
			pwc.app.js.RejectWAUtility._rejectAndSaveWA(this);
		},
		/*** Work Authorization Events - END ***/
		
		
		handleTabs : function(oEvent){
			engineTabOpened = sap.ui.getCore().byId(oEvent.getSource().getSelectedKey()).getText()
		}
		
	});
		
	return oController; 	
});

var waNoFromMaster = "";
var tempID = "";
var selectedTableRowItem = null;