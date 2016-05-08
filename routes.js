"use strict";

module.exports = function (app) {

    function generateRandomAnswer() {
        var arr = ["heads", "tails"];
        return arr[Math.floor(Math.random() * arr.length)];
    }

    var results = {
        wins: 0,
        loses: 0
    };

    app.post("/flip", function (req, res, next) {
        var call = req.body.call;
        if (call !== "heads" && call !== "tails") {
            next(new Error("Call value should be 'heads' or 'tails'! "));
            return;
        }

        if (call === generateRandomAnswer()) {
            results.wins++;
            res.json({
                result: "win"
            });
        } else {
            results.loses++;
            res.json({
                result: "lose"
            });
        }
    });

    app.get("/stats", function (req, res) {
        res.json(results);
    });

};
