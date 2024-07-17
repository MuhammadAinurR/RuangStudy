# RuangStudy

### run in order
- npm i
- sequelize db:drop
- sequelize db:create
- sequelize db:migrate
- sequelize db:seed:all
- node --watch .

copy this bash for hard reset DB <br>
```bash
sequelize db:drop && \
sequelize db:create && \
sequelize db:migrate && \
sequelize db:seed:all && \
node --watch .
```

### endpoint list
- http://localhost:3000/users | GET => get all users