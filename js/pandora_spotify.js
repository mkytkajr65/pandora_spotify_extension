$(document).ready(function(){
	 // select the target node
	var target = $(".artistSummary");

	if (target.length>0){
	    target = target[0];
	}else{
		console.log("Pandora With Spotify DOM error");
	}
	//var target = document.getElementsByClassName('artistSummary')[0];

	 
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	  	var trackTitle = $(".songTitle").html();
		var trackArtist = $(".artistSummary").html();
		var trackAlbumTitle = $(".albumTitle").html();
	 	 trackTitle = trackTitle.replace(/\(.*?\)|[,]/g,'').replace('Film Score', '').trim().replace(/ /g, '+');
	 	 trackArtist = trackArtist.replace(/\(.*?\)|[,]/g,'').trim().replace(/ /g, '+');
	 	 trackAlbumTitle = trackAlbumTitle.replace(/\(.*?\)|[,]/g,'').replace('Film Score', '').trim().replace(/ /g, '+');

	 	 var searchTermWithAlbumTitle = trackTitle + "+" + trackArtist + "+" + trackAlbumTitle;

	 	 var searchTermWithOutAlbumTitle = trackTitle + "+" + trackArtist;

	 	 var finalJSONURLWithAlbumTitle = 'https://api.spotify.com/v1/search?q=' + searchTermWithAlbumTitle + '&type=track';

	 	 var finalJSONURLWithOutAlbumTitle = 'https://api.spotify.com/v1/search?q=' + searchTermWithOutAlbumTitle + '&type=track';

	 	 var finalJSONURLOnlyAlbum = 'https://api.spotify.com/v1/search?q=' + trackAlbumTitle + '&type=album';

	 	 $.getJSON(finalJSONURLWithAlbumTitle, function(query) {
              console.log(query);
              if(query.tracks.total>0){
              	window.open(query.tracks.items[0].uri, "_self");
              }else{
              	$.getJSON(finalJSONURLWithOutAlbumTitle, function(queryNext) {
	              console.log(queryNext);
	              if(queryNext.tracks.total>0){
	              	window.open(queryNext.tracks.items[0].uri, "_self");
	              }else{
	              	$.getJSON(finalJSONURLOnlyAlbum, function(queryLast) {
		              console.log(queryLast);
		              if(queryLast.albums.total>0){
		              	window.open(queryLast.albums.items[0].uri, "_self");
		              }else{
		              	alert("Error: Could not get song from spotify")
		              }
	           		});
	              }
           		});
              }
           });

	 	 //var win = window.open(finalJSONURL, '_blank');
	});
	 
	// configuration of the observer:
	var config = { attributes: true, childList: false, characterData: false };
	 
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
});