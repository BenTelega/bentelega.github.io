from dotenv import load_dotenv
import asyncio
import logging
import json
import os
from datetime import datetime

from aiogram import Bot, Dispatcher, types, F
from aiogram.utils.keyboard import ReplyKeyboardBuilder
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, LabeledPrice
from aiogram.enums.content_type import ContentType
from aiogram.filters import CommandStart
from aiogram.enums.parse_mode import ParseMode

from models import SessionLocal, User, Transaction

logging.basicConfig(level=logging.INFO)

load_dotenv()
bot = Bot(os.getenv("BOT_TOKEN"))
dp = Dispatcher()

# Database session


def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()

# Get or create user


def get_or_create_user(db, telegram_user):
    user = db.query(User).filter(User.telegram_id == telegram_user.id).first()
    if not user:
        user = User(
            telegram_id=telegram_user.id,
            username=telegram_user.username,
            first_name=telegram_user.first_name,
            last_name=telegram_user.last_name
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user


@dp.message(CommandStart())
async def start(message: types.Message):
    """
    Обрабатывает нажатие start.
    """
    db = get_db()
    user = get_or_create_user(db, message.from_user)

    webAppInfo = types.WebAppInfo(
        url="https://bentelega.github.io")

    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(
                text="Канал", url="https://t.me/bentelega_channel"), InlineKeyboardButton(
                text="Написать", url="https://t.me/bentelega")],
            [InlineKeyboardButton(
                text="Посмотреть портфолио", web_app=webAppInfo)],
            [InlineKeyboardButton(
                text="О разработчике", url="https://bentelega.ru/developer.html")],
        ]
    )

    await message.answer(text='<b>Решения для Telegram</b>\n\n<code>Готовые к внедрению веб-приложения и боты для вашего бизнеса</code>', reply_markup=keyboard,  parse_mode="HTML")


@dp.message(F.text == '/profile')
async def profile(message: types.Message):
    db = get_db()
    user = get_or_create_user(db, message.from_user)

    await message.answer(f'<b>Ваш профиль</b>\n\n'
                         f'Имя: {user.first_name or "Не указано"}\n'
                         f'Баланс: {user.balance} ⭐\n'
                         f'ID: {user.telegram_id}', parse_mode=ParseMode.HTML)


@dp.message(F.text == '/topup')
async def topup(message: types.Message):
    prices = [LabeledPrice(label="100 ⭐", amount=100)]
    await bot.send_invoice(
        chat_id=message.chat.id,
        title="Пополнение баланса",
        description="Пополните баланс Telegram Stars",
        payload="topup_100",
        provider_token="",  # Empty for Telegram Stars
        currency="XTR",
        prices=prices,
        start_parameter="topup"
    )


@dp.message(F.text == '/history')
async def history(message: types.Message):
    db = get_db()
    user = get_or_create_user(db, message.from_user)

    transactions = db.query(Transaction).filter(Transaction.user_id == user.id).order_by(
        Transaction.created_at.desc()).limit(10).all()

    if not transactions:
        await message.answer("История транзакций пуста.")
        return

    text = "<b>История транзакций:</b>\n\n"
    for tx in transactions:
        text += f"{tx.created_at.strftime('%d.%m.%Y %H:%M')} - {tx.amount} ⭐ - {tx.description}\n"

    await message.answer(text, parse_mode=ParseMode.HTML)


@dp.pre_checkout_query()
async def pre_checkout_query(pre_checkout_q: types.PreCheckoutQuery):
    await bot.answer_pre_checkout_query(pre_checkout_q.id, ok=True)


@dp.message(F.content_type == ContentType.SUCCESSFUL_PAYMENT)
async def successful_payment(message: types.Message):
    db = get_db()
    user = get_or_create_user(db, message.from_user)

    payment = message.successful_payment
    amount = payment.total_amount

    # Update balance
    user.balance += amount
    db.add(user)

    # Record transaction
    transaction = Transaction(
        user_id=user.id,
        amount=amount,
        description=f"Пополнение баланса: {amount} ⭐",
        transaction_type="deposit",
        telegram_payment_id=payment.telegram_payment_charge_id
    )
    db.add(transaction)
    db.commit()

    await message.answer(f"✅ Баланс успешно пополнен на {amount} ⭐\nТекущий баланс: {user.balance} ⭐")


@dp.message(F.content_type == ContentType.WEB_APP_DATA)
async def parse_data(message: types.Message):
    db = get_db()
    user = get_or_create_user(db, message.from_user)

    data = json.loads(message.web_app_data.data)

    if data.get('type') == 'purchase':
        cost = data.get('cost', 0)
        if user.balance >= cost:
            user.balance -= cost
            db.add(user)

            transaction = Transaction(
                user_id=user.id,
                amount=-cost,
                description=f"Покупка: {data.get('item', 'Неизвестно')}",
                transaction_type="purchase"
            )
            db.add(transaction)
            db.commit()

            await message.answer(f"✅ Покупка совершена!\nОстаток баланса: {user.balance} ⭐")
        else:
            await message.answer("❌ Недостаточно средств на балансе.")
    else:
        await message.answer(f'<b>{data["title"]}</b>\n\n{data["text"]}', parse_mode=ParseMode.HTML)


async def main():
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
