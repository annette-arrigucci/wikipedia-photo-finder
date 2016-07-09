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
      			var myTitle = x.query.search[0].title;
      			alert(myTitle);
      			$.ajax(url, {
      				dataType: 'jsonp',
      				url: url,
      				data: { action: 'query', titles: myTitle, prop: 'images', format: 'json' },
      				success: function (y) {
      					
      					//put the pages object into an array so we can navigate to the pageid and access the images array
      					$.each(y.query.pages, function(index,item) {
      						//myImagesArray = item;
      						getImages(item.images);
      					});
      				}
      			});
      		}
      	});
	}

	function getImages(myImages) {
    	//given an array of image names, make API call to get image file info for each image
    	//store the URL in an array then display the images on the page
    	var myImageArrayUrls = [];
    	var url = "https://en.wikipedia.org/w/api.php";
    	$.each(myImages, function(index,item) {
    		var myTitle = item.title;
    		//alert(myTitle);
      		$.ajax(	url, {
      				dataType: 'jsonp',
      				url: url,
      				data: { action: 'query', titles: myTitle, prop: 'imageinfo', iiprop: 'url', iiurlwidth: '220', format: 'json'},
      				success: function (y) {
      					
      					//put the pages object into an array so we can navigate to the pageid and access the image info
      					$.each(y.query.pages, function(index,item) {
      						//myImagesArray = item;
      						//alert(index);
      						var myPhotoUrl = item.imageinfo[0].thumburl;
      						//alert(myPhotoUrl);
							myImageArrayUrls.push(myPhotoUrl);
      						//alert(item.imageinfo.thumburl);
      					});
      					showImages(myImageArrayUrls);
      				}
      			});
      	});
    	
    	//alert(myImageArrayUrls[0]);
	}

	function showImages(imageUrls) {
		$(".photo-display").empty();
		$.each(imageUrls, function (index, item) {
			//alert(item);
			var myHtml = "<div class='returned-photo'><a href='" + item + "' target='_blank'><img src='" + item + "' alt='photo-result' width='200'></a></div>";
			$(".photo-display").append(myHtml);
		});
	}
});