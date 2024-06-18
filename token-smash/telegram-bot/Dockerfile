FROM python:3.10-slim

WORKDIR /app
WORKDIR /app/telegram-bot

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 6060

CMD ["python", "ts_tma_bot.py"]
