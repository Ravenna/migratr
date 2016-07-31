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



	function getProductionPages(callback){
		// Get Pages From Production

		$.ajax({
			url: prod + 'pages/',
			type: 'GET',
			success: function(data){
				var prodPages = new Array();
				$.each(data, function(index, page){

					// Get id, slug and title
					var newPage = new Page();
					newPage.title = page.title;
					newPage.slug = page.slug;
					newPage.id = page.id;

					// Add page to Array
					prodPages.push(newPage);
				});
				return prodPages;

			},
			error: function(){
				alert('ERROR');
			}
		});
	}


	var pages = getProductionPages();

	console.log(pages);

	



	
});