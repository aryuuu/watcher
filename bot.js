#!/usr/bin/node

const Twit = require("twit");
const watcher = require("./watcher");

const APIKEY = process.env.APIKEY;
const APISECRETKEY = process.env.APISECRETKEY;
const ACCESSTOKEN = process.env.ACCESSTOKEN;
const ACCESSTOKENSECRET = process.env.ACCESSTOKENSECRET;
const INAUSERNAME = process.env.INAUSERNAME;
const INAPWD = process.env.INAPWD;

var app = new Twit({
	consumer_key: APIKEY,
	consumer_secret: APISECRETKEY,
	access_token: ACCESSTOKEN,
	access_token_secret: ACCESSTOKENSECRET 
});


var fatt = new watcher(INAUSERNAME, INAPWD);


function tweet(content) {

	let params = {
		status : content
	}

	app.post('statuses/update', params, (err, data, response) => {

		console.log(data)
	})
}

