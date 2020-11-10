const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TELEGRAM_TOKEN || '1415252764:AAF7Znfelb9b-eYlaFcDQiPRvWLh-KMcL5s';

const { Telegraf } = require('telegraf')

const bot = new Telegraf(TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch({
    webhook: {
      domain: 'https://d78b2e1e0cdd732903e7219ef768c0dd.m.pipedream.net',
      port: 3000
    }
  })
bot.launch()