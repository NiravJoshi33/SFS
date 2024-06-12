const { Telegraf } = require("telegraf");
const TOKEN = "7458218872:AAGy1i2vmDKwpaw6Xl3-cvDA80vhSWmr-_U";
const bot = new Telegraf(TOKEN);

const web_link = "https://64.227.151.65:3000/";

bot.start((ctx) =>
  ctx.reply("Welcome..!!!!!!!!", {
    reply_markup: {
      keyboard: [[{ text: "PLAY TOKEN SMASH", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
