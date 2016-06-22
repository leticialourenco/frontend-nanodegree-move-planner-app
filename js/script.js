
function loadData() {

	var $body = $('body');
	var $wikiElem = $('#wikipedia-links');
	var $nytHeaderElem = $('#nytimes-header');
	var $nytElem = $('#nytimes-articles');
	var $greeting = $('#greeting');
	var $content = $('.content');

	/* clear out old data before new request
	*/
	$wikiElem.text("");
	$nytElem.text("");
   
	/* get the values of form inputs
	*/
	var street = $('#street').val();
	var city = $('#city').val();
	/* edit greeting message
	*/
	$greeting.text('So, you want to live at '+ street + ', ' + city + '?');
	/* load Google Streetview
	*/
	var mapsUrl = 'https://maps.googleapis.com/maps/api/streetview?size=1200x600&location='+ street + '+' + city;
	$body.append('<img class="bgimg" src="'+ mapsUrl +'">');
	
	/* format NYTimes url
	*/
	var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	nytUrl += '?' + $.param({
	  'q': city,
	  'sort': 'newest',
	  'api-key': "9da87b6ffbca4e45bd5c6410566eda8a"
	});
	/* NYTimes AJAX request
	*/
	$.getJSON(nytUrl, function(data){
		/* select the articles on the json and display 'em
		*/
		var articles = data.response.docs;
		for(var i = 0; i < articles.length; i++){
			var article = articles[i];
			$nytElem.append('<li class="article">'+
				'<a href="'+ article.web_url+'">'+
				article.headline.main+'</a>'+
				'<p>'+ article.snippet + '</p>'+
				'</li>');
		};
	}).error(function(e){
		$nytHeaderElem.text('New York Times Articles could not be loaded');
	});

	/* format Wikipedia url 
	*/
	var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';
	/* manage errors on wikipedia request
	*/
	var wikiRequestTimeout = setTimeout(function(){
		$wikiElem.text('Failes to get Wikipedia resources');
	}, 8000);
	/* Wikipedia AJAX request 
	*/
	$.ajax({
	   url: wikiUrl,
	   dataType: "jsonp",
	   //jsonp: "callback",
	   success: function(response) {
			var articleList = response[1];

			for(var i=0; i<articleList.length; i++){
				articleStr = articleList[i];
				var url = 'http://en.wikipedia.org/wiki/' + articleStr;
				$wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
			};

			$content.addClass('loaded');
			clearTimeout(wikiRequestTimeout);
	   } 
	});

	return false;
};

$('#form-container').submit(loadData);
