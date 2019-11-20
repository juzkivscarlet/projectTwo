// gather input from login modal
function gatherLoginForm() {
    var formData = {
        username: $("#login-username").val().trim(),
        password: $("#login-password").val().trim()
    };

    // run function userLogin()
    userLogin(formData.username, formData.password);

    // empty input fields
    $("#login-username").val("");
    $("#login-password").val("");
}

// log user in
function userLogin(user,pass) {
    // POST request to /login
    $.post("/login", {
        username: user,
        password: pass
    }).then(() => {
        // reload /
        window.location.replace("/");
    }).catch((err) => {
        throw err;
    });
}