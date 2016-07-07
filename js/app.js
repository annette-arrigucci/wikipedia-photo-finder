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
      			$.ajax(url, {
      				dataType: 'jsonp',
      				url: url,
      				data: { action: 'query', titles: myTitle, prop: 'images', format: 'json' },
      				success: function (y) {
      					alert(y.query.pages);
      				}
      			});
      		}
      	});
	}

	function showResults(myResults) {
    	
	}
});