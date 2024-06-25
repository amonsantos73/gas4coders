const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Definir rota POST para /login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(path.join(__dirname, 'db', 'banco-dados-usuario.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Erro de leitura de arquivo', err);
            return res.status(500).json('Erro de servidor');
        }

        // Conversão de JSON para um objeto JavaScript
        const users = JSON.parse(data);

        // Verificação da existência do email logado
        const existUser = users.find(u => u.username === username);
        if (existUser) {
            // Verifica se a senha bate com o email
            const loginValid = users.find(u => u.username === username && u.password === password);
            if (loginValid) {
                res.status(200).json('Autenticação concluída com sucesso');
            } else {
                res.status(401).json('Usuário ou senha incorretos');
            }
        } else {
            res.status(401).json(`Usuário com o nome ${username} não existe. Crie uma conta!!`);
        }
    });
});

app.post('/create', (req, res) => {
    const { username, email, password } = req.body;
    console.log('cheguei no create', { username, email, password });

    fs.readFile(path.join(__dirname, 'db', 'banco-dados-usuario.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler arquivo', err);
            return res.status(500).json('Erro no servidor');
        }

        let users = JSON.parse(data);
        const existUsername = users.find(u => u.username === username);
        if (existUsername) {
            return res.status(400).json(`Usuário ${username} já existe!`);
        }
        const existEmail = users.find(u => u.email === email);
        if (existEmail) {
            return res.status(400).json(`O email ${email} já foi cadastrado!`);
        }

        const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
        const newId = maxId + 1;

        users.push({ id: newId, username, email, password });

        fs.writeFile(path.join(__dirname, 'db', 'banco-dados-usuario.json'), JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                console.log('Erro ao escrever arquivo: ', err);
                return res.status(500).json("Erro no servidor");
            }

            res.status(201).json('Usuário cadastrado com sucesso.');
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});
