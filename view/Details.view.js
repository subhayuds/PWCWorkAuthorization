jQuery.sap.includeStyleSheet("css/detailsPageStyle.css","detailsPageStyle");
jQuery.sap.require("pwc.app.util.Formatter");

sap.ui.jsview("pwc.app.view.Details", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.Details
	*/ 
	getControllerName : function() {
		return "pwc.app.controller.Details";
	},

	
	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.Details
	*/ 
	createContent : function(oController) {
		var detailsPage = new sap.m.Page();
		
		detailsPage.setShowHeader(true);
		detailsPage.setShowFooter(true);
		var toolbarSpacer = new sap.m.ToolbarSpacer();
		
		this._addTopHeader(detailsPage,toolbarSpacer,oController);
		
		
		this._addHeaderDtls(detailsPage);
		
		
		/*** Icon Toolbar ***/
		var tabBar = new sap.m.IconTabBar({
			id : "idIconTabBar", // sap.ui.core.ID
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			fieldGroupIds : [], // string[], since 1.31
			showSelection : true, // boolean
			expandable : true, // boolean, since 1.15.0
			expanded : true, // boolean, since 1.15.0
			selectedKey : undefined, // string, since 1.15.0
			upperCase : false, // boolean, since 1.22
			stretchContentHeight : false, // boolean, since 1.26
			applyContentPadding : true, // boolean, since 1.26
			backgroundDesign : sap.m.BackgroundDesign.Solid, // sap.m.BackgroundDesign, since 1.26
			headerMode : sap.m.IconTabHeaderMode.Standard, // sap.m.IconTabHeaderMode, since 1.40
		});
		
		var oIconTabFilter = new sap.m.IconTabFilter({
			id : "idIconTabFilter_0", // sap.ui.core.ID
			//text : "{engDtl>/SerialNumber}", // string
			text : "{ttsn>/results/}", // string
			enabled : true, // boolean
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
			key : undefined, // string
			count : "", // string
			showAll : false, // boolean
			icon : "", // sap.ui.core.URI
			iconColor : sap.ui.core.IconColor.Default, // sap.ui.core.IconColor
			iconDensityAware : true, // boolean
			visible : true, // boolean
			design : sap.m.IconTabFilterDesign.Vertical, // sap.m.IconTabFilterDesign
			height : "100px"
		});


		detailsPage.addContent(tabBar);
		
		footerToolBar = this._addFooter(toolbarSpacer,oController); //add footer
		
		//detailsPage.setFloatingFooter(false);
		detailsPage.setFooter(footerToolBar);
		
		
 		return detailsPage;
	},
	
	//Top header -----------
	_addTopHeader : function(detailsPage,toolbarSpacer,oController){
		var detailsHeaderToolBar = new sap.m.Toolbar({
			id : "idDetailsHeaderToolBar", // sap.ui.core.ID
			width : "100%", // sap.ui.core.CSSSize
			active : false, // boolean
			enabled : true,// boolean
			height : "5rem"
		});
		detailsPage.setCustomHeader(detailsHeaderToolBar);
		
		var detailsHeaderContainer = new sap.suite.ui.commons.HeaderContainer({
			id : "idDetailsContainer", // sap.ui.core.ID
			visible : true, // boolean
			scrollStep : 200, // int
			scrollTime : 500, // int
			showDividers : false, // boolean, since 1.25
			view : sap.suite.ui.commons.HeaderContainerView.Horizontal, // sap.suite.ui.commons.HeaderContainerView, since 1.25
			backgroundDesign : sap.m.BackgroundDesign.Transparent, // sap.m.BackgroundDesign, since 1.38
		});
		detailsHeaderContainer.addStyleClass("sapUiSmallMarginBegin");
		detailsHeaderToolBar.addContent(detailsHeaderContainer);
		
		
		
		/**** Header Cell 1 ****/
		
		var detailsHeaderCellItemContent = new sap.m.Label({
			id:"waNo",
			text : "WA {waTopAndHdrModel>/WoNumber}({waTopAndHdrModel>/Status})", // string
			design : sap.m.LabelDesign.Bold, // sap.m.LabelDesign
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection	
		});
		
		detailsHeaderCellItemContent.addStyleClass("blabel");
		
		var detailsHeaderCellItemNorth = new sap.suite.ui.commons.HeaderCellItem({
			height : "30%", // sap.ui.core.CSSSize
			content : [detailsHeaderCellItemContent]
		});
		
		
		var caseHBox = new sap.m.HBox();
		caseHBox.addItem(new sap.m.Label({
			visible : true, // boolean
			design : sap.m.LabelDesign.Standard, // sap.m.LabelDesign
			text : "CRM number: ", // string
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
		}));
		caseHBox.addItem(new sap.m.Label({
			visible : true, // boolean
			design : sap.m.LabelDesign.Bold, // sap.m.LabelDesign
			text : "{waTopAndHdrModel>/CrmDoc}", // string
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
		}));
		
		
		
		var detailsHeaderCellItemSouth = new sap.suite.ui.commons.HeaderCellItem({
			height : "30%", // sap.ui.core.CSSSize
			content : [caseHBox]
		});
		
		var detailsHeaderCell = new sap.suite.ui.commons.HeaderCell({
			north : detailsHeaderCellItemNorth, // sap.suite.ui.commons.HeaderCellItem
			south : detailsHeaderCellItemSouth, // sap.suite.ui.commons.HeaderCellItem
		});
		
		detailsHeaderContainer.addItem(detailsHeaderCell);
		
		/**** Header Cell 2 ****/
		
		var RequesterLbl = new sap.m.Label({
			visible : true, // boolean
			design : sap.m.LabelDesign.Standard, // sap.m.LabelDesign
			text : "Requester: ", // string
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
		});
		
		detailsHeaderCellItemContent = new sap.m.Label({
			text : "{waTopAndHdrModel>/Requester}", // string
			visible : true, // boolean
			design : sap.m.LabelDesign.Bold, // sap.m.LabelDesign
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
		});
		
		
		var reqHBox = new sap.m.HBox();
		reqHBox.addItem(RequesterLbl);
		reqHBox.addItem(detailsHeaderCellItemContent);
		
		detailsHeaderCellItemNorth = new sap.suite.ui.commons.HeaderCellItem({
			height : "30%", // sap.ui.core.CSSSize
			content : [reqHBox]
		});
		
		
		
	
		var CustomerLbl = new sap.m.Label({
			visible : true, // boolean
			design : sap.m.LabelDesign.Standard, // sap.m.LabelDesign
			text : "Customer: ", // string
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
		});
		
		
		detailsHeaderCellItemContent = new sap.m.Label({
			text : "{waTopAndHdrModel>/Customer}", // string
			visible : true, // boolean
			design : sap.m.LabelDesign.Bold, // sap.m.LabelDesign
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
		});
		
		
		var custHBox = new sap.m.HBox();
		custHBox.addItem(CustomerLbl);
		custHBox.addItem(detailsHeaderCellItemContent);
		
		detailsHeaderCellItemSouth = new sap.suite.ui.commons.HeaderCellItem({
			height : "30%", // sap.ui.core.CSSSize
			content : [custHBox]
		});
				
		detailsHeaderCell = new sap.suite.ui.commons.HeaderCell({
			north : detailsHeaderCellItemNorth, // sap.suite.ui.commons.HeaderCellItem
			south : detailsHeaderCellItemSouth, // sap.suite.ui.commons.HeaderCellItem
		});
		
		detailsHeaderContainer.addItem(detailsHeaderCell);
		
		/**** Header Cell 3 ****/
		
		

		var createdbyHBox = new sap.m.HBox();
		createdbyHBox.addItem(new sap.m.Label({
			visible : true, // boolean
			design : sap.m.LabelDesign.Standard, // sap.m.LabelDesign
			text : "Created by: ", // string
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
		}));
		createdbyHBox.addItem(new sap.m.Label({
			visible : true, // boolean
			design : sap.m.LabelDesign.Bold, // sap.m.LabelDesign
			text : "{waTopAndHdrModel>/CreatedBy}", // string
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
		}));
		
		
		detailsHeaderCellItemNorth = new sap.suite.ui.commons.HeaderCellItem({
			height : "30%", // sap.ui.core.CSSSize
			content : [createdbyHBox]
		});
		
		var createdDtHBox = new sap.m.HBox();
		createdDtHBox.addItem(new sap.m.Label({
			visible : true, // boolean
			design : sap.m.LabelDesign.Standard, // sap.m.LabelDesign
			text : "Created date: ", // string
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
		}));
		createdDtHBox.addItem(new sap.m.Label({
			visible : true, // boolean
			design : sap.m.LabelDesign.Bold, // sap.m.LabelDesign
			/*Date concversion change by Mriganka End*/
			text :"{path: 'waTopAndHdrModel>/Erdat',formatter: 'pwc.app.util.Formatter._convDate'}",
			/*Date concversion change by Mriganka End*/
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
		}));
		
		
		
		detailsHeaderCellItemSouth = new sap.suite.ui.commons.HeaderCellItem({
			height : "30%", // sap.ui.core.CSSSize
			content : [createdDtHBox]
		});
				
		detailsHeaderCell = new sap.suite.ui.commons.HeaderCell({
			north : detailsHeaderCellItemNorth, // sap.suite.ui.commons.HeaderCellItem
			south : detailsHeaderCellItemSouth, // sap.suite.ui.commons.HeaderCellItem
		});
		
		detailsHeaderContainer.addItem(detailsHeaderCell);
		
		/**** Header Cell 4 ****/
		
		
		//var checkHBox = new sap.m.CheckBox({id:"aogID", text: "AOG", checked: "{waTopAndHdrModel>/Aog}"});
//		checkHBox.addStyleClass("AOGLabel");
		
		var checkHBox = new sap.ui.commons.CheckBox({
		    id : "aogID",
			text: "AOG",
		    checked: "{waTopAndHdrModel>/Aog}"
		})
			
		detailsHeaderCellItemContent = new sap.m.Label({text: "Rev. 99"});

		
		detailsHeaderCellItemNorth = new sap.suite.ui.commons.HeaderCellItem({
			height : "30%", // sap.ui.core.CSSSize
			content : [checkHBox]
		});
		
		detailsHeaderCellItemSouth = new sap.suite.ui.commons.HeaderCellItem({
			height : "30%", // sap.ui.core.CSSSize
			content : [detailsHeaderCellItemContent]
		});
		
		detailsHeaderCell = new sap.suite.ui.commons.HeaderCell({
			north : detailsHeaderCellItemNorth, // sap.suite.ui.commons.HeaderCellItem
			//south: detailsHeaderCellItemSouth
		});
		
		detailsHeaderContainer.addItem(detailsHeaderCell);
		
		/**** Header Cell 5 ****/
		detailsHeaderCellItemContent = new sap.ui.core.Icon({
			src : "sap-icon://shipping-status", // sap.ui.core.URI
			size : "1.5rem", // sap.ui.core.CSSSize
			color : "#2A2727", // string
			width : "2.2rem", // sap.ui.core.CSSSize
			height : "2.2rem", // sap.ui.core.CSSSize
//			backgroundColor : "#FFCC33", // string
			decorative : true, // boolean, since 1.16.4
			useIconTooltip : true, // boolean, since 1.30.0
			alt : "Shipping Information", // string, since 1.30.0
			noTabStop : false, // boolean, since 1.30.1
			tooltip : "Shipping Information", // sap.ui.core.TooltipBase
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.handleShippingInfoPopoverPress(oEvent);
			}, this ]
		});
		//detailsHeaderCellItemContent.addStyleClass("headerIconStyle");
		
		detailsHeaderCellItemNorth = new sap.suite.ui.commons.HeaderCellItem({
			height : "100%", // sap.ui.core.CSSSize
			content : [detailsHeaderCellItemContent]
		});
		
		detailsHeaderCell = new sap.suite.ui.commons.HeaderCell({
			west : detailsHeaderCellItemNorth, // sap.suite.ui.commons.HeaderCellItem
		});
		
		detailsHeaderContainer.addItem(detailsHeaderCell);
		
		
		
		
		/**** Header Cell 9 ****/
		detailsHeaderCellItemContent = new sap.ui.core.Icon({
			src : "sap-icon://customer-and-contacts", // sap.ui.core.URI
			size : "1.5rem", // sap.ui.core.CSSSize
			color : "#2A2727", // string
			width : "2.2rem", // sap.ui.core.CSSSize
			height : "2.2rem", // sap.ui.core.CSSSize
//			backgroundColor : "#FFCC33", // string
			decorative : true, // boolean, since 1.16.4
			useIconTooltip : true, // boolean, since 1.30.0
			alt : "Contact Us", // string, since 1.30.0
			noTabStop : false, // boolean, since 1.30.1
			tooltip : "Contact Us", // sap.ui.core.TooltipBase
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.handleContactUsPopoverPress(oEvent);
			}, this ]
		});
		//detailsHeaderCellItemContent.addStyleClass("headerIconStyle");
		
		detailsHeaderCellItemNorth = new sap.suite.ui.commons.HeaderCellItem({
			height : "100%", // sap.ui.core.CSSSize
			content : [detailsHeaderCellItemContent]
		});
		
		detailsHeaderCell = new sap.suite.ui.commons.HeaderCell({
			west : detailsHeaderCellItemNorth, // sap.suite.ui.commons.HeaderCellItem
		});
		
		detailsHeaderContainer.addItem(detailsHeaderCell);
		
		
		/**** Header Cell 8 ****/
		var messageToolbar = new sap.m.Toolbar({id:"idMsgToolbar"});
		var messageCountHBox = new sap.m.HBox();
		//messageCountHBox.addStyleClass("msgCountHBox");
		var messageCount = new sap.m.Label({
			id : "idMessageCount", // sap.ui.core.ID
			design : sap.m.LabelDesign.Standard, // sap.m.LabelDesign
			text : "05", // string
			textAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
			width : "", // sap.ui.core.CSSSize
			required : false, // boolean
			tooltip : "Message Count", // sap.ui.core.TooltipBase
		});
		messageCountHBox.addItem(messageCount);
		detailsHeaderCellItemContent = new sap.ui.core.Icon({
			src : "sap-icon://comment", // sap.ui.core.URI
			size : "1.5rem", // sap.ui.core.CSSSize
			color : "#2A2727", // string
			hoverColor : undefined, // string
			activeColor : undefined, // string
			width : "2.2rem", // sap.ui.core.CSSSize
			height : "2.2rem", // sap.ui.core.CSSSize
//			backgroundColor : "#FFCC33", // string
			decorative : true, // boolean, since 1.16.4
			useIconTooltip : true, // boolean, since 1.30.0
			alt : "Comments", // string, since 1.30.0
			noTabStop : false, // boolean, since 1.30.1
			tooltip : "Comments", // sap.ui.core.TooltipBase
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.handleCommentsPopoverPress(oEvent);
			}, this ]
		});
		//detailsHeaderCellItemContent.addStyleClass("headerIconStyle");
		
		messageToolbar.addContent(detailsHeaderCellItemContent);
		messageToolbar.addContent(messageCountHBox);
		detailsHeaderCellItemNorth = new sap.suite.ui.commons.HeaderCellItem({
			content : [messageToolbar]
		});
		
		detailsHeaderCell = new sap.suite.ui.commons.HeaderCell({
			id : "idMessageCell",
			west : detailsHeaderCellItemNorth // sap.suite.ui.commons.HeaderCellItem
		});
		
		detailsHeaderContainer.addItem(detailsHeaderCell);
		
		
		
/**** Header Cell 12  view pdf ****/
		
		
		
		detailsHeaderCellItemContent = new sap.ui.core.Icon({
			src : "sap-icon://print", // sap.ui.core.URI
			size : "1.5rem", // sap.ui.core.CSSSize
			color : "#2A2727", // string
			width : "2.2rem", // sap.ui.core.CSSSize
			height : "2.2rem", // sap.ui.core.CSSSize
//			backgroundColor : "#FFCC33", // string
			decorative : true, // boolean, since 1.16.4
			useIconTooltip : true, // boolean, since 1.30.0
			alt : "Print", // string, since 1.30.0
			noTabStop : false, // boolean, since 1.30.1
			tooltip : "Shipping Information", // sap.ui.core.TooltipBase
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.handlePrint(oEvent);
			}, this ]
		});
		
		
		
		detailsHeaderCellItemNorth = new sap.suite.ui.commons.HeaderCellItem({
			content : [detailsHeaderCellItemContent]
		});
		
		/**** view pdf end ****/
		
		
		
		detailsHeaderCell = new sap.suite.ui.commons.HeaderCell({
			west : detailsHeaderCellItemNorth, // sap.suite.ui.commons.HeaderCellItem
		});
		
		detailsHeaderContainer.addItem(detailsHeaderCell);

	},
	
	
	//Header details including TTSN and COMPANY details-----------------
	_addHeaderDtls : function(detailsPage){
	/*	var obj =sap.ui.getCore().byId("hdrDtlPnl");
		if(typeof obj != "undefined"){
			detailPage.removeContent(obj);	
		}*/
		var wsPanel = new sap.m.Panel({
			id: "hdrDtlPnl",
			width : "100%", // sap.ui.core.CSSSize
			//height : "400px", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : true, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			backgroundDesign : sap.m.BackgroundDesign.Translucent, // sap.m.BackgroundDesign, since 1.30
		});
		
		var wsPanelToolBar = new sap.m.Toolbar();
		wsPanelToolBar.addContent(new sap.m.Title({
			text : "Header Details",
			tooltip : "Header Details"	
		}));
		wsPanel.setHeaderToolbar(wsPanelToolBar);

		
		var headerDetailsRow1 = new sap.m.HBox();
		
		
		
		var headerCell1VBox = new sap.m.VBox({id:"headerCell1VBox"});
		var headerCell1R1HBox = new sap.m.HBox();
		headerCell1R1HBox.addItem(new sap.m.Label({text:"ESP No:",width:'120px'}));
		headerCell1R1HBox.addItem(new sap.m.Label({text:"{waTopAndHdrModel>/EspContract}",design: sap.m.LabelDesign.Bold,width:'150px'}));
		headerCell1R1HBox.addItem(new sap.m.Image({
			src : "mime/SearchIcon.png", // sap.ui.core.URI
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.espNoSearch(oEvent);
			}, this ]
		}));
		
		var headerCell1R2HBox = new sap.m.HBox();
		headerCell1R2HBox.addItem(new sap.m.Label({text:"Plan Type:",width:'120px'}));
		headerCell1R2HBox.addItem(new sap.m.Label({text:"{waTopAndHdrModel>/EspPlantype}",design: sap.m.LabelDesign.Bold}));
		var headerCell1R3HBox = new sap.m.HBox();
		headerCell1R3HBox.addItem(new sap.m.Label({text:"1st Run Warranty:",width:'120px'}));
		headerCell1R3HBox.addItem(new sap.m.Label({text:"{waTopAndHdrModel>/FirstRunwr}",design: sap.m.LabelDesign.Bold}));
		var headerCell1R4HBox = new sap.m.HBox();
		headerCell1R4HBox.addItem(new sap.m.Label({text:"Status:",width:'120px'}));
		headerCell1R4HBox.addItem(new sap.m.Label({text:"{waTopAndHdrModel>/AcountStatus}",design: sap.m.LabelDesign.Bold,width:'150px'}));
		headerCell1R4HBox.addItem(new sap.m.Image({
			src : "mime/Esclamation.png", // sap.ui.core.URI
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.statusNotification(oEvent);
			}, this ]
		}));

		var headerCell1R5HBox = new sap.m.HBox();
		headerCell1R5HBox.addItem(new sap.m.Label({text:"Deferal Status:",width:'120px'}));
		headerCell1R5HBox.addItem(new sap.m.Label({text:"{waTopAndHdrModel>/DeferalStatus}",design: sap.m.LabelDesign.Bold,width:'150px'}));
		headerCell1R5HBox.addItem(new sap.m.Image({
			src : "mime/Esclamation.png", // sap.ui.core.URI
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.deferalStatusNotification(oEvent);
			}, this ]
		}));
		
		var headerCell1R6HBox = new sap.m.HBox();
		headerCell1R6HBox.addItem(new sap.m.Label({text:"Ref WA:",width:'120px'}));
		headerCell1R6HBox.addItem(new sap.m.Input({id:"refWAID", value:"{waTopAndHdrModel>/RefWoNumber}",width:'120px'}));
		headerCell1VBox.addItem(headerCell1R1HBox);
		headerCell1VBox.addItem(headerCell1R2HBox);
		headerCell1VBox.addItem(headerCell1R3HBox);
		headerCell1VBox.addItem(headerCell1R4HBox);
		headerCell1VBox.addItem(headerCell1R5HBox);
		headerCell1VBox.addItem(headerCell1R6HBox);
		
		
		var headerCell2VBox = new sap.m.VBox({id:"headerCell2VBox"});
		var headerCell2R1HBox = new sap.m.HBox();
		headerCell2R1HBox.addItem(new sap.m.Label({text:"Tail No:",width:'110px'}));
		headerCell2R1HBox.addItem(new sap.m.Label({text:"{waTopAndHdrModel>/TailNumber}",design: sap.m.LabelDesign.Bold}));
		var headerCell2R2HBox = new sap.m.HBox();
		headerCell2R2HBox.addItem(new sap.m.Label({text:"A/C model:",width:'110px'}));
		headerCell2R2HBox.addItem(new sap.m.Label({text:"{waTopAndHdrModel>/AcModelNumber}",design: sap.m.LabelDesign.Bold}));
		var headerCell2R3HBox = new sap.m.HBox();
		headerCell2R3HBox.addItem(new sap.m.Label({text:"A/C Serial No:",width:'110px'}));
		headerCell2R3HBox.addItem(new sap.m.Label({text:"{waTopAndHdrModel>/SerialNumber}",design: sap.m.LabelDesign.Bold}));
		var headerCell2R4HBox = new sap.m.HBox();
		headerCell2R4HBox.addItem(new sap.m.Label({text:"Engine Model:",width:'110px'}));
		headerCell2R4HBox.addItem(new sap.m.Label({text:"{waTopAndHdrModel>/EngModel}",design: sap.m.LabelDesign.Bold}));
		var headerCell2R5HBox = new sap.m.HBox();
		headerCell2R5HBox.addItem(new sap.m.Label({text:"Event date:",width:'110px'}));
		/*Date concversion change by Mriganka Start*/
		headerCell2R5HBox.addItem(new sap.m.Label({text :"{path: 'waTopAndHdrModel>/EventDate',formatter: 'pwc.app.util.Formatter._convDate'}"}));
		/*Date concversion change by Mriganka End*/
		var headerCell2R6HBox = new sap.m.HBox();
		headerCell2R6HBox.addItem(new sap.m.Label({text:"Last TTSN Date:",width:'110px'}));
		headerCell2R6HBox.addItem(new sap.m.Label({text:"{waTopAndHdrModel>/LastReported}",design: sap.m.LabelDesign.Bold}));
		headerCell2VBox.addItem(headerCell2R1HBox);
		headerCell2VBox.addItem(headerCell2R2HBox);
		headerCell2VBox.addItem(headerCell2R3HBox);
		headerCell2VBox.addItem(headerCell2R4HBox);
		headerCell2VBox.addItem(headerCell2R5HBox);
		headerCell2VBox.addItem(headerCell2R6HBox);
		

		//ttsn table
		var oTable = new sap.ui.table.Table({
			id:"ttsnID",
			width:"400px"
			
		});
		
		var oColumn = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: ""}),
			template: new sap.m.Label({text:'{ttsn>EnSlNumber}'}),
			width:"100px"
		});

		oTable.addColumn(oColumn);
		
		var oColumn = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Reported TTSN"}),
			template: new sap.m.Label({text:'{ttsn>LastReTtsn}'}),
			width:"150px"
		});
		
		oTable.addColumn(oColumn);
		
		oColumn = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Actual TTSN"}),
			template: new sap.m.Input({value:'{ttsn>EventReTtsn}'}),
		});
		
		oTable.addColumn(oColumn);

		var obj1 = new sap.m.ToolbarSpacer({width:"1px"});
		obj1.addStyleClass("verticalLine");	
		headerDetailsRow1.addItem(new sap.m.ToolbarSpacer({width:"50px"}));
		headerDetailsRow1.addItem(headerCell1VBox);
		headerDetailsRow1.addItem(new sap.m.ToolbarSpacer({width:"50px"}));
		headerDetailsRow1.addItem(obj1);
		headerDetailsRow1.addItem(new sap.m.ToolbarSpacer({width:"50px"}));
		headerDetailsRow1.addItem(headerCell2VBox);
		var obj = new sap.m.ToolbarSpacer({width:"1px"});
		obj.addStyleClass("verticalLine");
		headerDetailsRow1.addItem(new sap.m.ToolbarSpacer({width:"50px"}));
		headerDetailsRow1.addItem(obj);
		headerDetailsRow1.addItem(new sap.m.ToolbarSpacer({width:"50px"}));
	
		
		headerDetailsRow1.addItem(oTable);
		

		wsPanel.addContent(headerDetailsRow1);

		wsPanel.addContent(new sap.ui.commons.HorizontalDivider());		
		
		//second row of header details start
		var headerDetailsRow2 = new sap.m.HBox();
		
		var oTable = new sap.ui.table.Table({
			id:"companyTblID",
			width:"1200px"
			
		});
		
		var oColumn = new sap.ui.table.Column({
			label: new sap.m.Label({text:"Company Name",design: sap.m.LabelDesign.Bold}),
			template: new sap.m.Label({text:'{compDtlsTbl>CompName}'}),
			width:"350px"
		});

		oTable.addColumn(oColumn);
		
		var oColumn = new sap.ui.table.Column({
			label: new sap.m.Label({text:"Contact Name",design: sap.m.LabelDesign.Bold}),
			template: new sap.m.Input({value:'{compDtlsTbl>ContName}'}),
			width:"300px"
		});
		
		oTable.addColumn(oColumn);
		
		oColumn = new sap.ui.table.Column({
			label: new sap.m.Label({text:"Phone No",design: sap.m.LabelDesign.Bold}),
			template: new sap.m.Input({value:'{compDtlsTbl>Phone}'}),
			width:"150px"
		});
		
		oTable.addColumn(oColumn);

		oColumn = new sap.ui.table.Column({
			label: new sap.m.Label({text:"Email",design: sap.m.LabelDesign.Bold}),
			template: new sap.m.Input({value:'{compDtlsTbl>Email}'}),
		});
		
		oTable.addColumn(oColumn);
		

//		headerDetailsRow2.addItem(headerCell3VBox);
		headerDetailsRow2.addItem(oTable);

		
		wsPanel.addContent(headerDetailsRow2);

		
		detailsPage.addContent(wsPanel);
	},
	

	//Footer ---------------
	_addFooter : function(toolbarSpacer,oController){
		/**** Page Footer ****/
		var footerToolBar  = new sap.m.OverflowToolbar({id : "idFooterToolBar"});
		//footerToolBar.addStyleClass("footerToolbar");
		
		
		/*** Add WS Button ***/
		var footerButton = new sap.m.Button({
			id : "btnAddWS", // sap.ui.core.ID
			text : "Add WorkScope1", // string
			type : sap.m.ButtonType.Default, // sap.m.ButtonType
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.handleAddWS(oEvent);
			}, this ]
		});
		
		var toolbarLayoutData = new sap.m.OverflowToolbarLayoutData({
			moveToOverflow : true, // boolean
			stayInOverflow : false, // boolean
			priority : sap.m.OverflowToolbarPriority.High, // sap.m.OverflowToolbarPriority, since 1.32
			closeOverflowOnInteraction : true, // boolean, since 1.40
		});
		footerButton.setLayoutData(toolbarLayoutData);
		footerToolBar.addContent(footerButton);
		
		/*** Remove WS Button ***/
		footerButton = new sap.m.Button({
			id : "btnRemoveWS", // sap.ui.core.ID
			text : "Remove WorkScope1", // string
			type : sap.m.ButtonType.Default, // sap.m.ButtonType
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.removeWS(oEvent);
				
			}, this ]
		});

		
		footerButton.setLayoutData(toolbarLayoutData);
		footerToolBar.addContent(footerButton);
		
		footerToolBar.addContent(toolbarSpacer);
		
		/*** Save Button ***/
		var footerButton = new sap.m.Button({
			id : "btnSave", // sap.ui.core.ID
			text : "Save", // string
			type : sap.m.ButtonType.Default, // sap.m.ButtonType
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.saveWorkAuthorization(oEvent);
			}, this ]
		});
		
		footerButton.setLayoutData(toolbarLayoutData);
		footerToolBar.addContent(footerButton);
		
		/*** Approve Button ***/
		var footerButton = new sap.m.Button({
			id : "btnApprove", // sap.ui.core.ID
			text : "Approve", // string
			type : sap.m.ButtonType.Default, // sap.m.ButtonType
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.approveWS(oEvent);
			}, this ]
		});
		
		footerButton.setLayoutData(toolbarLayoutData);
		footerToolBar.addContent(footerButton);
		
		/*** Reject Button ***/
		var footerButton = new sap.m.Button({
			id : "btnReject", // sap.ui.core.ID
			text : "Reject", // string
			type : sap.m.ButtonType.Default, // sap.m.ButtonType
			press : [ function(oEvent) {
				var control = oEvent.getSource();
				oController.rejectWS(oEvent);
			}, this ]
		});
		
		footerButton.setLayoutData(toolbarLayoutData);
		footerToolBar.addContent(footerButton);
		
//		/*** Submit Actuals Button ***/
//		var footerButton = new sap.m.Button({
//			id : "btnSubmitActuals", // sap.ui.core.ID
//			text : "Submit Actuals", // string
//			type : sap.m.ButtonType.Default, // sap.m.ButtonType
//			tooltip : "External View"
//		});
//		
//		footerButton.setLayoutData(toolbarLayoutData);
//		footerToolBar.addContent(footerButton);
		
		return footerToolBar;
		
	}
});