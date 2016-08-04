$(document).ready(function(){

	$('.summernote').summernote();


	///////////////////
	// GLOBAL VARS
	///////////////////
	var prod = 'http://migrator-one.ravennainteractive.com/wp-json/wp/v2/';
	var stag = 'http://migrator-two.ravennainteractive.com/wp-json/wp/v2/';



	///////////////////
	// PAGE
	///////////////////
	var prodID =  getUrlVars()['prodID'];
	var stagID =  getUrlVars()['stagID'];
	

	// Get Production
	$.get( prod +'pages/' + prodID, function(data){
			console.log(data);
			var prodWrap = $('#page-production');
			console.log(data.title.rendered);
			prodWrap.find('p.last-updated span').text(data.modified);
			prodWrap.find('input.title').val(data.title.rendered);
			$('#page-production .summernote').summernote('code', data.content.rendered);
	});



	// Get Staging
	$.get( stag +'pages/' + stagID, function(data){
			console.log(data);
			var prodWrap = $('#page-staging');
			console.log(data.title.rendered);
			prodWrap.find('p.last-updated span').text(data.modified);
			prodWrap.find('input.title').val(data.title.rendered);
			$('#page-staging .summernote').summernote('code', data.content.rendered);
	});

	
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