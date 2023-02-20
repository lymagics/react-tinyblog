# React-Tinyblog

Frontend for lightweight blogging application.

## Installation instructions
All instructions are written on the condition that you have an [api](https://github.com/lymagics/tinyblog-api) installed.
```
tinyblog/
    react-tinyblog/
    tinyblog-api/
```

### Local installation
1. Clone the repository
```
git clone https://github.com/lymagics/react-tinyblog.git
```
2. Create .env file and fill in with .env.example variables.
3. Run local server.
```
npm start
```

### Production install
1. Clone the respository.
```
git clone https://github.com/lymagics/react-tinyblog.git
```
2. Create .env.api and .env.db files and fill with .env.api.example and .env.db.example variables.
3. Create .env.production file and fill it with:
```
REACT_APP_BASE_API_URL=
```
4. Run production server.
```
npm run deploy
```
5. Apply database migrations.
```
docker-compose exec api python manage.py migrate
```