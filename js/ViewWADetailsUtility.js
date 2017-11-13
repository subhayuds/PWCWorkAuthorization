jQuery.sap.declare("pwc.app.js.ViewWADetailsUtility");
jQuery.sap.require("pwc.app.js.WorkScopeUtility");
jQuery.sap.require("pwc.app.js.SaveWAUtility");
jQuery.sap.includeStyleSheet("css/detailsPageStandardStyle.css","detailsPageStandardStyle");

pwc.app.js.ViewWADetailsUtility = {
		/**
		 * Created By Ashok Sarkar
		 * This method reads the details of the Work Authorization
		 */
		getWADetails : function(waNo,callingControl){
			waDetailController = callingControl;
			var oIconTabBar = callingControl.getView().byId("idIconTabBar");
			
			oIconTabBar.destroyAggregation();
			oIconTabBar.destroyItems();
			
			var engDtlsLocalJSON = sap.ui.getCore().getModel("engDtlsLocalJSON");
			if(typeof engDtlsLocalJSON != "undefined"){
				sap.ui.getCore().setModel(null,"engDtlsLocalJSON");
			}
			var localJSONCacheModel = sap.ui.getCore().getModel("localJSONCacheModel");
			if(typeof localJSONCacheModel != "undefined"){
				sap.ui.getCore().setModel(null,"localJSONCacheModel");
			}
			
			var oTTSN = sap.ui.getCore().getModel("ttsn");
			if(typeof oTTSN != "undefined"){
				sap.ui.getCore().setModel(null,"ttsn");
			}
			
			var commentDialog = sap.ui.getCore().getModel("commentDialog");
			if(typeof commentDialog != "undefined"){
				sap.ui.getCore().setModel(null,"commentDialog");
			}
			
			var shipTo = sap.ui.getCore().getModel("primaryShipTo");
			if(typeof shipTo != "undefined"){
				sap.ui.getCore().setModel(null,"primaryShipTo");
			}
			var endPoint = sap.ui.getCore().getModel("endpointShipTo"); 
			if(typeof endPoint != "undefined"){
				sap.ui.getCore().setModel(null,"endpointShipTo");
			}
			
			var oDataModel = sap.ui.getCore().getModel("waModel");
			var expand = "Z_CSORDER_OPRN,Z_CSORDER_COMP,Z_CSORDER_ENG,Z_CSORDER_TXTN,Z_CSORDER_CNTC,Z_CSOR_WORKS";
			var waDetailsFilter = [];			
			waDetailsFilter.push(new sap.ui.model.Filter("WoNumber", sap.ui.model.FilterOperator.EQ, waNo));
			var thisContext = this;
			

//					that.getView().setBusy(false);
		        	var obj = {
		        			  "d": {
		        				    "results": [
		        				      {
		        				        "__metadata": {
		        				          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_HDRSet('000070009775')",
		        				          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_HDRSet('000070009775')",
		        				          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_HDR"
		        				        },
		        				        "WoNumber": "000070009775",
		        				        "Status": "APPROVE",
		        				        "WoType": "ZES1",
		        				        "CrmDoc": "PWC-05921-J0P7",
		        				        "Requester": "\"PPU \"\"MOSTOSTAL-RES\"\" S-ka z o.o\"",
		        				        "Customer": "Dassault Falcon Aircraft Services",
		        				        "CreatedBy": "P926956",
		        				        "CreatedByName": "Sampat Gopalpatil",
		        				        "Erdat": "20170429",
		        				        "Aog": "X",
		        				        "EspContract": "0040000533",
		        				        "EspPlantype": "PA",
		        				        "FirstRunwr": "",
		        				        "AcountStatus": "Active – Admin",
		        				        "DeferalStatus": "3",
		        				        "DeferalSdescr": "HSI & OH Deferred",
		        				        "RefWoNumber": "",
		        				        "TailNumber": "N-416QX",
		        				        "AcModelNumber": "306B",
		        				        "AcModelText": "BOMBARDIER LEAR 60",
		        				        "SerialNumber": "4083",
		        				        "EngModel": "PW306C R1 NJ",
		        				        "EventDate": "",
		        				        "LastReported": "20170518",
		        				        "CustomerPo": "0991-01",
		        				        "LastReporttsn": "April 2016",
		        				        "RevisionNum": "15",
		        				        "ViewOnly": "",
		        				        "Z_CSORDER_OPRN": {
		        				          "results": []
		        				        },
		        				        "Z_CSORDER_COMP": {
		        				          "results": []
		        				        },
		        				        "Z_CSORDER_ENG": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_ENGSet(WoNumber='000070009775',EnSlNumber='CD0231')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_ENGSet(WoNumber='000070009775',EnSlNumber='CD0231')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_ENG"
		        				              },
		        				              "WoNumber": "000070009775",
		        				              "EnSlNumber": "CD0231",
		        				              "CsOrderSub": "000070011187",
		        				              "LastReTtsn": "                 4758",
		        				              "EventReTtsn": "4799",
		        				              "EngPosition": "P1"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_ENGSet(WoNumber='000070009775',EnSlNumber='CD0244')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_ENGSet(WoNumber='000070009775',EnSlNumber='CD0244')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_ENG"
		        				              },
		        				              "WoNumber": "000070009775",
		        				              "EnSlNumber": "CD0244",
		        				              "CsOrderSub": "000070010752",
		        				              "LastReTtsn": "                 4590",
		        				              "EventReTtsn": "83839.9",
		        				              "EngPosition": "P2"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_ENGSet(WoNumber='000070009775',EnSlNumber='CD0246')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_ENGSet(WoNumber='000070009775',EnSlNumber='CD0246')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_ENG"
		        				              },
		        				              "WoNumber": "000070009775",
		        				              "EnSlNumber": "CD0246",
		        				              "CsOrderSub": "000070011064",
		        				              "LastReTtsn": "                 5828",
		        				              "EventReTtsn": "0",
		        				              "EngPosition": "P3"
		        				            }
		        				          ]
		        				        },
		        				        "Z_CSORDER_TXTN": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_TXTSet(WoNumber='70009775',TextType='W')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_TXTSet(WoNumber='70009775',TextType='W')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_TXT"
		        				              },
		        				              "WoNumber": "70009775",
		        				              "TextType": "W",
		        				              "Operation": "",
		        				              "Component": "0000",
		        				              "LongText": "                                                                                                                                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbb bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccc "
		        				            }
		        				          ]
		        				        },
		        				        "Z_CSORDER_CNTC": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_CONTACTSet(WoNumber='000070009775',CompName1='Aramco%20Services%20Company',CompName2='')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_CONTACTSet(WoNumber='000070009775',CompName1='Aramco%20Services%20Company',CompName2='')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_CONTACT"
		        				              },
		        				              "WoNumber": "000070009775",
		        				              "CompName1": "Aramco Services Company",
		        				              "CompName2": "",
		        				              "ContName1": "",
		        				              "ContName2": "",
		        				              "Phone": "",
		        				              "Email": "",
		        				              "CustNum": "0000010666"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_CONTACTSet(WoNumber='000070009775',CompName1='Dallas%20Airmotive',CompName2='')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_CONTACTSet(WoNumber='000070009775',CompName1='Dallas%20Airmotive',CompName2='')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_CONTACT"
		        				              },
		        				              "WoNumber": "000070009775",
		        				              "CompName1": "Dallas Airmotive",
		        				              "CompName2": "",
		        				              "ContName1": "asdfjas;dfj;asdklfja;sldkfjasl",
		        				              "ContName2": "",
		        				              "Phone": "aksdhfkashdfkhas",
		        				              "Email": "deep@g.com",
		        				              "CustNum": "0000012271"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_CONTACTSet(WoNumber='000070009775',CompName1='P%26WC%20Distribution%20USA%20LLC',CompName2='')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_CONTACTSet(WoNumber='000070009775',CompName1='P%26WC%20Distribution%20USA%20LLC',CompName2='')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_CONTACT"
		        				              },
		        				              "WoNumber": "000070009775",
		        				              "CompName1": "P&WC Distribution USA LLC",
		        				              "CompName2": "",
		        				              "ContName1": "",
		        				              "ContName2": "",
		        				              "Phone": "",
		        				              "Email": "",
		        				              "CustNum": "0000012721"
		        				            }
		        				          ]
		        				        },
		        				        "Z_CSOR_WORKS": {
		        				          "results": []
		        				        }
		        				      },
		        				      {
		        				        "__metadata": {
		        				          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_HDRSet('000070010752')",
		        				          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_HDRSet('000070010752')",
		        				          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_HDR"
		        				        },
		        				        "WoNumber": "000070010752",
		        				        "Status": "",
		        				        "WoType": "ZES2",
		        				        "CrmDoc": "",
		        				        "Requester": "",
		        				        "Customer": "",
		        				        "CreatedBy": "",
		        				        "CreatedByName": "",
		        				        "Erdat": "",
		        				        "Aog": "",
		        				        "EspContract": "",
		        				        "EspPlantype": "",
		        				        "FirstRunwr": "",
		        				        "AcountStatus": "",
		        				        "DeferalStatus": "",
		        				        "DeferalSdescr": "",
		        				        "RefWoNumber": "",
		        				        "TailNumber": "",
		        				        "AcModelNumber": "",
		        				        "AcModelText": "",
		        				        "SerialNumber": "",
		        				        "EngModel": "",
		        				        "EventDate": "",
		        				        "LastReported": "",
		        				        "CustomerPo": "",
		        				        "LastReporttsn": "",
		        				        "RevisionNum": "",
		        				        "ViewOnly": "",
		        				        "Z_CSORDER_OPRN": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0020')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0020')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070010752",
		        				              "Operation": "0020",
		        				              "OperationDesc": "Engine Overhaul1",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "15",
		        				              "WorkCenter": "SERVP-33",
		        				              "TextId": "",
		        				              "LongText": "q1"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0030')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0030')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070010752",
		        				              "Operation": "0030",
		        				              "OperationDesc": "Rental Engine",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "15",
		        				              "WorkCenter": "SERVP-33",
		        				              "TextId": "",
		        				              "LongText": ""
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0040')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0040')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070010752",
		        				              "Operation": "0040",
		        				              "OperationDesc": "Handling",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "P&WC Distribution USA LLC",
		        				              "ServprdId": "0000012721",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "15",
		        				              "WorkCenter": "SERVP-31",
		        				              "TextId": "",
		        				              "LongText": ""
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0050')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0050')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070010752",
		        				              "Operation": "0050",
		        				              "OperationDesc": "ddddd",
		        				              "Price": "         3.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Aramco Services Company",
		        				              "ServprdId": "0000010666",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "15",
		        				              "WorkCenter": "SERVP-69",
		        				              "TextId": "",
		        				              "LongText": "ccc"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0060')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0060')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070010752",
		        				              "Operation": "0060",
		        				              "OperationDesc": "Engine Overhaul1",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "15",
		        				              "WorkCenter": "SERVP-33",
		        				              "TextId": "",
		        				              "LongText": "q1"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0070')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0070')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070010752",
		        				              "Operation": "0070",
		        				              "OperationDesc": "Rental Engine",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "15",
		        				              "WorkCenter": "SERVP-33",
		        				              "TextId": "",
		        				              "LongText": ""
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0080')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0080')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070010752",
		        				              "Operation": "0080",
		        				              "OperationDesc": "Handling",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "P&WC Distribution USA LLC",
		        				              "ServprdId": "0000012721",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "15",
		        				              "WorkCenter": "SERVP-31",
		        				              "TextId": "",
		        				              "LongText": ""
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0090')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070010752',Operation='0090')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070010752",
		        				              "Operation": "0090",
		        				              "OperationDesc": "ddddd",
		        				              "Price": "         3.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Aramco Services Company",
		        				              "ServprdId": "0000010666",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "15",
		        				              "WorkCenter": "SERVP-69",
		        				              "TextId": "",
		        				              "LongText": "ccc"
		        				            }
		        				          ]
		        				        },
		        				        "Z_CSORDER_COMP": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_COMPSet(WoNumber='000070010752',Operation='0020')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_COMPSet(WoNumber='000070010752',Operation='0020')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_COMP"
		        				              },
		        				              "WoNumber": "000070010752",
		        				              "Operation": "0020",
		        				              "PartItmNo": "0001",
		        				              "Posnr": "0120",
		        				              "PartNumber": "100040",
		        				              "PartDesc": "100040",
		        				              "PartQuantity": "           1.000",
		        				              "Price": "",
		        				              "PriceUnit": "",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "RevisionNum": "15",
		        				              "TextId": "01200009737890001",
		        				              "LongText": "comm",
		        				              "PdcShpfrm": ""
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_COMPSet(WoNumber='000070010752',Operation='0060')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_COMPSet(WoNumber='000070010752',Operation='0060')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_COMP"
		        				              },
		        				              "WoNumber": "000070010752",
		        				              "Operation": "0060",
		        				              "PartItmNo": "0002",
		        				              "Posnr": "0120",
		        				              "PartNumber": "100040",
		        				              "PartDesc": "100040",
		        				              "PartQuantity": "           1.000",
		        				              "Price": "",
		        				              "PriceUnit": "",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "RevisionNum": "15",
		        				              "TextId": "01200009737890002",
		        				              "LongText": "comm",
		        				              "PdcShpfrm": ""
		        				            }
		        				          ]
		        				        },
		        				        "Z_CSORDER_ENG": {
		        				          "results": []
		        				        },
		        				        "Z_CSORDER_TXTN": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_TXTSet(WoNumber='70010752',TextType='W')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_TXTSet(WoNumber='70010752',TextType='W')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_TXT"
		        				              },
		        				              "WoNumber": "70010752",
		        				              "TextType": "W",
		        				              "Operation": "",
		        				              "Component": "0000",
		        				              "LongText": "A0000026901#@!END!@#                                                                                                                                                                                                                                                    "
		        				            }
		        				          ]
		        				        },
		        				        "Z_CSORDER_CNTC": {
		        				          "results": []
		        				        },
		        				        "Z_CSOR_WORKS": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_WORKSet(WoNumber='000070010752',WorkScope='A0000026901')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_WORKSet(WoNumber='000070010752',WorkScope='A0000026901')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_WORK"
		        				              },
		        				              "WoNumber": "000070010752",
		        				              "WorkScope": "A0000026901",
		        				              "WorkScopeDesc": "Pratt & Whitney Canada is a Canada-based",
		        				              "ReasonForWork": "pneumonoultramicroscopicsilicovolcanoconiosis"
		        				            }
		        				          ]
		        				        }
		        				      },
		        				      {
		        				        "__metadata": {
		        				          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_HDRSet('000070011064')",
		        				          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_HDRSet('000070011064')",
		        				          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_HDR"
		        				        },
		        				        "WoNumber": "000070011064",
		        				        "Status": "",
		        				        "WoType": "ZES2",
		        				        "CrmDoc": "",
		        				        "Requester": "",
		        				        "Customer": "",
		        				        "CreatedBy": "",
		        				        "CreatedByName": "",
		        				        "Erdat": "",
		        				        "Aog": "",
		        				        "EspContract": "",
		        				        "EspPlantype": "",
		        				        "FirstRunwr": "",
		        				        "AcountStatus": "",
		        				        "DeferalStatus": "",
		        				        "DeferalSdescr": "",
		        				        "RefWoNumber": "",
		        				        "TailNumber": "",
		        				        "AcModelNumber": "",
		        				        "AcModelText": "",
		        				        "SerialNumber": "",
		        				        "EngModel": "",
		        				        "EventDate": "",
		        				        "LastReported": "",
		        				        "CustomerPo": "",
		        				        "LastReporttsn": "",
		        				        "RevisionNum": "",
		        				        "ViewOnly": "",
		        				        "Z_CSORDER_OPRN": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011064',Operation='0010')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011064',Operation='0010')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070011064",
		        				              "Operation": "0010",
		        				              "OperationDesc": "Perform Overhaul",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "P&WC Distribution USA LLC",
		        				              "ServprdId": "0000012721",
		        				              "WorkScope": "A0000029601",
		        				              "RevisionNum": "15",
		        				              "WorkCenter": "SERVP-31",
		        				              "TextId": "",
		        				              "LongText": "Perform Overhaul Incorporate SB's 1 to 6."
		        				            }
		        				          ]
		        				        },
		        				        "Z_CSORDER_COMP": {
		        				          "results": []
		        				        },
		        				        "Z_CSORDER_ENG": {
		        				          "results": []
		        				        },
		        				        "Z_CSORDER_TXTN": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_TXTSet(WoNumber='70011064',TextType='W')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_TXTSet(WoNumber='70011064',TextType='W')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_TXT"
		        				              },
		        				              "WoNumber": "70011064",
		        				              "TextType": "W",
		        				              "Operation": "",
		        				              "Component": "0000",
		        				              "LongText": "A0000029601xx#@!END!@#                                                                                                                                                                                                                                                  "
		        				            }
		        				          ]
		        				        },
		        				        "Z_CSORDER_CNTC": {
		        				          "results": []
		        				        },
		        				        "Z_CSOR_WORKS": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_WORKSet(WoNumber='000070011064',WorkScope='A0000029601')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_WORKSet(WoNumber='000070011064',WorkScope='A0000029601')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_WORK"
		        				              },
		        				              "WoNumber": "000070011064",
		        				              "WorkScope": "A0000029601",
		        				              "WorkScopeDesc": "Overhaul - PW306B",
		        				              "ReasonForWork": ""
		        				            }
		        				          ]
		        				        }
		        				      },
		        				      {
		        				        "__metadata": {
		        				          "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_HDRSet('000070011187')",
		        				          "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_HDRSet('000070011187')",
		        				          "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_HDR"
		        				        },
		        				        "WoNumber": "000070011187",
		        				        "Status": "",
		        				        "WoType": "ZES2",
		        				        "CrmDoc": "",
		        				        "Requester": "",
		        				        "Customer": "",
		        				        "CreatedBy": "",
		        				        "CreatedByName": "",
		        				        "Erdat": "",
		        				        "Aog": "",
		        				        "EspContract": "",
		        				        "EspPlantype": "",
		        				        "FirstRunwr": "",
		        				        "AcountStatus": "",
		        				        "DeferalStatus": "",
		        				        "DeferalSdescr": "",
		        				        "RefWoNumber": "",
		        				        "TailNumber": "",
		        				        "AcModelNumber": "",
		        				        "AcModelText": "",
		        				        "SerialNumber": "",
		        				        "EngModel": "",
		        				        "EventDate": "",
		        				        "LastReported": "",
		        				        "CustomerPo": "",
		        				        "LastReporttsn": "",
		        				        "RevisionNum": "",
		        				        "ViewOnly": "",
		        				        "Z_CSORDER_OPRN": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0010')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0010')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "Operation": "0010",
		        				              "OperationDesc": "Engine Overhaul1",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "16",
		        				              "WorkCenter": "SERVP-33",
		        				              "TextId": "",
		        				              "LongText": "q1"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0020')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0020')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "Operation": "0020",
		        				              "OperationDesc": "Rental Engine",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "16",
		        				              "WorkCenter": "SERVP-33",
		        				              "TextId": "",
		        				              "LongText": ""
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0030')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0030')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "Operation": "0030",
		        				              "OperationDesc": "Handling",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "P&WC Distribution USA LLC",
		        				              "ServprdId": "0000012721",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "16",
		        				              "WorkCenter": "SERVP-31",
		        				              "TextId": "",
		        				              "LongText": ""
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0040')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0040')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "Operation": "0040",
		        				              "OperationDesc": "ddddd",
		        				              "Price": "         3.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Aramco Services Company",
		        				              "ServprdId": "0000010666",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "16",
		        				              "WorkCenter": "SERVP-69",
		        				              "TextId": "",
		        				              "LongText": "ccc"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0050')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0050')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "Operation": "0050",
		        				              "OperationDesc": "Engine Overhaul1",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "16",
		        				              "WorkCenter": "SERVP-33",
		        				              "TextId": "",
		        				              "LongText": "q1"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0060')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0060')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "Operation": "0060",
		        				              "OperationDesc": "Rental Engine",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "16",
		        				              "WorkCenter": "SERVP-33",
		        				              "TextId": "",
		        				              "LongText": ""
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0070')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0070')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "Operation": "0070",
		        				              "OperationDesc": "Handling",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "P&WC Distribution USA LLC",
		        				              "ServprdId": "0000012721",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "16",
		        				              "WorkCenter": "SERVP-31",
		        				              "TextId": "",
		        				              "LongText": ""
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0080')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0080')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "Operation": "0080",
		        				              "OperationDesc": "ddddd",
		        				              "Price": "         3.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "Aramco Services Company",
		        				              "ServprdId": "0000010666",
		        				              "WorkScope": "A0000026901",
		        				              "RevisionNum": "16",
		        				              "WorkCenter": "SERVP-69",
		        				              "TextId": "",
		        				              "LongText": "ccc"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0090')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_OPRNSet(WoNumber='000070011187',Operation='0090')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_OPRN"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "Operation": "0090",
		        				              "OperationDesc": "Perform Overhaul",
		        				              "Price": "         0.00",
		        				              "PriceUnit": "USD",
		        				              "ServicePrvd": "P&WC Distribution USA LLC",
		        				              "ServprdId": "0000012721",
		        				              "WorkScope": "A0000029601",
		        				              "RevisionNum": "16",
		        				              "WorkCenter": "SERVP-31",
		        				              "TextId": "",
		        				              "LongText": "Perform Overhaul Incorporate SB's 1 to 6."
		        				            }
		        				          ]
		        				        },
		        				        "Z_CSORDER_COMP": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_COMPSet(WoNumber='000070011187',Operation='0010')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_COMPSet(WoNumber='000070011187',Operation='0010')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_COMP"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "Operation": "0010",
		        				              "PartItmNo": "0001",
		        				              "Posnr": "0120",
		        				              "PartNumber": "100040",
		        				              "PartDesc": "100040",
		        				              "PartQuantity": "           1.000",
		        				              "Price": "",
		        				              "PriceUnit": "",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "RevisionNum": "16",
		        				              "TextId": "01200009901010001",
		        				              "LongText": "comm",
		        				              "PdcShpfrm": ""
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_COMPSet(WoNumber='000070011187',Operation='0050')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_COMPSet(WoNumber='000070011187',Operation='0050')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_COMP"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "Operation": "0050",
		        				              "PartItmNo": "0002",
		        				              "Posnr": "0120",
		        				              "PartNumber": "100040",
		        				              "PartDesc": "100040",
		        				              "PartQuantity": "           1.000",
		        				              "Price": "",
		        				              "PriceUnit": "",
		        				              "ServicePrvd": "Dallas Airmotive",
		        				              "ServprdId": "0000012271",
		        				              "RevisionNum": "16",
		        				              "TextId": "01200009901010002",
		        				              "LongText": "comm",
		        				              "PdcShpfrm": ""
		        				            }
		        				          ]
		        				        },
		        				        "Z_CSORDER_ENG": {
		        				          "results": []
		        				        },
		        				        "Z_CSORDER_TXTN": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_TXTSet(WoNumber='70011187',TextType='W')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_TXTSet(WoNumber='70011187',TextType='W')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_TXT"
		        				              },
		        				              "WoNumber": "70011187",
		        				              "TextType": "W",
		        				              "Operation": "",
		        				              "Component": "0000",
		        				              "LongText": "A0000026901#@!END!@#A0000029601#@!END!@#                                                                                                                                                                                                                                "
		        				            }
		        				          ]
		        				        },
		        				        "Z_CSORDER_CNTC": {
		        				          "results": []
		        				        },
		        				        "Z_CSOR_WORKS": {
		        				          "results": [
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_WORKSet(WoNumber='000070011187',WorkScope='A0000026901')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_WORKSet(WoNumber='000070011187',WorkScope='A0000026901')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_WORK"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "WorkScope": "A0000026901",
		        				              "WorkScopeDesc": "Pratt & Whitney Canada is a Canada-based",
		        				              "ReasonForWork": "pneumonoultramicroscopicsilicovolcanoconiosis"
		        				            },
		        				            {
		        				              "__metadata": {
		        				                "id": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_WORKSet(WoNumber='000070011187',WorkScope='A0000029601')",
		        				                "uri": "http://wcalqkek.pwc.ca:8020/sap/opu/odata/sap/Z_ESP_GW_SERVICE_SRV/ZZ_CSORDER_WORKSet(WoNumber='000070011187',WorkScope='A0000029601')",
		        				                "type": "Z_ESP_GW_SERVICE_SRV.ZZ_CSORDER_WORK"
		        				              },
		        				              "WoNumber": "000070011187",
		        				              "WorkScope": "A0000029601",
		        				              "WorkScopeDesc": "Overhaul - PW306B",
		        				              "ReasonForWork": ""
		        				            }
		        				          ]
		        				        }
		        				      }
		        				    ]
		        				  }
		        				};

			        var oData = {};
			        oData.results = obj.d.results;
			        var waTopAndHdrModel = {};
			        var ttsn = {};
			        var compDtls ={};
			        var engDtlsModel = [];
			        waTopAndHdrModel = oData.results[0];
			        globalWANo = waTopAndHdrModel.WoNumber;
			        ttsn = oData.results[0]["Z_CSORDER_ENG"];
			        compDtls = oData.results[0]["Z_CSORDER_CNTC"];
			        var indx = 0;
			        for(var i=1;i<oData.results.length;i++) {
			        	engDtlsModel[indx++] = oData.results[i];
			        }
			        
			        //for account status
			        if(typeof waTopAndHdrModel.AcountStatus != "undefined" && waTopAndHdrModel.AcountStatus != ""){
			        	if(waTopAndHdrModel.AcountStatus == "Active" || waTopAndHdrModel.AcountStatus == "Renewing"){
			        		waTopAndHdrModel.ASImg = "mime/blank.png";
			        	}
			        	//"waTopAndHdrModel.AcountStatus.length == 14 && waTopAndHdrModel.AcountStatus.indexOf("Active") == 0 && waTopAndHdrModel.AcountStatus.indexOf("Admin") == 9" -- to fix issue #90. hypen(-) char of SAP is not able to recognize by FIORI. 
			        	else if(waTopAndHdrModel.AcountStatus == "Enrolling" || waTopAndHdrModel.AcountStatus == "Active - Admin" || (waTopAndHdrModel.AcountStatus.length == 14 && waTopAndHdrModel.AcountStatus.indexOf("Active") == 0 && waTopAndHdrModel.AcountStatus.indexOf("Admin") == 9)){
			        		waTopAndHdrModel.ASImg = "mime/warning-button.png"; //yellow image
			        	} 
			        	else{
			        		waTopAndHdrModel.ASImg = "mime/red_warn.png"; //red image
			        	}
			        }
			        else{
			        	waTopAndHdrModel.ASImg = "mime/blank.png";
			        }
			        
			        //for header Deferral status
			        if(typeof waTopAndHdrModel.DeferalSdescr != "undefined" && waTopAndHdrModel.DeferalSdescr != ""){
			        	if(waTopAndHdrModel.DeferalSdescr == "HSI Deferred" || waTopAndHdrModel.DeferalSdescr == "OH Deferred" || waTopAndHdrModel.DeferalSdescr == "HSI & OH Deferred"){
			        		waTopAndHdrModel.DSImg = "mime/red_warn.png"; //red image
			        	} 
			        	else{
			        		waTopAndHdrModel.DSImg = "mime/warning-button.png"; 
			        	}
			        }
			        else{
			        	waTopAndHdrModel.DSImg = "mime/blank.png";
			        }
			        
		
			       /* if(typeof waTopAndHdrModel.RefWoNumber != "undefined" && waTopAndHdrModel.RefWoNumber != ""){
			        	waTopAndHdrModel.RefWoNumber = "WA" + waTopAndHdrModel.RefWoNumber;	
			        }*/
			        
			        if(waTopAndHdrModel.Status == "APPROVE"){
			        	waTopAndHdrModel.Status ="";
			        }
			        else if(typeof waTopAndHdrModel.Status != "undefined" && waTopAndHdrModel.Status != ""){ 
			        	waTopAndHdrModel.WoNumber =  waTopAndHdrModel.WoNumber + " ("+waTopAndHdrModel.Status+")";	
			        }
			        
			        //show revision blank in case of <= 0 
//			        waTopAndHdrModel.RevisionNumDisp = "";
//			        if(typeof waTopAndHdrModel.RevisionNum != "undefined" && waTopAndHdrModel.RevisionNum != "" && waTopAndHdrModel.RevisionNum != "" && parseInt(waTopAndHdrModel.RevisionNum) > 0 ){
//			        	waTopAndHdrModel.RevisionNumDisp = waTopAndHdrModel.RevisionNum;
//			        }
			        
		        	delete waTopAndHdrModel["Z_CSORDER_CNTC"];
			        delete waTopAndHdrModel["Z_CSORDER_TXTN"];
			        delete waTopAndHdrModel["Z_CSORDER_ENG"];
			        delete waTopAndHdrModel["Z_CSORDER_COMP"];
			        delete waTopAndHdrModel["Z_CSORDER_OPRN"];
			        delete waTopAndHdrModel["Z_CSOR_WORKS"];
			        
			        if(waTopAndHdrModel.Aog == "X"){
			        	waTopAndHdrModel.Aog = true;
			        }
			        else{
			        	waTopAndHdrModel.Aog = false;
			        }

			        var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(waTopAndHdrModel);
					sap.ui.getCore().setModel(oModel,"waTopAndHdrModel");
					
					callingControl.getView().byId("idDetailsHeaderToolBar").setModel(oModel,"waTopAndHdrModel");
					callingControl.getView().byId("hdrDtlPnl").setModel(oModel,"waTopAndHdrModel");

					/*** TTSN Table ***/
					if(typeof ttsn["results"] != "undefined"){
						ttsn = pwc.app.js.ViewWADetailsUtility._sortTTSN(ttsn);
						var localCacheTTSN = JSON.parse(JSON.stringify(ttsn));
						var oModel1 = new sap.ui.model.json.JSONModel();
						oModel1.setData(localCacheTTSN)
						sap.ui.getCore().setModel(oModel1,"localCacheTTSN");
						oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(ttsn)
						sap.ui.getCore().setModel(oModel,"ttsn");
						var table = callingControl.getView().byId("ttsnID");
						table.setVisibleRowCount(ttsn.results.length);
//						table.setSelectionMode(sap.ui.table.SelectionMode.None);
						table.setModel(oModel,"ttsn");
//						table.bindRows("ttsn>/results");
					} else {
						var localCacheTTSN = {"results":[]};
						var oModel1 = new sap.ui.model.json.JSONModel();
						oModel1.setData(localCacheTTSN)
						sap.ui.getCore().setModel(oModel1,"localCacheTTSN");
						ttsn = {"results":[]};
						oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(ttsn);
						var table = callingControl.getView().byId("ttsnID");
						table.setVisibleRowCount(ttsn.results.length);
//						table.setSelectionMode(sap.ui.table.SelectionMode.None);
						table.setModel(oModel,"ttsn");
//						table.bindRows("ttsn>/results");
					}
					
					/*** Company Name ***/
					if(typeof compDtls["results"] != "undefined"){
						for(var i=0;i<compDtls.results.length;i++){
							var oComp = compDtls.results[i];
							oComp.ContName = oComp.ContName1;
							oComp.CompName = oComp.CompName1;
						}
						var localCacheComp = JSON.parse(JSON.stringify(compDtls));
						var oModel1 = new sap.ui.model.json.JSONModel();
						oModel1.setData(localCacheComp)
						sap.ui.getCore().setModel(oModel1,"localCacheComp");
						
						oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(compDtls);
						sap.ui.getCore().setModel(oModel,"compDtls");
						table = callingControl.getView().byId("companyTblID");
						table.setVisibleRowCount(compDtls.results.length);
						//table.setSelectionMode(sap.ui.table.SelectionMode.None);
						table.setModel(oModel,"compDtlsTbl");
						//table.bindRows("compDtlsTbl>/results");
						
					} else {
						var localCacheComp = {"results":[]};;
						var oModel1 = new sap.ui.model.json.JSONModel();
						oModel1.setData(localCacheComp)
						sap.ui.getCore().setModel(oModel1,"localCacheComp");
						compDtls =  {"results":[]};
						oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(compDtls);
						sap.ui.getCore().setModel(oModel,"compDtls");
						table = callingControl.getView().byId("companyTblID");
						table.setVisibleRowCount(compDtls.results.length);
//						table.setSelectionMode(sap.ui.table.SelectionMode.None);
						table.setModel(oModel,"compDtlsTbl");
//						table.bindRows("compDtlsTbl>/results");
					}
					
					var engDtlsLocalJSON = pwc.app.js.ViewWADetailsUtility._convertRespJSONToLocalJSON(oData,ttsn,callingControl);
					
					/*** Create UI for Engines and Its Details ***/
					pwc.app.js.ViewWADetailsUtility._createContentEngines(engDtlsLocalJSON,callingControl);
					
					var addWsBtn = callingControl.getView().byId("btnAddWS");
					var remvWsBtn = callingControl.getView().byId("btnRemoveWS");
					var saveBtn = callingControl.getView().byId("btnSave");
					var apprBtn = callingControl.getView().byId("btnApprove");
					var rejBtn = callingControl.getView().byId("btnReject");
					if(waTopAndHdrModel.Status == "DECLINED" || waTopAndHdrModel.ViewOnly == "X"){
						addWsBtn.setVisible(false);
						remvWsBtn.setVisible(false);
						saveBtn.setVisible(false);
						apprBtn.setVisible(false);
						rejBtn.setVisible(false);
					}
					else
					{
						addWsBtn.setVisible(true);
						remvWsBtn.setVisible(true);
						saveBtn.setVisible(true);
						apprBtn.setVisible(true);
						rejBtn.setVisible(true);
					}
					
					//header details in bold
					var crmNo = callingControl.getView().byId("crmNoID");
					if(engineTabOpened != ""){
						pwc.app.js.ViewWADetailsUtility.maintainScreenState(callingControl);	
					}
					if(forwardIcon != "")
					{
						forwardIcon.setVisible(true);
					}
					sap.ui.core.BusyIndicator.hide();
		        
		       
			
			if(oDataModel) {
				oDataModel.read("/ZZ_CSORDER_HDRSet",searchParameters);
		    }
		},
	
		
	maintainScreenState : function(callingControl){
		var tabs = callingControl.getView().byId("idIconTabBar").getItems();
		for(var i=0;i<tabs.length;i++){
			if(tabs[i].getText() == engineTabOpened){
				tabs[i].getParent().setSelectedKey(tabs[i].sId);
				break;
			}
		}
		
		
		/*var wrkScpArr = Array.from(workScopeOpened);
		for(var i=0;i<wrkScpArr.length;i++){
			if(wrkScpArr[i].indexOf(engineTabOpened) == 0){
				var x = sap.ui.getCore().byId(wrkScpArr[i]);
				x.getParent().getParent().setExpanded(true);

			}
		}*/
		
		workScopeOpened.forEach(function(value) {
			  console.log(value);
			  if(value.indexOf(engineTabOpened) == 1){
					var x = sap.ui.getCore().byId(value);
					if(typeof x.getParent() != "undefined"){
						x.getParent().getParent().setExpanded(true);						
					}
			}
		});
		
	},	
	/***
	 * Created by Ashok Sarkar
	 * Sort TTSN based on Position
	 */
	_sortTTSN :function(ttsn){
		var data = {"results" : []};
		var cnt = 0;
		for(var i=0;i<ttsn.results.length;i++){
			if(ttsn.results[i].EventReTtsn == "0"){
				ttsn.results[i].EventReTtsn = "";
			}
			if(!(ttsn.results[i].EnSlNumber == "")  && !(ttsn.results[i].EngPosition.indexOf("S") > -1)){
				data.results[cnt++] = ttsn.results[i];
			}
		}
		
		
		for(var i=0;i<data.results.length;i++){
			for(var j=i;j<data.results.length;j++){
				if(data.results[i].EngPosition > data.results[j].EngPosition){
					var temp = data.results[i];
					data.results[i] = data.results[j];
					data.results[j] = temp;
				}
			}
		}
		
		if(engineTabOpened == ""){
			engineTabOpened = data.results[0].EnSlNumber;	
		}
		return data;
	},
	
	/**
	 * Created by Ashok Sarkar
	 * This method converts the READ response to Screen mapping JSON
	 */
	_convertRespJSONToLocalJSON : function(oData,ttsn,callingControl){

		var engDtlsLocalJSON = {"engDtls" : []};
        
        /*** If no engine found ***/
        if(oData.results.length == 1){   
        	 var oModel = new sap.ui.model.json.JSONModel();
             var localJSONCacheModel = new sap.ui.model.json.JSONModel();
             var temp = JSON.parse(JSON.stringify(engDtlsLocalJSON));
             oModel.setData(engDtlsLocalJSON);
             localJSONCacheModel.setData(temp);
             sap.ui.getCore().setModel(oModel,"engDtlsLocalJSON");
             sap.ui.getCore().setModel(localJSONCacheModel,"localJSONCacheModel");
             
             return engDtlsLocalJSON;
        }
        
        /*** Populate Engines from TTSN ***/
        var indx = 0;
        for(var i=0;i<ttsn.results.length;i++)    {
        var oTTSN = ttsn.results[i];
      
       if(oTTSN.CsOrderSub == "" || typeof oTTSN.CsOrderSub == "undefined"){
            continue;
       }
      var oEng = {};
      oEng.engSlNo = oTTSN.EnSlNumber;
      oEng.engPos = oTTSN.EngPosition;
      oEng.SubOrder = oTTSN.CsOrderSub;
      engDtlsLocalJSON.engDtls[indx++] = oEng;
              
         }
        
        
        for(var i=0;i<engDtlsLocalJSON.engDtls.length;i++){
        	var eng = engDtlsLocalJSON.engDtls[i];
        	for(var j=1;j<oData.results.length;j++){
        		var odata = oData.results[j];
        		if(eng.SubOrder == odata.WoNumber){
        			eng.wrkscp = odata["Z_CSOR_WORKS"];
        			eng.freetxt = odata["Z_CSORDER_TXTN"];
        			eng.freeTxtMap = pwc.app.js.ViewWADetailsUtility._extractLongText(eng.freetxt);
        			eng.oper = odata["Z_CSORDER_OPRN"];
        			eng.comp = odata["Z_CSORDER_COMP"];
        			break;
        		}
        	}
        }
        
        var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
        
        /***  ***/
        for(var i=0;i<engDtlsLocalJSON.engDtls.length;i++) {
        	 var oEng = engDtlsLocalJSON.engDtls[i];
              var wrkscp = oEng.wrkscp;
              var freetxt = oEng.freetxt;
              var freeTxtMap = oEng.freeTxtMap;
              var oper = oEng.oper;
              var comp = oEng.comp;
              oEng.wrkScpDtls = [];
              oEng.Posnr = 0;

              /*** Populate Work Scope ***/
              for(var j=0;j<wrkscp.results.length;j++){
                    var oWS = wrkscp.results[j];
                    var oWSTemp = {};
                    oWSTemp.workscopekey = oWS.WorkScope;
                    oWSTemp.wrkscpname = oWS.WorkScopeDesc;
                    oWSTemp.reason = oWS.ReasonForWork;
                    oWSTemp.reasonActual = oWS.ReasonForWork;
                    oWSTemp.flag = "";
                    
                    /*** Populate Free Text ***/
            		oWSTemp.freetext = freeTxtMap.get(oWSTemp.workscopekey);
            		
            		
            		if(typeof oWSTemp.freetext == "undefined"){
            			oWSTemp.freetext = "";
            		}
            		
            		if(oWSTemp.freetext != ""){
                		var strttxtset = oWSTemp.freetext.indexOf(oWSTemp.wrkscpname);
                		if(strttxtset == 0)
                		{
                			var replacedTxt = oWSTemp.freetext.substring(oWSTemp.wrkscpname.length);
                			oWSTemp.freetext = replacedTxt;
                			freeTxtMap.set(oWSTemp.workscopekey,oWSTemp.freetext);
                		}
            		}
            		
            		
            		oWSTemp.freetextActual = oWSTemp.freetext; 
                    			
                    /*** Populate Operations ***/
                    var op = 0;
                    oWSTemp.operations = [];
                    oWSTemp.components = [];
                    for(var k=0;k<oper.results.length;k++){
                          var oP = oper.results[k];
                          oP.vendorId = oP.ServprdId;
                          oP.flag = "";
                          if(typeof oP.Price != "undefined"){
                        	  oP.Price = oP.Price.trim();  
                          }
                          if(oWS.WorkScope == oP.WorkScope){
                                oWSTemp.operations[op++] =  oP;
                                
                                 /*** Populate Components mapped with Operations ***/
                                for(var p=0;p<comp.results.length;p++){
                                      var oC = comp.results[p];
                                      oC.flag = "";
                                      oC.vendorId = oC.ServprdId;
                                      oC.OldPartOperNum = "";
                                      oC.qtyEditable = true;
                                      if((typeof waTopAndHdrModel.getData().RevisionNum != "undefined" && waTopAndHdrModel.getData().RevisionNum != "")&& oC.RevisionNum != "" && parseInt(oC.RevisionNum) <= parseInt(waTopAndHdrModel.getData().RevisionNum)){
                                    	  oC.qtyEditable = false;  
                                      }
                                      if(oP.Operation == oC.Operation){
                                            oWSTemp.components[oWSTemp.components.length] =  oC;
                                      }
                                     /* if(typeof oC.ServicePrvd == "undefined" || oC.ServicePrvd == ""){
                                    	  oC.ServicePrvd = "PDC";
                                      }*/
                                      /*** Get the last Posnr value of Component tables in an Engine***/
                                      if(Number(oC.Posnr) > Number(oEng.Posnr)){
                                    	  oEng.Posnr = oC.Posnr;
                                      }
                                }
                          }
                    }
                    oEng.wrkScpDtls[j] = oWSTemp;
              }
        }
        
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData(engDtlsLocalJSON);
        sap.ui.getCore().setModel(oModel,"engDtlsLocalJSON");

        return engDtlsLocalJSON;
	
	},
	
	/**
	 * Create by Ashok Sarkar
	 * Extracting workscope long text for each workscope of an engine and put it into a Map(workscopekey and freetext) 
	 */
	_extractLongText: function(freetxt){
		var freeTxtMap = new Map();
		var arr = "";
        if(typeof freetxt.results != "undefined"){
            var oFT = freetxt.results[0];
            if(typeof oFT != "undefined" && oFT.TextType == "W"){
                 arr = oFT.LongText.split("#@!END!@#");
                 for(var i=0;i<arr.length;i++){
                	 var str = arr[i];
                	 freeTxtMap.set(str.substring(0,11),str.substring(11));
                 }
            }
        }
        else{
        	console.log("Engine Number: " + oEng.engSlNo + "  Workscope: " + oWSTemp.wrkscpname + " does not have freetext");
        }
        return freeTxtMap;
	},
	
	/**
	 * Created by Ashok Sarkar
	 * Extract workscope long text
	 */
	_workScopeLongTextChange : function(textarea){
		var main = sap.ui.getCore().getModel("engDtlsLocalJSON");
		for(var i=0;i<main.oData.engDtls.length;i++){
			var wrkscpList = main.oData.engDtls[i].wrkScpDtls;
			for(var j=0;j<wrkscpList.length;j++){
				var oWrkscp = wrkscpList[j];
				if(("W"+main.oData.engDtls[i].engSlNo+oWrkscp.workscopekey) == textarea.sId){
					oWrkscp.freetext = textarea.getValue();
					 
				}
			}
		}
		
	},
	
	/**
	 * Created by Ashok Sarkar
	 * This method will called on change of "reason for work" text box. 
	 */
	_reasonChange : function(that){
		var main = sap.ui.getCore().getModel("engDtlsLocalJSON");
		for(var i=0;i<main.oData.engDtls.length;i++){
			var wrkscpList = main.oData.engDtls[i].wrkScpDtls;
			for(var j=0;j<wrkscpList.length;j++){
				var oWrkscp = wrkscpList[j];
				if(("R"+main.oData.engDtls[i].engSlNo+oWrkscp.workscopekey) == that.sId){
					oWrkscp.flag ="E";
					oWrkscp.reason = that.getValue();						
				}
			}
		}
	},
	
	
	/**
	 * Created by Ashok Sarkar
	 * This method created the dynamic UI of Engines and its details
	 */
	_createContentEngines: function(engDtlsLocalJSON,callingControl) {
		
	    var ddvalue = [
	    	{"key":"key1","value":"value1"},
	    	{"key":"key2","value":"value2"},
	    	{"key":"key2","value":"value2"}
	    ];
	    var mdl = {
	    		"dd" : ddvalue
	    };
	    
	    var oItemTemplate = new sap.ui.core.ListItem({key : "{Operation}",text:"{Operation}"});
	    console.log("operation --- " + screen.width);
	    var screenWidth = screen.width;
	    
		for(var i=0;i<engDtlsLocalJSON.engDtls.length;i++){
			var oEng = engDtlsLocalJSON.engDtls[i];
			var oIconTabFilter= pwc.app.js.ViewWADetailsUtility._addIconTabBarFilter(oEng,callingControl);
			if(typeof oEng.wrkScpDtls != "undefined"){
				for(var j=0;j<oEng.wrkScpDtls.length;j++){
					var oWrkScp = oEng.wrkScpDtls[j];
					var wspanel = pwc.app.js.ViewWADetailsUtility._addWorkScopeHdr(oWrkScp,oEng);
					pwc.app.js.ViewWADetailsUtility._addWorkScopeText(wspanel,oWrkScp,oEng);
					//add operations 
					var operTable = pwc.app.js.ViewWADetailsUtility._addOperations(screenWidth, oWrkScp.operations,callingControl,oWrkScp.workscopekey,"tbl"+oEng.engSlNo+"_"+oWrkScp.workscopekey);
					var operTableHeaderToolBar = pwc.app.js.ViewWADetailsUtility._createTableHeaderToolbar(oEng.engSlNo+"_"+oWrkScp.workscopekey,"Tasks and Other Items"); 
					operTable.setHeaderToolbar(operTableHeaderToolBar); 
					wspanel.addContent(operTable);
					//add components
					var newoper = JSON.parse(JSON.stringify(oWrkScp.operations));
					var data = {"operDropDown" :newoper};
					data.operDropDown.splice(0, 0,{"" : ""});
					var mModel = new sap.ui.model.json.JSONModel(data);
					var compTable = pwc.app.js.ViewWADetailsUtility._addComponent(screenWidth, oWrkScp.components,callingControl,oWrkScp.workscopekey,oItemTemplate,mModel);
					pwc.app.js.ViewWADetailsUtility.doSelectedKeyOfPartOperDD(compTable,oWrkScp.components);
					var compTableHeaderToolBar = pwc.app.js.ViewWADetailsUtility._createTableHeaderToolbar("","Parts"); 
					compTable.setHeaderToolbar(compTableHeaderToolBar); 
					wspanel.addContent(compTable);
					
					oIconTabFilter.addContent(wspanel);
				}
			}
			
		
			var iconTB = callingControl.getView().byId("idIconTabBar");
			iconTB.addItem(oIconTabFilter);
		}
		if(typeof iconTB != "undefined" && iconTB.getItems().length > 0)
			iconTB.setSelectedKey(0);
			
	},
	/**
	 * created by Ashok Sarkar
	 * set selected key of each drop down(of Operation number) of component table
	 */
	doSelectedKeyOfPartOperDD : function(compTable,comp){
		for(var i=0;i<compTable.getItems().length;i++){
			var rows = compTable.getItems()[i];
			var dd = rows.getCells()[0];
			dd.setSelectedKey(comp[i].Operation);
		}
	},
	
	/**
	 * Created by Ashok Sarkar
	 */
	_addIconTabBarFilter : function(obj,callingControl){
		var oIconTabFilter = new sap.m.IconTabFilter({
			text : obj.engSlNo, // string
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
		return oIconTabFilter;
	},
	
	/**
	 * Created by Ashok Sarkar
	 */
	_addWorkScopeHdr : function(obj,oEng){
		var wsPanel = new sap.m.Panel({
			width : "100%", // sap.ui.core.CSSSize
			//height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : false, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			backgroundDesign : sap.m.BackgroundDesign.Translucent, // sap.m.BackgroundDesign, since 1.30
		});
		
		
		wsPanel.attachExpand(function(oEvent){
			var val = oEvent.getSource().getContent()[0].getContent()[0].getValue();
			if(val == null || val == "" || val == undefined)
			{
				oEvent.getSource().getContent()[0].setExpanded(false);
			}
			else
			{
				oEvent.getSource().getContent()[0].setExpanded(true);
			}
			var x = sap.ui.getCore().byId(oEvent.getSource().getContent()[0].getContent()[0].sId);
			var isExpanded = x.getParent().getParent().getExpanded();
			var id = oEvent.getSource().getContent()[0].getContent()[0].sId;
			if(isExpanded){
				workScopeOpened.add(id);
			}
			else{
				workScopeOpened.delete(id);	
			}
		});
		
		
	
		var wsPanelToolBar = new sap.m.Toolbar();
		wsPanelToolBar.addContent(new sap.m.Title({
			text : obj.wrkscpname,
			tooltip : obj.wrkscpname,
			width: "400px"
		}));
		
		wsPanelToolBar.addContent(new sap.m.ToolbarSpacer());
		wsPanelToolBar.addContent(new sap.m.ToolbarSpacer({width:"20px"}));
		
		wsPanelToolBar.addContent(new sap.m.Title({text : "Reason for Work"}));
		
		var reason = new sap.m.Input({
			id:"R"+oEng.engSlNo+obj.workscopekey,
			visible: true, // boolean
			value: obj.reason, // string
			width: "25%", // sap.ui.core.CSSSize
			type: sap.m.InputType.Text, // sap.m.InputType
			maxLength: 70, // int
		});
		var that = this;
		reason.attachChange(
	    		   function(){
	    			   console.log("changes.......");
	    			   pwc.app.js.ViewWADetailsUtility._reasonChange(this);
	    		   }
			    );
		
		wsPanelToolBar.addContent(reason);
		wsPanelToolBar.addContent(new sap.m.ToolbarSpacer());
		
		
		 var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
		 if(waTopAndHdrModel.getData().ViewOnly != "X"){
				//copy workscope disabled till production release
				wsPanelToolBar.addContent(new sap.ui.core.Icon({
					src : "sap-icon://copy", // sap.ui.core.URI
					size : "1.5rem", // sap.ui.core.CSSSize
					color : "#2A2727", // string
					width : "2rem", // sap.ui.core.CSSSize
					height : "2rem", // sap.ui.core.CSSSize
					decorative : true, // boolean, since 1.16.4
					useIconTooltip : true, // boolean, since 1.30.0
					alt : "Copy WorkScope", // string, since 1.30.0
					noTabStop : false, // boolean, since 1.30.1
					tooltip : "Copy WorkScope", // sap.ui.core.TooltipBase
					press : [ function(oEvent) {
						var detailsController = waDetailController;//splitAppInstance.getDetailPages()[1].oController
						detailsController.handleCopyWS(oEvent);
					}, this ]
				}));
			 
		 }
		
		wsPanel.setHeaderToolbar(wsPanelToolBar);
		
		return wsPanel;
	
	},
	
	/**
	 * Created by Ashok Sarkar
	 */
	_addWorkScopeText : function(wsPanel,obj,oEng){
		var that = this;
		var subPanel = new sap.m.Panel({
			width : "100%", // sap.ui.core.CSSSize
			//height : "200px", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : true, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			headerText :"Workscope Text",
			backgroundDesign : sap.m.BackgroundDesign.Translucent, // sap.m.BackgroundDesign, since 1.30
		});	
		var oInput = new sap.m.TextArea({id:"W"+oEng.engSlNo+obj.workscopekey});
		oInput.setValue(obj.freetext);
		oInput.setRows(6);
		oInput.setCols(255);
		oInput.attachChange(
	    		   function(){
	    			   console.log("changes.......");
	    			   pwc.app.js.ViewWADetailsUtility._workScopeLongTextChange(this);
	    		   }
			    );
		
		
		var txt = oInput.getValue();
		if(txt == null || txt == "" || txt == undefined)
		{
			subPanel.setExpanded(false);
		}
		
		
		subPanel.addContent(oInput);
		wsPanel.addContent(subPanel);
	},
	
	/**
	 * Created by Ashok Sarkar
	 * This method adds the ADD, EDIT and DELETE buttons in the Operations (Labour) table
	 */
	_createTableHeaderToolbar : function(key,tblHdrName){
		var labourTableHeaderToolBar = new sap.m.Toolbar();
		labourTableHeaderToolBar.addContent(new sap.m.Title({text : tblHdrName}));//.addStyleClass("panelTitle"));
		labourTableHeaderToolBar.addContent(new sap.m.ToolbarSpacer());
		
		 var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
		 if(waTopAndHdrModel.getData().ViewOnly != "X"){
			 var addBtnToolTip = "Add Operation";
				var delBtnToolTip = "Delete Operation(s)";
				if(tblHdrName == "Parts"){
					addBtnToolTip = "Add Part";
					delBtnToolTip = "Delete Part(s)";
				}
				labourTableHeaderToolBar.addContent(new sap.ui.core.Icon({
					src : "sap-icon://add", // sap.ui.core.URI
					size : "1.5rem", // sap.ui.core.CSSSize
					color : "#2A2727", // string
					width : "2rem", // sap.ui.core.CSSSize
					height : "2rem", // sap.ui.core.CSSSize
					decorative : true, // boolean, since 1.16.4
					useIconTooltip : true, // boolean, since 1.30.0
					alt : "Copy WorkScope", // string, since 1.30.0
					noTabStop : false, // boolean, since 1.30.1
					tooltip : addBtnToolTip, // sap.ui.core.TooltipBase
//					id : key,
					press : [ function(oEvent) {
						var control = oEvent.getSource();
						var detailsController = waDetailController;
						detailsController.handleOperationComponentAdd(oEvent);
					}, this ]}));
				
				
				key = "del"+key;
				labourTableHeaderToolBar.addContent(new sap.ui.core.Icon({
					src : "sap-icon://delete", // sap.ui.core.URI
					size : "1.5rem", // sap.ui.core.CSSSize
					color : "#2A2727", // string
					width : "2rem", // sap.ui.core.CSSSize
					height : "2rem", // sap.ui.core.CSSSize
					decorative : true, // boolean, since 1.16.4
					useIconTooltip : true, // boolean, since 1.30.0
					alt : "Delete Parts", // string, since 1.30.0
					noTabStop : false, // boolean, since 1.30.1
					tooltip : delBtnToolTip, // sap.ui.core.TooltipBase
//					id : key,
					press : [ function(oEvent) {
						var control = oEvent.getSource();
						var detailsController = waDetailController;
						detailsController.handleOperationComponentDelete(oEvent);
					}, this ]}));
		 }
		
		
		
		return labourTableHeaderToolBar;
	},
	
	/**
	 * Created by Ashok Sarkar
	 */
	_addOperations : function(screenWidth,oper,thisContext,modelName,key){
		
		var pixels = screenWidth;
		
		var oprtWidth;
		var descWidth;
		var quantityWidth;
		var priceWidth;
		var vendorWidth;
		var commWidth;

		var oprtHeaderWidth;
		var descHeaderWidth;
		var quantityHeaderWidth;
		var priceHeaderWidth;
		var vendorHeaderWidth;
		var commHeaderWidth;
		var revHeaderWidth;
		if(pixels < 1300)
		{
			oprtWidth = "92px";
			descWidth = "430px";
			priceWidth = "110px";
			vendorWidth = "211px";
			commWidth = "208px";

			oprtHeaderWidth = "22px";
			descHeaderWidth = "135px";
			priceHeaderWidth = "23px";
			vendorHeaderWidth = "58px";
			commHeaderWidth = "58px";
			revHeaderWidth = "1px";
		}
		else
		{
			oprtWidth = "95px";
			descWidth = "458px";
			priceWidth = "114px";
			vendorWidth = "221px";
			commWidth = "220px";

			oprtHeaderWidth = "22px";
			descHeaderWidth = "135px";
			priceHeaderWidth = "23px";
			vendorHeaderWidth = "58px";
			commHeaderWidth = "58px";
			revHeaderWidth = "1px";
		}
		
		modelName += "oper";
		var data = {"oper" :oper};
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(data);
		
		var oTemplate = new sap.m.ColumnListItem({ 
			vAlign: "Middle", 
	 		cells : [
	
	 			new sap.m.Input({value:'{Operation}',width : oprtWidth, maxLength : 4 , editable:false,change: [function (oEvent) {
					var control = oEvent.getSource();
					var detailsController = waDetailController;
					detailsController.changeTaskOperationNumber(oEvent);
				}, this]}),
	 			new sap.m.Input({value:'{OperationDesc}',width: descWidth , maxLength : 40 , change:[function(oEvent){
	 				if(oEvent.getSource().getParent().getModel().getProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag") !=  "A")
	 				{
	 					oEvent.getSource().getParent().getModel().setProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag","E");
	 				    //pwc.app.js.ViewWADetailsUtility.setRevOnEdit(oEvent);
	 				}
	 			},this]}),
	 			new sap.m.Input({value:'{Price}', width: priceWidth , maxLength : 11, change:[function(oEvent){
	 				
	 				var inputBox = oEvent.getSource();
	 				var isValiedPrice = pwc.app.js.ViewWADetailsUtility.priceValidation(inputBox.getValue());
	 				var workscopeText = oEvent.getSource().getParent().getParent().getParent().getHeaderToolbar().getContent()[0].getText();
	 				var operation = oEvent.getSource().getParent().getModel().getProperty(oEvent.getSource().getParent().getBindingContextPath() + "/Operation");
	 				var sid = oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().getSelectedKey();
	 				var noOfEngines = oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().getItems().length;
	 				var engineNo;
	 				for(var i = 0 ; i < noOfEngines ; i++)
	 				{
	 					if(sid == oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().getItems()[i].sId)
	 					{
	 						engineNo = oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().getItems()[i].getText();
	 					}
	 				}
	 				
	 				if(isValiedPrice == true)
	 				{
	 					if(oEvent.getSource().getParent().getModel().getProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag") !=  "A")
		 				{ 
		 					oEvent.getSource().getParent().getModel().setProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag","E");
		 					//pwc.app.js.ViewWADetailsUtility.setRevOnEdit(oEvent);
		 				}
	 				}
	 				else
	 				{
	 					sap.m.MessageBox.alert("Provide correct Price [e.g: 99999999.99] in operation# "+ operation + " of workscope:"+ workscopeText + " of Engine:" + engineNo , {
							title: "Error Message",
							icon: sap.m.MessageBox.Icon.ERROR,
							onClose: null,
							styleClass: ""
					});
	 				}
	 			},this]}),
	 			
	 			new sap.m.Input({value:'{ServicePrvd}',tooltip:'{ServicePrvd}',width: vendorWidth ,editable:false}),
	 			new sap.m.Button({textDirection: "LTR", text:'{LongText}',tooltip:'{LongText}',width: commWidth , press : [ function(oEvent) {
					var control = oEvent.getSource();
					console.log("comments text....");
					var table = "";
					var operno = control.getParent().getCells()[0].getValue(); //TODO if component table's newly added 
					if(control.getParent().getParent().mBindingInfos.items.path.indexOf("oper")> -1){
						table = control.getModel().getData().oper;
					}
					else{
						table = control.getModel().getData().comp;
					}
					var model = control.getModel();
					var obj = {
							"Text" : control.getText(),
							"table" : table,
							"operno" : operno,
							"model" : model
						};
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(obj);
					if (!thisContext._commentsForTable) {
						thisContext._commentsForTable = sap.ui.xmlfragment("pwc.app.fragment.CommentsForTables", thisContext);
					      thisContext.getView().addDependent(this._commentsForTable);
					}
					
					
					thisContext._commentsForTable.setModel(oModel);
					
					   jQuery.sap.syncStyleClass("sapUiSizeCompact", thisContext.getView(), thisContext._commentsForTable);
					   thisContext._commentsForTable.openBy(control);
					
				}, this ]}),
	 			
	 		/*	new sap.m.TextArea({value : '{LongText}', rows: 1,cols:35 , maxLength : 1333, change:[function(oEvent){
	 				if(oEvent.getSource().getParent().getModel().getProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag") !=  "A")
	 				{
	 				  oEvent.getSource().getParent().getModel().setProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag","E");
	 				 // pwc.app.js.ViewWADetailsUtility.setRevOnEdit(oEvent);
	 				}
	 			},this]}),*/
	 			new sap.m.Label({text:"{= ${RevisionNum} > 0 ? 'Rev'+${RevisionNum} : '' }",editable:false})
	 		] 	
		}); 
	        
        var vendorHBox = new sap.m.HBox({alignContent:sap.m.FlexAlignContent.Center});
        vendorHBox.addItem(new sap.m.Label({text:"Service Provider  ",design:sap.m.LabelDesign.Bold,hAlign:sap.ui.core.TextAlign.Center}));


        var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
		 if(waTopAndHdrModel.getData().ViewOnly != "X"){
			 vendorHBox.addItem(new sap.ui.core.Icon({
		        	src : "sap-icon://search", // sap.ui.core.URI
					size : "1.5rem", // sap.ui.core.CSSSize
					color : "#2A2727", // string
					width : "1.5rem", // sap.ui.core.CSSSize
					height : "1rem", // sap.ui.core.CSSSize
					decorative : true, // boolean, since 1.16.4
					useIconTooltip : true, // boolean, since 1.30.0
					alt : "Search Vendor", // string, since 1.30.0
					noTabStop : false, // boolean, since 1.30.1
					tooltip : "Search Vendor", // sap.ui.core.TooltipBase
					press : [ function(oEvent) {
						var control = oEvent.getSource();
						var detailsController = waDetailController;
						detailsController.loadSearchVendorDialog(oEvent);
					}, this ]
		        }));	 
		 }
        
        screenWidth = (parseInt(screenWidth) - 1).toString() + "px";
        console.log("operation... " + screenWidth);
		var labourTable = new sap.m.Table({
			headerDesign : sap.m.ListHeaderDesign.Standard, // sap.m.ListHeaderDesign, since 1.14
			mode : sap.m.ListMode.MultiSelect, // sap.m.ListMode
			width : "100%", // sap.ui.core.CSSSize
			noDataText : undefined, // string
			showNoData : true, // boolean
			items : {path:"/oper",template:oTemplate}, // sap.m.ListItemBase
			id : key,
			columns: [
				new sap.m.Column({header: new sap.m.Label({text:"Oper #",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width: oprtHeaderWidth }),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: new sap.m.Label({text:"Description",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width: descHeaderWidth }),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: new sap.m.Label({text:"Price",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width: priceHeaderWidth }),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: vendorHBox,hAlign:sap.ui.core.TextAlign.Left,width: vendorHeaderWidth }),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: new sap.m.Label({text:"Comments",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width: commHeaderWidth }),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: new sap.m.Label({text:"Rev ",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width: revHeaderWidth })
				
//		        new sap.m.Column({header: new sap.m.Label({text:"Description",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width:"104px"}),
//		        new sap.m.Column({header: new sap.m.Label({text:"Price",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width:"20px"}),
//		        new sap.m.Column({header: vendorHBox,hAlign:sap.ui.core.TextAlign.Left,width:"71px"}),
//		        new sap.m.Column({header: new sap.m.Label({text:"Comments",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width:"77px"}),
//		        new sap.m.Column({header: new sap.m.Label({text:"Rev",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width:"1px"})


		    ],
		});
		labourTable.setModel(oModel);
		labourTable.attachUpdateFinished(function(oEvent) {
			if(labourTable.getItems().length != 0)
			{
				labourTable.getItems()[labourTable.getItems().length-1].getCells()[0].focus();
			}
		});
		
		return labourTable;
	},
	
	priceValidation : function(price)
	{
		if(isNaN(price))
        {
			return false
			
        }
		
		if(price < 0)
		{
			return false;
		}
		else
		{
			var dindex = price.indexOf(".");
            var intpart; 
            var decpart;
            if(dindex != -1 )
            {
                   intpart = price.substring(0,dindex);
                   decpart = price.substring(dindex+1, price.length);
                   if(intpart.length > 8 || decpart.length > 2 )
                   {
                	  return false;
                   }
                   else
                   {
                	  return true;
                   }
            }
            else
            {
                   if(price.length > 8)
                   {
                	   return false;
            	   }
                   else
                   {
                	   return true;
                   }
            }
            return true;
		}
            
	},

	setRevOnEdit :  function(oEvent){
		var x = oEvent.getSource();
		var flag = x.getModel().getProperty(x.getBindingContext() + "/flag");
		if(flag == "E"){
			var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
			var hdrRev = waTopAndHdrModel.getData().RevisionNum;
	        if(typeof hdrRev != "undefined" && hdrRev != ""){
	        	hdrRev = (parseInt(hdrRev) + 1).toString();
	        	x.getModel().setProperty(x.getBindingContext() + "/RevisionNum",hdrRev);
	        }
		}
	},
	
	changePartsOperationNumberDD : function(oEvent){
		console.log("hell.... " +oEvent.getSource().getSelectedItem().getKey());
		console.log(oEvent.mParameters.value);
		var chval = oEvent.getSource().getSelectedKey();
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
			var oldValue = oEvent.getSource().getDomRefForValueStateMessage().firstChild.innerText;
			oEvent.getSource().setValue(oldValue);
			var cntrl = oEvent.getSource();
			cntrl.focus();
			pwc.app.js.CommonUtility.validationMessage("Operation Number "+chval+" not found in Task table","Error Message",sap.m.MessageBox.Icon.ERROR);
			return;
		}

		//if changed value is correct then keep the old operation number within the model for saving.
		var r = oEvent.getSource().getParent(); //get the table row
		var m = r.getModel().getData(); // get the model from trable row
		var indx = r.sId.substring(r.sId.lastIndexOf("-")+1); //get the index value of model from table row
		var rm = m.comp[parseInt(indx)]; //get the model row
		if(rm.flag == "E"){
			rm.OldPartOperNum = oEvent.getSource().getDomRefForValueStateMessage().firstChild.innerText; //keep an old part's operation number within model
			
			var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
			var hdrRev = waTopAndHdrModel.getData().RevisionNum;
	        if(typeof hdrRev != "undefined" && hdrRev != ""){
	        	rm.RevisionNum = (parseInt(hdrRev) + 1).toString();
	        }
		}
		rm.Operation = chval;
		
		
	},
	
	/**
	 * Created by Ashok Sarkar
	 */
	_addComponent : function(screenWidth, comp,thisContext,modelName,oItemTemplate,mModel){
		var pixels = screenWidth;
		var oprtWidth;
		var prthboxWidth;
		var prtNoWidth;
		var descWidth;
		var quantityWidth;
		var priceWidth;
		var vendorWidth;
		var commWidth;
		
		var oprtHeaderWidth;
		var prtNoHeaderWidth;
		var descHeaderWidth;
		var quantityHeaderWidth;
		var priceHeaderWidth;
		var vendorHeaderWidth;
		var commHeaderWidth;
		var revHeaderWidth;
		
		if(pixels < 1300)
		{
			oprtWidth = "92px";
			prthboxWidth = "228px";
			prtNoWidth = "176px";
			descWidth = "175px";
			quantityWidth = "44px";
			priceWidth = "112px";
			vendorWidth = "209px";
			commWidth = "208px";
			oprtHeaderWidth = "22px";
			prtNoHeaderWidth = "58px";
			descHeaderWidth = "46px";
			quantityHeaderWidth = "2px";
			priceHeaderWidth = "23px";
			vendorHeaderWidth = "58px";
			commHeaderWidth = "58px";
			revHeaderWidth = "1px"
		}
		else
		{
			oprtWidth = "95px";
			prthboxWidth = "228px";
			prtNoWidth = "185px";
			descWidth = "185px";
			quantityWidth = "47px";
			priceWidth = "112px";
			vendorWidth = "220px";
			commWidth = "220px";
			oprtHeaderWidth = "22px";
			prtNoHeaderWidth = "56px";
			descHeaderWidth = "46px";
			quantityHeaderWidth = "2px";
			priceHeaderWidth = "23px";
			vendorHeaderWidth = "58px";
			commHeaderWidth = "58px";
			revHeaderWidth = "1px"
			
		}
		
		modelName += "comp";
		if(typeof comp != "undefined"){
			for(var k=0;k<comp.length;k++){
				comp[k].PartQuantity = comp[k].PartQuantity.trim();
			}	
		}
		var data = {"comp" :comp};
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(data);
		var vendorHBox = new sap.m.HBox({alignContent:sap.m.FlexAlignContent.Center});
	    vendorHBox.addItem(new sap.m.Label({text:"Service Provider  ",design:sap.m.LabelDesign.Bold,hAlign:sap.ui.core.TextAlign.Center}));
	    var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
		if(waTopAndHdrModel.getData().ViewOnly != "X"){
			vendorHBox.addItem(new sap.ui.core.Icon({
				src : "sap-icon://search", // sap.ui.core.URI
				size : "1.5rem", // sap.ui.core.CSSSize
				color : "#2A2727", // string
				width : "1.5rem", // sap.ui.core.CSSSize
				height : "1rem", // sap.ui.core.CSSSize
				decorative : true, // boolean, since 1.16.4
				useIconTooltip : true, // boolean, since 1.30.0
				alt : "Search Vendor", // string, since 1.30.0
				noTabStop : false, // boolean, since 1.30.1
				tooltip : "Search Vendor", // sap.ui.core.TooltipBase
				press : [ function(oEvent) {
					var control = oEvent.getSource();
					var detailsController = waDetailController;
					detailsController.loadSearchVendorDialog(oEvent);
				}, this ]
			}).addStyleClass());
		}
	    
	    
		var partnoHBox = new sap.m.HBox({alignContent:sap.m.FlexAlignContent.Center, width : prthboxWidth });
	    partnoHBox.addItem(new sap.m.Input({value:'{PartNumber}',tooltip:'{PartNumber}',width: prtNoWidth ,editable:false}));
	    
	    var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
		 //if(waTopAndHdrModel.getData().ViewOnly != "X"){
			 partnoHBox.addItem(new sap.ui.core.Icon({
			    	src : "sap-icon://search", // sap.ui.core.URI
					size : "2em",
					decorative : true, // boolean, since 1.16.4
					useIconTooltip : true, // boolean, since 1.30.0
					alt : "Copy WorkScope", // string, since 1.30.0
					noTabStop : false, // boolean, since 1.30.1
					tooltip : "Search Parts", // sap.ui.core.TooltipBase
					press : [ function(oEvent) {
						var control = oEvent.getSource();
						var detailsController = waDetailController;
						detailsController.loadSearchPartsDialog(oEvent);
					}, this ]
		    }).addStyleClass("pwcSearchIconMargin"));	 
		// }
	    
	      
		var partdd = new sap.m.Select({enabled : false,width: oprtWidth ,items : {
	        path : "/operDropDown",
	        template :oItemTemplate,
	        templateShareable : true
	    },
	    change: [function (oEvent) {
			var control = oEvent.getSource();
			pwc.app.js.ViewWADetailsUtility.changePartsOperationNumberDD(oEvent);
			
			
			if(oEvent.getSource().getParent().getModel().getProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag") !=  "A")
				{
				  oEvent.getSource().getParent().getModel().setProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag","E");
				}
			
			
		}, this]});
		partdd.addStyleClass("setMaxWidth");
		partdd.setModel(mModel);

		var oTemplate = new sap.m.ColumnListItem({ 
			vAlign: "Middle", 
	 		cells : [
	 			partdd,
	 			partnoHBox,
	 			new sap.m.Input({value:"{PartDesc}",tooltip:'{PartDesc}',width : descWidth, editable:false, maxLength : 40 ,change:[function(oEvent){
	 				if(oEvent.getSource().getParent().getModel().getProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag") !=  "A")
	 				{
	 				  oEvent.getSource().getParent().getModel().setProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag","E");
	 				}
	 				  //pwc.app.js.ViewWADetailsUtility.setRevOnEdit(oEvent);
	 			},this]}),
	 			new sap.m.Input({value:"{path: 'PartQuantity', type: 'sap.ui.model.type.Integer', constraints:{minimum:0}}", width : quantityWidth ,editable:false, maxLength : 17,change:[function(oEvent){
	 				if(oEvent.getSource().getParent().getModel().getProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag") !=  "A")
	 				{
	 				  oEvent.getSource().getParent().getModel().setProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag","E");
	 				}
	 				//pwc.app.js.ViewWADetailsUtility.setRevOnEdit(oEvent);
	 			},this]}),
	 			new sap.m.Label({text:'{Price}',editable:false , width : priceWidth }),
	 			new sap.m.Input({value:'{ServicePrvd}',tooltip:'{ServicePrvd}',width: vendorWidth ,editable:false}),
	 			new sap.m.Button({textDirection: "LTR", tooltip:'{LongText}',text:'{LongText}',width: commWidth , press : [ function(oEvent) {
					var control = oEvent.getSource();
					console.log("comments text....");
					var tblindx ="";
					var operno = ""; 
					if(control.getParent().getParent().mBindingInfos.items.path.indexOf("oper")> -1){
						operno = control.getParent().getCells()[0].getValue(); 
					}
					else{
						operno = control.getParent().getCells()[0].getSelectedKey();
						var indx = control.getParent().sId.lastIndexOf("-");
						tblindx = control.getParent().sId.substring(indx + 1);
					}
					
					var model = control.getModel();
					var obj = {
							"Text" : control.getText(),
							"operno" : operno,
							"model" : model,
							"tblindx" : tblindx
						};
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(obj);
					if (!thisContext._commentsForTable) {
						thisContext._commentsForTable = sap.ui.xmlfragment("pwc.app.fragment.CommentsForTables", thisContext);
					      thisContext.getView().addDependent(this._commentsForTable);
					}
					thisContext._commentsForTable.setModel(oModel);
					
					   jQuery.sap.syncStyleClass("sapUiSizeCompact", thisContext.getView(), thisContext._commentsForTable);
					   thisContext._commentsForTable.openBy(control);
					
				}, this ]}),
	 			/*new sap.m.TextArea({value : '{LongText}',rows: 1,cols:25, maxLength : 1333, change:[function(oEvent){
	 				if(oEvent.getSource().getParent().getModel().getProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag") !=  "A")
	 				{
	 				  oEvent.getSource().getParent().getModel().setProperty(oEvent.getSource().getParent().getBindingContextPath() + "/flag","E");
	 				}
	 				//pwc.app.js.ViewWADetailsUtility.setRevOnEdit(oEvent);
	 			},this]}),*/
	 			new sap.m.Label({text:"{= ${RevisionNum} > 0 ? 'Rev'+${RevisionNum} : '' }",editable:false})
	 		] 
		});
	
		
		screenWidth = (parseInt(screenWidth) - 1).toString() + "px";
		var partsTable = new sap.m.Table({
			headerDesign : sap.m.ListHeaderDesign.Standard, // sap.m.ListHeaderDesign, since 1.14
			mode : sap.m.ListMode.MultiSelect, // sap.m.ListMode
			width : "100%", // sap.ui.core.CSSSize
			noDataText : undefined, // string
			showNoData : true, // boolean
			items : {path:"/comp",template:oTemplate}, // sap.m.ListItemBase
			columns: [
				new sap.m.Column({header: new sap.m.Label({text:"Oper #",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width: oprtHeaderWidth }),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: new sap.m.Label({text:"Part Number",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width : prtNoHeaderWidth}),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: new sap.m.Label({text:"Description",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width : descHeaderWidth}),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: new sap.m.Label({text:"Qty",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width : quantityHeaderWidth}),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: new sap.m.Label({text:"Price",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width : priceHeaderWidth}),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: vendorHBox,hAlign:sap.ui.core.TextAlign.Left,width : vendorHeaderWidth}),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: new sap.m.Label({text:"Comments",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width : commHeaderWidth }),
		        new sap.m.Column({demandPopin:true,minScreenWidth:screenWidth,header: new sap.m.Label({text:"Rev ",design:sap.m.LabelDesign.Bold}),hAlign:sap.ui.core.TextAlign.Left,width : revHeaderWidth })
		    ],
		});
		partsTable.setModel(oModel);
		partsTable.attachUpdateFinished(function(oEvent) {
			if(partsTable.getItems().length != 0)
			{
			partsTable.getItems()[partsTable.getItems().length-1].getCells()[0].focus();
			}
		});
		
		
		if(data.comp.length > 0)
		{
		  var waTopAndHdrModel = sap.ui.getCore().getModel("waTopAndHdrModel");
		 // var max = 0;
		  for(var i = 0 ; i < data.comp.length ; i++)
		  {
			 var rev = data.comp[i].RevisionNum;
			 if(rev != "" && parseInt(rev) <= parseInt(waTopAndHdrModel.getData().RevisionNum)) 
			 {
				 partsTable.getItems()[i].getCells()[0].setEnabled(true);
				 partsTable.getItems()[i].getCells()[3].setEditable(false);
				 
				 var x = partsTable.getItems()[i].getCells()[1].getItems()[1];//search icon
				 x.setVisible(false);
				 partsTable.getItems()[i].getCells()[2].setEditable(false);
			 }
			 else 
			 {
				 partsTable.getItems()[i].getCells()[0].setEnabled(true);
				 partsTable.getItems()[i].getCells()[2].setEditable(true);
				 partsTable.getItems()[i].getCells()[3].setEditable(true);
			 }
		  }
		}
		
		
		return partsTable;
	},
	
}