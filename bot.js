#!/usr/bin/node

const Twit = require("twit");
const watcher = require("./watcher");

const APIKEY = process.env.APIKEY;
const APISECRETKEY = process.env.APISECRETKEY;
const ACCESSTOKEN = process.env.ACCESSTOKEN;
const ACCESSTOKENSECRET = process.env.ACCESSTOKENSECRET;
const INAUSERNAME = process.env.INAUSERNAME;
const INAPWD = process.env.INAPWD;
const watchtime = 3*60*60*1000;

var app = new Twit({
	consumer_key: APIKEY,
	consumer_secret: APISECRETKEY,
	access_token: ACCESSTOKEN,
	access_token_secret: ACCESSTOKENSECRET 
});




function tweet(content) {

	let params = {
		status : content
	}

	app.post('statuses/update', params, (err, data, response) => {

		// console.log(data)
	})
}
// tweet("Night gathers, and now my watch begins.");

// initiate watcher
var fatt = new watcher(INAUSERNAME, INAPWD);

fatt.login(() => {
	fatt.setCourses();
});

// chech update every 3 hours, then tweet about it
setInterval(() => {
	fatt.login(() => {
		
		let update = fatt.isUpdate();

		if (update.updated) {
			fatt.updateCourses();
			tweet(`${update.course_name} is up 
				check it out at ${fatt.url_six}`);
		} else {
			tweet(`No update yet, please wait`);
		}

	});


}, watchtime);