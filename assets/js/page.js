$(document).ready(function(){
 

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
			var prodWrap = $('#page-production');
			prodWrap.find('p.last-updated span').text(data.modified);
			prodWrap.find('input.title').val(data.title.rendered);
			$('#page-production textarea').val(data.content.rendered);
	});



	// Get Staging
	$.get( stag +'pages/' + stagID, function(data){
			var prodWrap = $('#page-staging');
			prodWrap.find('p.last-updated span').text(data.modified);
			prodWrap.find('input.title').val(data.title.rendered);
			$('#page-staging textarea').val(data.content.rendered);
	});


	// Clicked to send content to Staging
	$('#to-staging').click(function(){
		var c = window.confirm("Are you sure?");
		if(c === true){
			move('staging', stagID);
		}
	});

	// Clicked to send content to Production
	$('#to-production').click(function(){
		var c = window.confirm("Are you sure?");
		if(c === true){
			move('production', prodID);
		}
	});


	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

	function move(direction, id){
		if(direction === 'staging'){
			var baseURL = stag;
			var text = 'production';
		} else {
			var baseURL = prod;
			var text = 'staging';
		}

		var formData = $('#page-'+ text + ' textarea').serialize();

		$.ajax({
			url: baseURL + 'pages/' + id,
			type: 'PUT',
			crossDomain: true,
		    dataType: 'json',
   			data: formData,
		    beforeSend: function ( xhr ) {
		        xhr.setRequestHeader( 
		        	'Authorization', 'Basic ' + Base64.encode( 'admin_ravenna:KqMw Tj0r pREN tGaP' ) // sV8g LtY9 81fn QZMh 
		        );
		    },
			success: function(data, txtStatus, xhr){
		        console.log( data );
		        $('#page-'+ direction + ' textarea').val(data.content.rendered);
        	},
			error: function(data, txtStatus, xhr){
		        //console.log( data );
		        console.log( xhr.status );
			}
		});
	}
	
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