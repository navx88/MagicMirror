jQuery(function($){
	var isChanged = false;
	var prevGestureInt = 0;
	var currentGesture = 0;

	$('.theApp').hide();

	poll = function(){
		$.ajax({
		url: "../Kinect/testVariables.txt",
		dataType: 'text',
		type: 'get',
		cache:false,
		success: function (data){
			var kinectInt = data.split(" ");
			var gesture = kinectInt[0];
			kinectInt = parseInt(kinectInt[1]);

			if (kinectInt > prevGestureInt){
				isChanged = true;
				prevGestureInt = kinectInt;
			
				currentGesture = gesture; 

			}
		},
		error: function(){
			console.log('Error');
		}
	});
	},	
	pollInterval = setInterval(function(){
		poll();

		if(isChanged){
			var appHovered = $(".selected").attr("id");

			if (currentGesture == "R"){
				$("#"+ appHovered).removeClass("selected");
				appHovered = parseInt(appHovered);
				var nextApp = 0;

				if ( appHovered == 5 ){
					nextApp = 1;
				} else {
					nextApp = appHovered + 1;
				}

				$("#" + String(nextApp)).addClass("selected");
			}

			if (currentGesture == "L"){
				$("#"+ appHovered).removeClass("selected");
				appHovered = parseInt(appHovered);
				var prevApp = 0;

				if ( appHovered == 1 ){
					prevApp = 5;
				} else {
					prevApp = appHovered - 1;
				}

				$("#" + String(prevApp)).addClass("selected");
			}

			if (currentGesture == "P"){
				$(".theApp").show();
				$(".mainMenu").hide();
			}

			if (currentGesture == "B"){
				$('.theApp').hide();
				$(".mainMenu").show();
			}

			isChanged = false;
		}

	}, 1000);
	poll();
});
