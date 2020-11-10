const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");
const https = require("https");

let configData = fs.readFileSync("config.json");
let privateChannels = JSON.parse(configData).private;
let publicChannels = JSON.parse(configData).public;

const TOKEN =
  process.env.TELEGRAM_TOKEN ||
  "1415252764:AAF7Znfelb9b-eYlaFcDQiPRvWLh-KMcL5s";

const { Telegraf } = require("telegraf");

const bot = new Telegraf(TOKEN);
bot.on("channel_post", (ctx) => {
  const data = JSON.stringify(ctx);
  if (ctx.update.channel_post.sender_chat.username) {
    const options = {
      hostname: "d78b2e1e0cdd732903e7219ef768c0dd.m.pipedream.net",
      port: 443,
      path: "/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    privateChannels.forEach(function (channelId) {
      ctx.telegram
        .forwardMessage(
          channelId,
          ctx.update.channel_post.sender_chat.id,
          ctx.update.channel_post.message_id
        )
        .then(function () {
          console.log("mesage forwaded");
        });
    });
    const req = https
      .request(options, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          console.log(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        console.error("[error] " + err.message);
      });
    req.write(data);
    req.end();
  }
});

bot.launch();
