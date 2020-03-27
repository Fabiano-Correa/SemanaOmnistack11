const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
/**
 * rotas e recursos
 * 
 */
/**
 * Métodos HTTP:
 * 
 * GET: Buscar uma informação do back-end
 * POST:Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 * 
 */
/**
 * Tipos de Parâmetros
 * 
 * Query Params: Parâmetros nomeados enviados na rota após o "?". Geralmente servem para filtros, paginação, etc...
 * Route Params: Parâmetrso utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

 /**
  * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
  * NoSQL: MongoDB, CoucnDB, etc
  */
 /**
  * Driver: Select * from users
  * Query Builder: table('users).select('*).where()
  */

 