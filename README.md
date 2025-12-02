<h1>Vortex Energy - Sistema de E-commerce em Flask</h1>
Sistema de e-commerce completo desenvolvido em Flask com implementação de padrões de projeto, sistema de autenticação seguro, carrinho de compras dinâmico e gestão de pedidos.

## ▶️ Como Usar

1. Baixe o projeto.
2. Instale os pacotes necessários via terminal com "pip install flask flask_login flask_sqlalchemy" ou instale via requeriments "pip install -r requirements.txt".
3. Para visualizações do banco de dados, instale alguma extensão do SQLite como a "SQLite3 Editor".
4. Rode pelo terminal utilizando "python main.py".

## 👤 Usuários de Teste
- Email Teste: silvanno198@gmail.com
- Senha Teste: Silvanno198.

- Email Teste: roberto1@gmail.com
- Senha Teste: Rroberto1.

## 📝 Regras de Validação
- Nome: Apenas letras, mínimo 2 partes
- Email: Formato válido de email
- Senha: 6+ caracteres, maiúscula, minúscula, número e caractere especial

## 🚀 Tecnologias Utilizadas
- Backend: Python 3.8+, Flask
- Frontend: HTML5, CSS3, JavaScript
- Banco de Dados: SQLite + SQLAlchemy
- Autenticação: Flask-Login + Flask-Bcrypt
- Padrões de Projeto: Factory e Strategy

## 📦 Estrutura do Projeto
Vortex_Energy/
├── .gitignore
├── README.md
├── Procfile
├── main.py
├── requirements.txt
├── app/
│   ├── __init__.py
│   ├── db.py
│   ├── factories.py
│   ├── models.py
│   ├── routes.py
│   ├── static/
│   │   ├── img/
│   │   ├── cep.js
│   │   ├── home.css
│   │   ├── login.css
│   │   ├── modal.css
│   │   ├── modal.js
│   │   ├── product.css
│   │   ├── regex.js
│   │   ├── register.css
│   │   ├── script.js
│   │   ├── shop.css
│   │   └── sobre.css
│   └── templates/
│       ├── index.html
│       ├── login.html
│       ├── product.html
│       ├── register.html
│       ├── shop.html
│       └── sobre.html
└── instance/
    └── database.db
