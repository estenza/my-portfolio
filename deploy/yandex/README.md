# Деплой портфолио на Yandex Cloud VM

Этот вариант рассчитан на существующую VM с nginx и Docker. Приложение запускается в контейнере на `127.0.0.1:3010`, наружу его отдает nginx.

## 1. DNS

Создай A-запись домена или поддомена портфолио на публичный IPv4 сервера в Yandex Cloud.

Например:

```text
portfolio.example.com -> <PUBLIC_VM_IP>
```

## 2. Первый запуск на сервере

```bash
sudo mkdir -p /opt/my-portfolio
sudo chown "$USER":"$USER" /opt/my-portfolio
git clone https://github.com/estenza/my-portfolio.git /opt/my-portfolio
cd /opt/my-portfolio
docker compose -f deploy/yandex/docker-compose.yml up -d --build
```

Проверка на сервере:

```bash
curl -I http://127.0.0.1:3010/
```

## 3. Nginx

Скопируй конфиг и замени `portfolio.example.com` на реальный домен:

```bash
sudo cp /opt/my-portfolio/deploy/yandex/nginx.portfolio.conf /etc/nginx/sites-available/my-portfolio.conf
sudo nano /etc/nginx/sites-available/my-portfolio.conf
sudo ln -s /etc/nginx/sites-available/my-portfolio.conf /etc/nginx/sites-enabled/my-portfolio.conf
sudo nginx -t
sudo systemctl reload nginx
```

## 4. HTTPS

Если на сервере используется certbot:

```bash
sudo certbot --nginx -d portfolio.example.com
```

## 5. Обновления

После пуша изменений в GitHub:

```bash
cd /opt/my-portfolio
./deploy/yandex/deploy.sh
```

Если скрипт не исполняется:

```bash
chmod +x deploy/yandex/deploy.sh
```
