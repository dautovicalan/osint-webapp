FROM python:3.9-slim
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["flask", "--app", "main.py", "--debug", "run", "-p", "8000", "-h", "0.0.0.0"]
