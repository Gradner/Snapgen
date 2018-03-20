// Load Libraries

var webshot = require('webshot');
var fs = require('fs');

// set output directory
baseDir = './snaps/'

// set input JSON file location (required values are title and baseUrl)
file = './pageUrls.json'

// Set of options for webshot library
options = {
	// The size of the browser window to use when creating images
	windowSize: {width: 1024, height: 768},
	// The size of the image to be created (measured from top left
	// of window size)
	shotSize: {width: 'window', height: 'window'},
	// Offset to move around shotSize box on windowSize page
	shotOffset: { left: 0, right: 0, top: 0, bottom: 0},
	// Time to wait after page-load to generate image
	renderDelay: 1000,
	// Do you want an error if status is not 200?
	errorIfStatusIsNot200: false,
	// Amount of time to wait before giving up on page that won't load
	timeout: 0,
	// Can be switched between 'url' to generate image from url, 'html'
	// to generate image from HTML string or 'file' to generate image
	// from local HTML file
	siteType: 'url',
	// Can adjust the compression here for smaller image file size
	quality: 75,
	// Option to add a plain white background behind transparent content
	defaultWhiteBackground: false
}

// Load and parse the JSON Data

let loadData = new Promise((resolve, reject)=>{
	fs.readFile(file, (err, data)=>{
		data = JSON.parse(data)
		return resolve(data);
		if(err){
			console.log(err);
		} else {
			resolve(data);
		}
	});
});

// Once data is loaded, for each item in JSON file create screenshot

loadData.then((data)=>{
	for(i in data){
		webshot(data[i].baseUrl, './snaps/' + data[i].baseUrl + '.png', options, (err)=>{
			console.log('image written to disk')
		});
	}
})