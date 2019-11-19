// Initialize array for errors
var errors = [];

// Main function to register new user
function registerUser() {

    // Get all data from form
    var formData = {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        email: $("#email").val(),
        username: $("#username").val(),
        password: $("#password").val(),
        confirmPassword: $("#confirmPassword").val()
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
        }).done((data) => {
            // Fade modal out, then reload home page
            $("#signup-modal").fadeOut(500);
            setTimeout(() => {
                $("#signup-modal").modal('hide');
                window.location.href = "/";
            },1000);
        });

    } else {
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

// function to validate signup form
var validateSignup = (form) => {
    // reset errors & error messages
    errors = [];
    $("#signup-errors").empty();

    // if username is empty
    if(form.username==='') {
        errors.push("Username is required");
    }

    // if email is empty
    if(form.email=='') {
        errors.push('Email is required');
    }

    // if either firstName and/or lastName are empty
    if(form.firstName=='' || form.lastName=='') {
        errors.push("Full name is required.");
    }

    // if password length is not between 8-20 characters
    if(form.password.length < 8 || form.password.length > 20) {
        errors.push("Password must be between 8 and 20 characters");
    }

    // if password & confirmPassword aren't equal
    if(form.password!=form.confirmPassword) {
        errors.push("Password & confirm password must be identical.");
    }

    // Run function validateInputs for regex validation
    validateInputs(form);

    // if no errors
    if(errors.length > 0) {
        // create new list, append each error, put in div with id='signup-errors'
        var errorsList = $("<ul>");
        for(var i=0; i<errors.length; i++) {
            errorsList.append($("<li>").text(errors[i]).addClass("font-italic"));
        }
        $("#signup-errors").append(errorsList);
        return false;
    } else {
        return true;
    }
};

var validateInputs = (form) => {
    // Regex validation for email input
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)==false){
        errors.push("Email must be valid");
    }

    // Regex validation for password, only letters and numbers
    if(form.password.match(/[^(a-z|A-Z|0-9)]/)) {
        errors.push("Passwords may only contain letters (uppercase or lowercase) and numbers");
    }

    // Regex validation for names
    if(form.firstName.match(/[^(a-z|A-Z)]/) || form.lastName.match(/[^(a-z|A-Z)]/)) {
        errors.push("Names can only contain uppercase and lowercase letters.")
    }
    
};