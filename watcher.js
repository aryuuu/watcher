const Browser = require("zombie");


class watcher {

	constructor(username, password) {
		this.username = username;
		this.password = password;
		this.browser = new Browser();
		this.course_names = [];
		this.courses = {};
		this.url_ina = "https://login.itb.ac.id/cas/login?service=https%3A%2F%2Fakademik.itb.ac.id%2Flogin%2FINA";
		this.url_six = "https://akademik.itb.ac.id";
	}

	login(callback) {

		if (callback === undefined) {
			callback = () => {};
		}

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

					// console.log(this.browser.cookies);
					console.log("=======================");
					
					this.browser.visit(`${this.url_six}/app/mahasiswa:13517122/statusmhs`, () => {
						console.log("status mhs");
						callback();
					})
				})
			})
		});
		

	}

	setCourses() {
		
		var rows = this.browser.html('table')
					.split(`<table class="table table-striped table-condensed">`)[3]
					.split(`</table>`)[0]
					.split(`<tr>`);

		for (let i = 2; i < rows.length; i++) {
			
			let course = rows[i].split("<td>")[2];
			let course_name = course.split("</td>")[0];
			this.course_names.push(course_name);
			this.courses[course_name] = course;
		}

		this.course_names.forEach(cn => {
			console.log(cn);
			console.log(this.courses[cn]);
		});
		
		
	}

	isUpdate() {
		var rows = this.browser.html('table')
					.split(`<table class="table table-striped table-condensed">`)[3]
					.split(`</table>`)[0]
					.split(`<tr>`);

		var course = []
		for (let i = 2; i < rows.length; i++) {
			
			course.push(rows[i].split("<td>")[2]);
			
		}

		for (let i = 0; i < this.course_names; i++) {
			if (this.courses[this.course_names[i]] != course[i]) {
				return {updated: true, course_name: this.course_names[i]};
			}
			
		}

		return {updated : false};
	}

	updateCourses() {
		var rows = this.browser.html('table')
					.split(`<table class="table table-striped table-condensed">`)[3]
					.split(`</table>`)[0]
					.split(`<tr>`);

		var course = [];
		for (let i = 2; i < rows.length; i++) {
			course.push(rows[i].split("<td>")[2]);
		}

		for (let i = 0; i < this.course_names.length; i++) {
			this.courses[this.course_names[i]] = course[i];
		}

		
	}

	
}


module.exports = watcher;