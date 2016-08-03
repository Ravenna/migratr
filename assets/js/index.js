$(document).ready(function(){


	///////////////////
	// GLOBAL VARS
	///////////////////
	var prod = 'http://migrator-one.ravennainteractive.com/wp-json/wp/v2/';
	var stag = 'http://migrator-two.ravennainteractive.com/wp-json/wp/v2/';



	///////////////////
	// INDEX
	///////////////////


	// TODO
	// Get Pages
	// Loop over pages in both Prod and Stag arrays and output a list of links for the ones
	// with the same slug
	// Set links in loop to page.php?slug=foo&prodId=bar&stagId=bat

	function getProdPages(){
		$.ajax({
			url: prod + 'pages/',
			type: 'GET',
			async: false,
			success: function(data){
				$.each(data, function(index, page){
					$('#prod-pages-list').append('<li data-slug="'+ page.slug +'"><a href="page.php?slug='+ page.slug +'&prodID='+ page.id +'">'+ page.title.rendered +'</a></li>');
				});
			},
			error: function(){
				alert('ERROR');
			}
		});
	}

	function getStagPages(){
		$.ajax({
			url: stag + 'pages/',
			type: 'GET',
			async: false,
			success: function(data){
				$.each(data, function(index, page){
					var li = $('#prod-pages-list').find('li[data-slug="'+ page.slug +'"]');
					var href = li.find('a').attr('href');
					if(href){
						li.find('a').attr('href', href + '&stagID='+ page.id +'');
					} else {
						li.addClass('error');
					}
				});
			},
			error: function(){
				alert('ERROR');
			}
		});
	}

	getProdPages();
	getStagPages();

	
});