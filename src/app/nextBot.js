const { Telegraf } = require("telegraf");
import 'dotenv';
// const TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN;
// console.log(TOKEN,'--------------');
const TOKEN = "6496924480:AAHAYFmmlg1jIRjBZ4L5vRzgJowbWVaPX7w"
const bot = new Telegraf(TOKEN);

const web_link = "https://sfs-two.vercel.app/superplay";

bot.start((ctx) =>
    ctx.reply("Welcome To the SFS :) ", {
        reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
        },
    })
);

bot.launch();
