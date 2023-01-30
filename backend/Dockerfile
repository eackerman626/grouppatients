FROM python:3.10
RUN apt-get update && apt-get install make \
  && apt-get -y install netcat gcc postgresql \
  && apt-get clean

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

ENV PORT=8000
ENV PYTHONPATH=.

EXPOSE ${PORT}

CMD uvicorn app.main:app --reload --host=0.0.0.0 --port=${PORT} --log-level=debug