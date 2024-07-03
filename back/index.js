const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    fs.readFile(path.join(__dirname, 'db', 'banco-dados-usuario.json'), 'utf8', async (err, data) => {
        if (err) {
            console.error('Erro de leitura de arquivo', err);
            return res.status(500).json('Erro de servidor');
        }
        const users = JSON.parse(data);

        const user = users.find(u => u.username === username);
        if (user) {
            const passwordValidado = await bcrypt.compare(password, user.password);
            if (passwordValidado) {
                res.status(200).json({
                    message: 'Autenticação concluída com sucesso',
                    userId: user.userId,
                    favorites: user.favorites || [] // Inclua a lista de favoritos aqui
                });
            } else {
                res.status(401).json('Usuário ou senha incorretos');
            }
        } else {
            res.status(401).json(`Usuário com o nome ${username} não existe. Crie uma conta!!`);
        }
    });
});


app.post('/create', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('cheguei no create', { username, email, password });

    fs.readFile(path.join(__dirname, 'db', 'banco-dados-usuario.json'), 'utf8', async (err, data) => {
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

        const maxId = users.reduce((max, user) => (user.userId > max ? user.userId : max), 0);
        const newId = maxId + 1;

        const salt = await bcrypt.genSalt(10);
        const passwordCrypt = await bcrypt.hash(password, salt);

        users.push({ userId: newId, username, email, password: passwordCrypt, favorites: [] });

        fs.writeFile(path.join(__dirname, 'db', 'banco-dados-usuario.json'), JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                console.log('Erro ao escrever arquivo: ', err);
                return res.status(500).json("Erro no servidor");
            }

            res.status(201).json('Usuário cadastrado com sucesso.');
        });
    });
});


app.post('/add/favorites', async (req, res) => {
    const { userId, coffeeId } = req.body;
    console.log('userId:', userId);

    fs.readFile(path.join(__dirname, 'db', 'banco-dados-usuario.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler arquivo', err);
            return res.status(500).json('Erro no servidor');
        }

        let users = JSON.parse(data);
        const user = users.find(u => u.userId === userId);

        console.log('Usuário encontrado:', user);

        if (!user) {
            return res.status(404).json('Usuário não encontrado');
        }

        if (!user.favorites.includes(coffeeId)) {
            user.favorites.push(coffeeId);

            fs.writeFile(path.join(__dirname, 'db', 'banco-dados-usuario.json'), JSON.stringify(users, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao escrever arquivo', err);
                    return res.status(500).json("Erro no servidor");
                }

                console.log('Café favoritado com sucesso para userId:', userId);
                res.status(200).json('Café favoritado com sucesso.');
            });
        } else {
            const coffeeIndex = user.favorites.indexOf(coffeeId);

            user.favorites.splice(coffeeIndex, 1);


            fs.writeFile(path.join(__dirname, 'db', 'banco-dados-usuario.json'), JSON.stringify(users, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao escrever arquivo', err);
                    return res.status(500).json("Erro no servidor");
                }
            
                console.log('Café removido dos favoritos com sucesso para userId:', userId);
                return res.status(200).json('Café removido dos favoritos com sucesso.');
            });     
        }
    });
});



app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});
