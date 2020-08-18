const express = require('express');
var http = require('http');
var request = require('request');
var ejs = require('ejs');
var app = express();


app.get("/", function (req, res) {
    var city = "Mathura";
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=bfeefe2a38ecc69dce4e30cf4525a703`;

    request(url, function (error, response, body) {

        if (response.statusCode != 200) {
            res.render("error");
        } else {
            var weatherInfo = JSON.parse(body);
            var weather = {
                city: city,
                temperature: Math.round((weatherInfo.main.temp - 32) * 5 / 9),
                description: weatherInfo.weather[0].description,
                icon: weatherInfo.weather[0].icon,
                sunrise: new Date(1000 * weatherInfo.sys.sunrise),
                sunset: new Date(1000 * weatherInfo.sys.sunset),
                windspeed: Math.round(weatherInfo.wind.speed / 1.60934),
                windDirection: weatherInfo.wind.deg,
                // visibility: (weatherInfo.visibility / 1000),
                humidity: weatherInfo.main.humidity,
                pressure: weatherInfo.main.pressure,
                feelsLike: Math.round((weatherInfo.main.feels_like - 32) * 5 / 9),
                dt: new Date(weatherInfo.dt * 1000)
            };
            res.render("home", {
                "weather": weather
            });
        }

    });

});


app.post("/", function (req, res) {
    var city = req.body.cityName;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=bfeefe2a38ecc69dce4e30cf4525a703`;
    request(url, function (error, response, body) {

        if (response.statusCode != 200) {
            res.render("error");
        } else {
            var weatherInfo = JSON.parse(body);
            console.log(weatherInfo);
            var weather = {
                city: city,
                temperature: Math.round((weatherInfo.main.temp - 32) * 5 / 9),
                description: weatherInfo.weather[0].description,
                icon: weatherInfo.weather[0].icon,
                sunrise: new Date(1000 * weatherInfo.sys.sunrise),
                sunset: new Date(1000 * weatherInfo.sys.sunset),
                windspeed: Math.round(weatherInfo.wind.speed / 1.60934),
                windDirection: weatherInfo.wind.deg,
                // visibility: (weatherInfo.visibility / 1000),
                humidity: weatherInfo.main.humidity,
                pressure: weatherInfo.main.pressure,
                feelsLike: Math.round((weatherInfo.main.feels_like - 32) * 5 / 9),
                dt: new Date(weatherInfo.dt * 1000)
            };
            res.render("home", {
                "weather": weather
            });
        }

    });
});

module.exports = app;