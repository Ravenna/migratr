$(document).ready(function(){

	///////////////////
	// GLOBAL VARS
	///////////////////
	var prod = 'http://migrator-one.ravennainteractive.com/wp-json/wp/v2/';
	var stag = 'http://migrator-two.ravennainteractive.com/wp-json/wp/v2/';



	///////////////////
	// PAGE
	///////////////////

	var slug =  getUrlVars()['slug'];
	

	// Get Production
	$.get( prod +'pages/', function(data){
		console.log(data);
		$.each(data, function(index, page){
			$('#prod-pages-list').append('<li data-id="'+ page.id +'"><a href="page.php/?slug='+ page.slug +'"">'+ page.title.rendered +'</a></li>');
		});

	});



	// GET STAGING


	
});


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}