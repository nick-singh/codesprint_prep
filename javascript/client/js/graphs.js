(function(window){

	//Special Note on Flot:
	//	Flot is a jquery library. It cannot be used independently of jQuery.
	//	There are many of libraries that are independent of jQuery, however
	//	we are of the opinion that this library is one of the easiest to use.
	//	Importantly with ease of use comes a trade off with flexibility.
	// 	For more flexiblity consider d3 or nvd3 (explored later)

	//Required Knowledge
	//	1. JS (of course)
	//	2. AJAX
	//	3. jQuery



	$(document).ready(function(){ // Safe way to run code at start-up of page
		if ($('#flot').length > 0){
			build_flot_g1();
			build_flot_g2();
		}
		
	});

	function build_flot_g1(){
		var url = "./data/crop_produc_index.json"; // Load data from local server.
		$.get(url, function(data){ //The Get Function has much more features found at: http://api.jquery.com/jQuery.get/
			
			var gData = [];//Data to be used for the graph
			//Data should be extracted from the data retrieved from the Server
			$(data[1]).each(function(index, element){
				// We know the Library Expects the data [[x1, y1],[x2,y2]]
				//Therefore we extract the Information we want for analysis
				gData.push([element.date, element.value]); 
			});

			//There are many options that Can be used to enable a greater level of display options
			//
			var data_options = {
				data: gData,
				lines: {show:true},
				//bars: {show: true}, // Flot makes it easy to convert a line graph to a bar chart
				points: {show: true}
			};

			$.plot(
				$('#graph1'), 	// The name of the Area to draw the graph
				[data_options]	// The array of data to be visualized on graph identified
				);
		});
	}


	function build_flot_g2(){
		var url = "./data/crop_produc_index.json"; // Load data from local server.
		var gData = [];
		var graph;
		var fullData;
		$.get(url, function(data){	
			fullData = data[1];		
			$(data[1]).each(function(index, element){
				gData.push([element.date, element.value]); 
			});

			var data_options = { // Data Options
				data: gData
			};
			var g_options = { // Grid Options
				series: {
                   lines: { show: false },
                   points: { show: true }
               },
               grid: { hoverable: true, clickable: true }  	// We set the hoverable and clickable properties to true
               												// This allows you attach functionality to these events
			};
			graph = $.plot(
				$('#graph2'), 	// The name of the Area to draw the graph
				[data_options],	// The array of data to be visualized on graph identified
				g_options		// The graph options control properties of the overall graph
			);
		});

		// Assign Functionality to the Events:
		$("#graph2").bind("plothover", function (event, pos, item) {
			if (item){// We hovered over a data point
				//console.dir(pos);
			}
		});
		$("#graph2").bind("plotclick", function (event, pos, item) {
			if (item){// we clicked on a data point
				//console.dir(item);
				// console.dir(fullData[item.dataIndex]);
				//Using the dataIndex we can identify what value was selected. We can only do this because of the way
				//we extracted information from the object in the first place
				var html = "<p>Country: "+fullData[item.dataIndex].country.value+"</p>";
				html += "<p>Date: "+fullData[item.dataIndex].date+"</p>";
				html += "<p>Value: "+fullData[item.dataIndex].value+"</p>";
				//Adds the HTML generated above to the section dedicated to display information
				$('#section').html(html);
			}
		});
	}
	


}(this));