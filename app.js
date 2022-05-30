const TelegramBot = require('node-telegram-bot-api');


const token = 'API KEY';


const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];


    bot.sendMessage(chatId, resp);
});


const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


bot.onText(/\/start/, function (msg, match) {
    const text1 = "Hello Hi there this is a Weather bot \n to get help press /\help"
    bot.sendMessage(msg.chat.id, text1)

});

// // bot.onText(/\/help/, function (req, res) {
// //     bot.sendMessage(req.chat.id, "select one", {
// //         "reply_markup": {
// //             "keyboard": [["hi", "hi2"]]
//         }
//     });
// });

bot.on("message", (res) => {
    const city = res.text;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=56cacc07e0756dc81174de056aec7785";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            const weatherinfo = weatherdata.weather[0].description;
            const temp = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon;

            bot.sendMessage(res.chat.id, weatherinfo + " " + temp)

        });
    });

});
// const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=56cacc07e0756dc81174de056aec7785";
