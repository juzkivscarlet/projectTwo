// Main function to register new user
function registerUser() {

	// Get all data from form
	var formData = {
		firstName: $("#firstName").val().trim(),
		lastName: $("#lastName").val().trim(),
		email: $("#email").val().trim(),
		username: $("#username").val().trim(),
		password: $("#password").val().trim(),
		confirmPassword: $("#confirmPassword").val().trim()
	};

	// Run function validateSignup with formData -- if true, submit data
	if(validateSignup(formData)) {

		// Make sure first letter of firstName & lastName are uppercase
		formData.firstName[0] = formData.firstName[0].toUpperCase();
		formData.lastName[0] = formData.lastName[0].toUpperCase();

		// Compile formData for submission: concat firstName and lastName
		var submittedInfo = {
			name: [formData.firstName,formData.lastName].join(" "),
			username: formData.username,
			email: formData.email,
			password: formData.password
		};

		// POST request to /signup with submittedInfo
		$.ajax({
			type: 'POST',
			url: '/signup',
			data: submittedInfo,
			dataType: 'json'
		}).then(() => {
			// Fade modal out, then reload home page
			$("#signup-modal").fadeOut(500);
			setTimeout(() => {
				$("#signup-modal").modal('hide');
				window.location.href = "/";
			},1000);
		});

	} else if(!validateSignup(formData)) {
		// if validateSignup returns false, does not reload page, keeps modal on page

		// bounce modal (animation)
		$("#signup-modal").animate({
			top: '-5%',
			opacity: '0.4'
		},500);

		setTimeout(() => {
			$("#signup-modal").animate({
				top: '0%',
				opacity: '1.0'
			},1000);
		},500);
	}

}

// Initialize array for errors
var invalidValues = [];

// function to validate signup form
function validateSignup(form) {
	// reset errors & error messages
	invalidValues = [];
	$("#signup-errors").empty();

	// if username is empty
	if(form.username==='') {
		invalidValues.push("Username is required");
	}

	// if email is empty
	if(form.email=='') {
		invalidValues.push('Email is required');
	}

	// if either firstName and/or lastName are empty
	if(form.firstName=='' || form.lastName=='') {
		invalidValues.push("Full name is required.");
	}

	// if password length is not between 8-20 characters
	if(form.password.length < 8 || form.password.length > 20) {
		invalidValues.push("Password must be between 8 and 20 characters");
	}

	// if password & confirmPassword aren't equal
	if(form.password!=form.confirmPassword) {
		invalidValues.push("Password & confirm password must be identical.");
	}

	// Regex validation for email input
	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)==false){
		invalidValues.push("Email must be valid");
	}

	// Regex validation for password, only letters and numbers
	if(form.password.match(/[^(a-z|A-Z|0-9)]/)) {
		invalidValues.push("Passwords may only contain letters (uppercase or lowercase) and numbers");
	}

	// Regex validation for names
	if(form.firstName.match(/[^(a-z|A-Z)]/) || form.lastName.match(/[^(a-z|A-Z)]/)) {
		invalidValues.push("Names can only contain uppercase and lowercase letters.");
	}

	// if no errors
	if(invalidValues.length != 0) {
		// create new list, append each error, put in div with id='signup-errors'
		var errorsList = $("<ul>");
		for(var i=0; i<invalidValues.length; i++) {
			errorsList.append($("<li>").text(invalidValues[i]).addClass("font-italic"));
		}
		$("#signup-errors").append(errorsList);
		return false;
	} else {
		return true;
	}
}