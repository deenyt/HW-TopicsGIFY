

$( document ).ready(function() {
	// topics 1 dimensional array to load buttons
	var	topics = ["Tulip","Rose","Lilly",
		"Daffodil","Geranium","Orchids",
		"Daisies","Sunflowers","Aconite",
		"Allium"]
	// variable to hold what topic, var's used to be more generic	
	var theTopics = "flower";

	// The first execution, display the buttons then wait for a
	//     button to be clicked
	//  *****************************
	putUpTopicButtons();
	console.log('buttons up');
	getInfoFromAPI(theTopics);
	//  *****************************

	// ========================================================
	/*  display 1 question and 4 answer choices */
	function putUpTopicButtons (){
		$(".buttnContainer").empty();
		for (var i = 0; i < topics.length; i++) {
		    var j = $('<button>');
		    j.data('theTopics',topics[i]); // Added a data-attribute
		    console.log(j.data('theTopics'));
		    j.attr('data-index', i);
		    j.addClass('buttnCntr');  // use for button selection
		   var tempto = j.addClass('buttnCntr'); 
		   console.log('tempto',tempto);
	   		j.text(topics[i]);
	   		$(".buttnContainer").append(j);			   
		}
	}
	// ========================================================
	// This function displays how many correct or wrong or unanswered
	//    after all qustions have been gone through
	function getNewTopic ()  {

		var x = $("#flower").val().trim();
			console.log('x', x);
			$("#flower").empty();
			return x;
	}

	// function to add a new topic on the end of the array
	function addToTopicArray (newTopic) {	
		topics.push(newTopic);
		putUpTopicButtons();
	}

	// get the API information
	function getInfoFromAPI (whichTopic) {
		console.log(whichTopic);
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + whichTopic+ "&api_key=dc6zaTOxFJmzC&limit=10";																			
    	$.ajax({url: queryURL, method: 'GET'})
     		.done(function(response) {
        		var results = response.data;
    			console.log(results);
       			for (var i=0; i < results.length; i++) {
           			if (results[i].rating == "r" || results[i].rating == "pg-13")
           			{   // don't get 'R' or 'pg-13'
           			}
           			else {
               			var gifDiv = $("<div>");
               			var rating = results[i].rating;
               			var p = $("<p>").text( "Rating: " + rating);
                		var topicImage = $("<img>");

               			topicImage.attr("src", results[i].images.fixed_height.url);
               			topicImage.attr("data-still", results[i].images.downsized_still.url);
               			topicImage.attr("data-animate", results[i].images.fixed_height.url);
               			// add a class to track and a state if animating or not
               			topicImage.addClass("eachImage");
               			//var tempstuff = topicImage.addClass("eachImage");
               			//console.log("tempstuff",tempstuff);
               			topicImage.data("state", "still");
               			var holdst = topicImage.data("state", "still");
               			console.log ("holdst",holdst);
               			gifDiv.append(p);
               			gifDiv.append(topicImage);
               			$(".theImagesContainer").append(gifDiv);
               			
           			}
        		}
    	});
	}

  // if click on a topic button then put up new images
	$('.buttnCntr').on('click', function() {
   		var temptopic = $(this).data('theTopics');
    	console.log("new var", temptopic);
    	$('.theImagesContainer').empty();
    	getInfoFromAPI(temptopic);
  
	});
	
	// if click on an image use the state attribute to animate or not
	$(".theImagesContainer").on('click', function() {
		//$(this).data('state');
		var holdstate = $(this).data('state');
		console.log("state", holdstate);
		var holdclass = $(this).show();
		console.log("class", holdclass);

			if ( holdstate == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

	});

	//  if click submit to add another topic to array and display
	$("#Submit").on("click", function() { 
		console.log('clic');
		var y = getNewTopic();
		if (y != "") {
			addToTopicArray(y);
			putUpTopicButtons();
			document.getElementById("inpTopicsForm").reset();
			console.log("came to submit");
			return false;
		}
	});
	
});	