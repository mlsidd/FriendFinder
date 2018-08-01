  // Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "home.html"));
  });

// Route that sends the user to the survey
app.get("/survey", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "survey.html"));
  });


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  