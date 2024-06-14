from telegram import Bot, Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, CallbackContext, ContextTypes
from dotenv import find_dotenv, load_dotenv
import os

load_dotenv(find_dotenv(".env"))
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

if (BOT_TOKEN == None or BOT_TOKEN == ""):
    print("Please set the TELEGRAM_BOT_TOKEN environment variable")
    exit(1)

async def Start(update: Update, context: CallbackContext):
    # Create an Inline Button with Web App Link
    keyboard = [
        [
            InlineKeyboardButton("Play", web_app=WebAppInfo(url="https://demo.superplay.superfun.social/"))
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    welcome_message = """
    Welcome to SuperPlay: Gaming partner for SuperFunSocial.
Know more about our product at superfun.social 
To start the game, click the button below.
        """

    # Send a message with the Inline Keyboard
    with open("sfs_long_logo.png", "rb") as logo:
        await update.message.reply_photo(photo=logo, reply_markup=reply_markup, caption=welcome_message)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Use '/start' to start the game")

def main():
    application = Application.builder().token(BOT_TOKEN).build()

    application.add_handler(CommandHandler("start", Start))
    application.add_handler(CommandHandler("help", help_command))

    # Start the Bot
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
