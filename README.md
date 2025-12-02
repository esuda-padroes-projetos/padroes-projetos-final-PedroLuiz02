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
Vortex_Energy/\n├── .gitignore\n├── README.md\n├── Procfile\n├── main.py\n├── requirements.txt\n├── app/\n│   ├── __init__.py\n│   ├── db.py\n│   ├── factories.py\n│   ├── models.py\n│   ├── routes.py\n│   ├── static/\n│   │   ├── img/\n│   │   ├── cep.js\n│   │   ├── home.css\n│   │   ├── login.css\n│   │   ├── modal.css\n│   │   ├── modal.js\n│   │   ├── product.css\n│   │   ├── regex.js\n│   │   ├── register.css\n│   │   ├── script.js\n│   │   ├── shop.css\n│   │   └── sobre.css\n│   └── templates/\n│       ├── index.html\n│       ├── login.html\n│       ├── product.html\n│       ├── register.html\n│       ├── shop.html\n│       └── sobre.html\n└── instance/\n    └── database.db
