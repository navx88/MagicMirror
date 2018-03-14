jQuery(function($){
	poll = function(){
		$.ajax({
		url: "../Kinect/testVariables.txt",
		dataType: 'text',
		type: 'get',
		cache:false,
		success: function (data){
			$("#output").text(data);
			$("#output").text('blah');
		},
		error: function(){
			console.log('Error');
		}
	});
	},	
	pollInterval = setInterval(function(){
		poll();
	}, 5000);
	poll();
});
