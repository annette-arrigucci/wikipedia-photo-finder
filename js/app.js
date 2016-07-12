$(document).ready(function(){
	$("#search").click(function(event) {
		event.preventDefault();
		var mySearchTerm = $("#topic-search").val();
		getRequest(mySearchTerm);
	});

	
    function getRequest(searchTerm) {
    	var url = "https://en.wikipedia.org/w/api.php";
      $.ajax(url, {
      		dataType: 'jsonp',
      		url: url,
      		data: { action: 'query', list: 'search', srsearch: searchTerm, format: 'json' },
      		/*type: 'POST',
      		headers: {'Api-User-Agent': 'Example/1.0'},
      		action: query,*/
      		success: function (x) {
      			$(".photo-display").empty();
      			var myTitle = x.query.search[0].title;
      			var myWiki = "https://en.wikipedia.org/wiki/" + myTitle;
      			$("#url-search-result").attr("href", myWiki);
      			$("#url-search-result-name").text(myWiki);
      			$.ajax(url, {
      				dataType: 'jsonp',
      				url: url,
      				data: { action: 'query', titles: myTitle, prop: 'images', format: 'json' },
      				success: function (y) {
      					
      					//put the pages object into an array so we can navigate to the pageid and access the images array
      					$.each(y.query.pages, function(index,item) {
      						getImages(item.images);
      					});
      				}
      			});
      		}
      	});
	}

	function getImages(myImages) {
    	//given an array of image names, make API call to get image file info for each image
    	var url = "https://en.wikipedia.org/w/api.php";
    	
    	$.each(myImages, function(index,item) {
    		var myTitle = item.title;
      		$.ajax(	url, {
      				dataType: 'jsonp',
      				url: url,
      				data: { action: 'query', titles: myTitle, prop: 'imageinfo', iiprop: 'url', iiurlwidth: '220', format: 'json'},
      				success: function (y) {
      					//put the pages object into an array so we can navigate to the pageid and access the image info
      					
      					$.each(y.query.pages, function(index,item) {
      						var myThumbUrl = item.imageinfo[0].thumburl;
      						var myLargeUrl = item.imageinfo[0].url;
      						//display the image
      						showImage(myThumbUrl, myLargeUrl);
      					});
      					
      				}
      			});
      	});
	}

	function showImage(thumbImageUrl, largeImageUrl) {
		var myHtml = "<div class='returned-photo'><a href='" + largeImageUrl + "' target='_blank'><img src='" + thumbImageUrl + "' alt='photo-result' width='200'></a></div>";
		$(".photo-display").append(myHtml);
	}
});