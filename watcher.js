const Browser = require("zombie");



class watcher {

	constructor(username, password) {
		this.username = username;
		this.password = password;
		this.browser = new Browser();
		this.courses = {};
		this.url_ina = "https://login.itb.ac.id/cas/login?service=https%3A%2F%2Fakademik.itb.ac.id%2Flogin%2FINA";
		// this.url_ina = "https://login.itb.ac.id/cas/login";
		this.url_six = "https://akademik.itb.ac.id";
	}

	login() {
		console.log("Login INA");

		this.browser.visit(this.url_ina, () => {

			console.log("filling username");
			this.browser.fill("username", this.username)
			.then(() => {
				this.browser.fill("password", this.password);
				console.log("filling password");
			})
			.then(() => {
				this.browser.pressButton("submit", () => {
					console.log("submitting form");

					console.log(this.browser.cookies);
					console.log("=======================");
					// console.log(this.browser.html());
					this.browser.visit(`${this.url_six}/app/mahasiswa:13517122/statusmhs`, () => {
						console.log("status mhs");
						console.log(this.browser.html('table'));
					})
				})
			})
		});
		

		// this.browser.visit(this.url_ina)
		// .then(() => {
		// 	console.log("filling username");
		// 	this.browser.fill("#username", this.username)
		// 	.then(() => {
		// 		this.browser.fill("#password", this.password);
		// 		console.log("FIlling password");
		// 	})
		// 	.then(() => {
		// 		console.log("Submitting form")
		// 		this.browser.pressButton("submit")
		// 	})
		// 	.then(() => {
		// 		console.log(this.browser.dump())
		// 		this.browser.wait()
		// 		console.log("wait...")
		// 	})
		// 	.then(() => {
		// 		console.log(this.browser.dump())
		// 		console.log(this.browser.html())
		// 		this.browser.visit(this.url_six);
		// 		console.log("go to six");
		// 	})
		// 	.then(() => {
		// 		console.log(this.browser.dump());
		// 	}) 
		// })
		// .catch(err => {
		// 	console.log(err);
		// })
	}

	setCourses() {
		this.courses["course_name"] = "marks";
	}

	isCourseUpdate() {
		return this.courses == "fetched data from six ";
	}

	
}


module.exports = watcher;