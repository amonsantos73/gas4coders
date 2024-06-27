//importar libs externas
const express = require('express'); //npm i express
const cors = require('cors'); //npm i cors

//Instância do servidor
const app = express();

//Liberar rota cors
app.use(cors());
//Função para extrair os dados do pacote IP
app.use(express.json())

//importar rotas propriedades
const propriedadesRoutes = require('./router/propriedades');

//importar rotas autenticacao
const authRoutes = require('./router/auth');

//rotas para os dois serviços
app.use('/auth', authRoutes);
app.use('/propriedades', propriedadesRoutes);

app.listen(3000, ()=>{
    console.log('Servidor Ouvindo');
});