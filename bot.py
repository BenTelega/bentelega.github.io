import asyncio
import logging
import json
import os

from aiogram import Bot, Dispatcher, types, F
from aiogram.utils.keyboard import ReplyKeyboardBuilder
from aiogram.enums.content_type import ContentType
from aiogram.filters import CommandStart
from aiogram.enums.parse_mode import ParseMode

logging.basicConfig(level=logging.INFO)

bot = Bot("6758464625:AAGiiP8zP48rTewTCEJlXkrPBLEY3ym9I7A")
dp = Dispatcher()


@dp.message(CommandStart())
async def start(message: types.Message):
    """
    Обрабатывает нажатие start.
    """
    await message.answer(text='Привет!')


@dp.message(F.text == '/wa')
async def cmd_back_home(message: types.Message) -> None:

    webAppInfo = types.WebAppInfo(
        url="https://probable-capybara-7wqwp99x57gcpv5r-5500.app.github.dev")
    builder = ReplyKeyboardBuilder()
    builder.add(types.KeyboardButton(
        text='Отправить данные', web_app=webAppInfo))

    await message.answer(text='Тестирование веб приложения', reply_markup=builder.as_markup(resize_keyboard=True))


@dp.message(F.content_type == ContentType.WEB_APP_DATA)
async def parse_data(message: types.Message):
    data = json.loads(message.web_app_data.data)
    await message.answer(f'<b>{data["title"]}</b>\n\n{data["text"]}', parse_mode=ParseMode.HTML)


async def main():
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
