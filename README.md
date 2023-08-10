## Демонcтрационный проект по взаимодействию двух микросервисов с использование брокера сообщений RabbitMQ.

Использованные зависимости
- структура репозитория - monorepo NX
- фреймфорк для приложений - NestJS
- библиотека для работы с Rabbit MQ - nestjs-rmq (под капотом - amqplib)
- тестирование - jest
- валидация - class-validator

### Приложение api - обработка входящих http запросов, отправка их через RabbitMQ в приложение auth, обработка ответа.

`apps/api/src/app/controllers/auth.controller.ts` - контроллер для обработки входящих http запросов 

### Приложение auth - обработка запросов через RabbitMQ.

- `apps/auth/src/app/auth/auth.controller.ts` - контроллер для получения запросов через Rabbit
- `apps/auth/src/app/auth/auth.service.ts` - сервис проверки логина-пароля
- `apps/auth/src/app/auth/auth.controller.spec.ts` - тесты для приложения

### Запуск на локальной машине

- прописываем в `envs/.api.env` и `envs/.auth.env` адрес сервера RabbitMQ
- устанавливаем зависимости проекта `npm i` и глобально `npm i -g nx`
- запускаем микросервисы `nx serve auth` и `nx serve api`
- в Postman вызываем POST http://localhost:3333/api/auth/login
- в body - {"login":"xyz","password":"123"} - успешный запрос
- в body - {"login":"xyz","password":""} - ошибка

### Запуск через докер

- `docker build . -t rabbit-worker` - собираем контейнер
- `docker run --rm -it -p 5555:5672 rabbitmq:3-management` - запускаем рэббит
- `docker run --rm -it rabbit-worker nx serve auth` - запускаем микросервис аутентификации
- `docker run --rm -it -p 3333:3333 rabbit-worker nx serve api` - запускаем микросервис api
- `curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"login":"xyz","password":"123"}' \
  http://localhost:3333/api/auth/login` - вызов api

- `docker run --rm -it rabbit-worker nx test auth` - запуск тестов для сервиса аутентификации