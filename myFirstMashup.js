/*global require, alert*/
/*
 * 
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var config = {
	host: window.location.hostname,
	prefix: "/",
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
	qlik.setOnError( function ( error ) {
		alert( error.message );
	} );

	//callbacks -- inserted here --
	function hyperCube_FC_N(reply, app){
		console.log(reply);
		/*var valueArray = [];
        //loop through the rows of the cube and push the values into the array
        $.each(reply.qHyperCube.qDataPages[0].qMatrix, function(index, value) {
            if (!this[0].qIsEmpty) {
                valueArray.push(this[1].qNum);
            }
            //create the pie chart
        });
		$("#sparkline").sparkline(valueArray, {
    		type: 'tristate',
    		posBarColor: '#00bf00',
			width: $("#sparkline").width(),
            height: $("#sparkline").height()
		});*/
		
        /*$("#pieChart").sparkline(valueArray, {
            type: 'pie',
            width: $("#pieChart").width(),
            height: $("#pieChart").height()
        });*/
	}

	function Dropdownlist_Regions(reply, app){
		//console.log("Test fonction remplissage de dropdown");
		$('#myRegionDropDown .dropdown ul').empty()  
		//console.log("1");
		$.each(reply.qListObject.qDataPages[0].qMatrix, function(key, value) {  
			//console.log("2 - " + value[0].qText); 
				if (typeof value[0].qText !== 'undefined') { 
					console.log("3 - " + value[0].qText); 
					$('#myRegionDropDown .dropdown ul').append('<li><a data-select="'+ value[0].qText+'" href="#">'+ value[0].qText+'</a></li>')
					.on( "click", "[data-select]", function() {  
					var value = $(this).data('select');  
					//console.log("4 - Listener on " + value);
					$('#myRegionDropDown .dropdown button').html(value + ' <span class="caret"></span>');  
					app.field('Region').selectMatch(value, false);  
					}); 
				}
		}); 
	}

	//open apps -- inserted here --
	var app = qlik.openApp('4508f0bd-60ea-4f4e-aa19-31e9ee8ed27d', config);
	
	//get objects -- inserted here --
	app.getObject('BarChartHoriz_revenue','ZMbPeHA'); 
	
	//create cubes and lists -- inserted here --
	app.createList({
		"qFrequencyMode": "V",
		"qDef": {
				"qFieldDefs": [
						"Region"
				]
		},
		"qExpressions": [],
		"qInitialDataFetch": [
				{
						"qHeight": 20,
						"qWidth": 1
				}
		],
		//"qLibraryId": null
	},Dropdownlist_Regions);
	app.createCube({
	"qInitialDataFetch": [
		{
			"qHeight": 12,
			"qWidth": 2
		}
	],
	"qDimensions": [
		{
			"qDef": {
				"qFieldDefs": [
					"Date_ID"
				]
			}
			/*,
			"qNullSuppression": true,
			"qOtherTotalSpec": {
				"qOtherMode": "OTHER_OFF",
				"qSuppressOther": true,
				"qOtherSortMode": "OTHER_SORT_DESCENDING",
				"qOtherCounted": {
					"qv": "5"
				},
				"qOtherLimitMode": "OTHER_GE_LIMIT"
			}*/
		}
	],
	"qMeasures": [
		{
			"qDef": {
				"qDef": "Sum({<Date_ID={'>=$(vCurrentYearFrom)<=$(vCurrentYearTo)'}>} [Cons Selling FC])"
			},
			"qLabel": "Sum({<Date_ID={'>=$(vCurrentYearFrom)<=$(vCurrentYearTo)'}>} [Cons Selling FC])",
			/*//"qLibraryId": null,
			"qSortBy": {
				"qSortByState": 0,
				"qSortByFrequency": 0,
				"qSortByNumeric": 0,
				"qSortByAscii": 1,
				"qSortByLoadOrder": 0,
				"qSortByExpression": 0,
				"qExpression": {
					"qv": " "
				}
			}*/
		}
	]/*,
	"qSuppressZero": false,
	"qSuppressMissing": false,
	"qMode": "P",
	"qInterColumnSortOrder": [],
	"qStateName": "$"*/
	},hyperCube_FC_N);
} );