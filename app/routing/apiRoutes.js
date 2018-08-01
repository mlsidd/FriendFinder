var friendsArray = require('../data/friends');

// Displays all possible friends
app.get("/api/friends", function (req, res) {
    return res.json(friendsArray);
});

// validate form fields as user is filling it out
$('#name').on('input', function () {
    var input = $(this);
    var is_name = input.val();
    if (is_name) { input.removeClass("invalid").addClass("valid"); }
    else { input.removeClass("valid").addClass("invalid"); }
});
$('#picture').on('input', function () {
    var input = $(this);
    var is_pic = input.val();
    if (is_pic) { input.removeClass("invalid").addClass("valid"); }
    else { input.removeClass("valid").addClass("invalid"); }
});
$('.question').on('select', function () {
    var select = $(this);
    var is_selected = select.val();
    if (is_selected) { select.removeClass("invalid").addClass("valid"); }
    else { select.removeClass("valid").addClass("invalid"); }
});

// on click event for submit button
$("#submit").click(function (event) {
    var form_data = $("#userInputForm").serializeArray();
    var error_free = true;
    for (var input in form_data) {
        var element = $("#userInputForm_" + form_data[input]['name']);
        var valid = element.hasClass("valid");
        var error_element = $("span", element.parent());
        if (!valid) { error_element.removeClass("error").addClass("error_show"); error_free = false; }
        else { error_element.removeClass("error_show").addClass("error"); }
    }
    if (!error_free) {
        event.preventDefault();
    }
    else {
        // Create an object to hold what the user inputted
        var userSurveyData = {
            name: $("#name").val(),
            picture: $("#picture").val(),
            scores: [
                $("#question1").val(),
                $("#question2").val(),
                $("#question3").val(),
                $("#question4").val(),
                $("#question5").val(),
                $("#question6").val(),
                $("#question7").val(),
                $("#question8").val(),
                $("#question9").val(),
                $("#question10").val()
            ]
        };
        friendsArray.push(userSurveyData)
    }

    var bestMatch;
    var match;

    // create function for calculating score difference
    function calculateDifference(currentUser, userFromArray) {
        for (var i = 0; i <= 10; i++) {
            var difference = difference + Math.abs(currentUser.scores[i] - userFromArray.scores[i]);
        return difference;
        }
    };

    if (calculateDifference(userSurveyData, friendsArray[0]) < calculateDifference(userSurveyData, friendsArray[1])) {
        bestMatch = calculateDifference(userSurveyData, friendsArray[0]);
        match = friendsArray[0].name;
    } else {
        bestMatch = calculateDifference(userSurveyData, friendsArray[1]);
        match = friendsArray[1].name;
    }

    // Loop through friends array to check each person's score with the user's score
    for (var s = 2; s < friendsArray.length; s++) {
        if (calculateDifference(userSurveyData, friendsArray[s]) < bestMatch) {
            bestMatch = calculateDifference(userSurveyData, friendsArray[s]);
            match = friendsArray[s].name;
        };
    }

        //  post the data to the friends API.
        app.post("/api/friends", userSurveyData, function (data) {
            // add the user input into the friends array from friends.js

            $("#match").text(data.name);
            $("#matchPicture").attr("src", data.picture);

            // Show the modal with the best match
            $("#results-modal").modal("toggle");
        });
    });


