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
bot.launch()