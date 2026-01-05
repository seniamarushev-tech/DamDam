require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.log("❌ BOT_TOKEN не найден. Проверь apps/bot/.env");
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

const MINI_APP_URL = process.env.MINI_APP_URL || "https://example.com";

// ЛОГИ — чтобы видеть, что Telegram реально присылает апдейты
bot.use(async (ctx, next) => {
  try {
    const from = ctx.from?.username || ctx.from?.id;
    console.log("📩 update:", ctx.updateType, "from:", from);
    await next();
  } catch (e) {
    console.error("❌ middleware error:", e);
  }
});

bot.start(async (ctx) => {
  await ctx.reply(
    "damdam — место для знакомств.\nзвезды решают.\n18+",
    Markup.inlineKeyboard([
      Markup.button.webApp("открыть damdam", MINI_APP_URL),
    ])
  );
});

bot.command("ping", (ctx) => ctx.reply("pong"));

// Глобальный хэндлер ошибок Telegraf
bot.catch((err, ctx) => {
  console.error("❌ telegraf error for update", ctx.updateType, err);
});

bot.launch().then(() => console.log("✅ bot running"));
