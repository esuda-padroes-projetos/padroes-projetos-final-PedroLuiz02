from app import app, login_manager
from app.db import db
from flask import render_template, jsonify, request, redirect, url_for, flash
from flask_login import login_user, login_required, logout_user, current_user
from app.models import Produto, Usuario, Pedido, ItemPedido
from app.factories import PedidoFactory
from werkzeug.security import generate_password_hash, check_password_hash
import re


regex_nome = r"^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$"
regex_senha = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$"
regex_email = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'


# STRATEGY 
class EstrategiaValidacao:
    def validar(self, valor): 
        pass
    
    def mensagem_erro(self):
        return "Valor inválido"

class ValidadorNome(EstrategiaValidacao):
    def validar(self, nome):
        regex_nome = r"^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$"
        return bool(re.match(regex_nome, nome))
    
    def mensagem_erro(self):
        return "nome_invalido"

class ValidadorEmail(EstrategiaValidacao):
    def validar(self, email):
        regex_email = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(regex_email, email))
    
    def mensagem_erro(self):
        return "email_invalido"

class ValidadorSenha(EstrategiaValidacao):
    def validar(self, senha):
        regex_senha = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$"
        return bool(re.match(regex_senha, senha))
    
    def mensagem_erro(self):
        return "senha_invalida"

validadores = {
    'nome': ValidadorNome(),
    'email': ValidadorEmail(), 
    'senha': ValidadorSenha()
}

@login_manager.user_loader
def user_loader(user_id):
    return db.session.get(Usuario, int(user_id))


@app.route('/')
def home():
    if current_user.is_authenticated:
        print(current_user.nome)
    return render_template('index.html')


@app.route('/shop')
def shop():
    produtos = Produto.query.all()
    user = Usuario.query.all()
    pedido_aberto = None
    if current_user.is_authenticated:
        pedidos_do_usuario = current_user.pedidos
        pedido_aberto = Pedido.query.filter_by(id_usuario=current_user.id_usuario, status="Em andamento").first()
        print(f"Usuário logado: {current_user.nome}, Pedido aberto: {pedido_aberto}")
    if pedido_aberto:
        print("Itens do pedido:")
        for item in pedido_aberto.itens:
            print(f"- Produto: {item.produto.nome}, Quantidade: {item.quantidade}")
    return render_template('shop.html', produtos=produtos, user=user, pedido_aberto=pedido_aberto)


@app.context_processor
def inject_pedido_aberto():
    if current_user.is_authenticated:
        pedido_aberto = next((p for p in current_user.pedidos if p.status == "Em andamento"), None)
    else:
        pedido_aberto = None
    return dict(pedido_aberto=pedido_aberto)


@app.route('/product/<int:id>')
def product(id):
    produto = Produto.query.get_or_404(id)
    if current_user.is_authenticated:
        print(current_user.nome)
    return render_template('product.html', produto=produto)


@app.route("/criar_pedido", methods=["POST"])
@login_required
def criar_pedido():
    usuario = current_user
    produto_ids = request.form.getlist("produto_id[]")
    quantidades = request.form.getlist("quantidade[]")
    origem = request.referrer or url_for("shop")

    pedido = Pedido.query.filter_by(id_usuario=usuario.id_usuario, status="Em andamento").first()

    itens = []
    for produto_id, qtd in zip(produto_ids, quantidades):
        produto = Produto.query.get(int(produto_id))
        if produto:
            itens.append((produto, int(qtd)))

    if not pedido:
        pedido = PedidoFactory.criar_pedido(usuario, itens)
        db.session.add(pedido)
    else:
        for produto, qtd in itens:
            item_existente = ItemPedido.query.filter_by(
                id_pedido=pedido.id_pedido,
                id_produto=produto.id_produto
            ).first()

            if item_existente:
                item_existente.quantidade += qtd
            else:
                novo_item = ItemPedido(
                    id_pedido=pedido.id_pedido,
                    id_produto=produto.id_produto,
                    quantidade=qtd
                )
                db.session.add(novo_item)

    db.session.commit()
    return redirect(origem)


@app.route("/sobre")
def contato():
    return render_template('sobre.html')



@app.route("/item/deletar/<int:id_item>", methods=["POST"])
@login_required
def deletar_item_route(id_item):
    origem = request.referrer or url_for("shop")

    item = ItemPedido.query.get(id_item)
    if item and item.pedido.id_usuario == current_user.id_usuario:
        db.session.delete(item)
        db.session.commit()
        print("Item removido com sucesso!", "success")
    else:
        print("Item não encontrado ou não pertence ao seu pedido!", "danger")
    if not item.pedido.itens:
        db.session.delete(item.pedido)
        db.session.commit()
        print("Pedido removido porque ficou vazio.", "info")
    return redirect(origem)


@app.route("/pedido/<int:id_pedido>")
def ver_pedido(id_pedido):
    pedido = Pedido.query.get(id_pedido)

    total = sum(
        item.quantidade * float(item.produto.preco_unitario)
        for item in pedido.itens
    )

    return render_template(
        "pedido_modal.html",
        pedido=pedido,
        total_pedido=total
    )


@app.route("/atualizar-quantidade", methods=["POST"])
def atualizar_quantidade():
    data = request.get_json()

    id_item = data.get("id_item")
    nova_qtd = data.get("quantidade")

    if not id_item or not nova_qtd:
        return jsonify({"erro": "dados incompletos"}), 400

    item = ItemPedido.query.get(id_item)
    if not item:
        return jsonify({"erro": "item não encontrado"}), 404

    item.quantidade = nova_qtd
    db.session.commit()

    pedido = item.pedido
    total = sum(i.quantidade * float(i.produto.preco_unitario) for i in pedido.itens)

    return jsonify({
        "status": "ok",
        "id_item": id_item,
        "quantidade": nova_qtd,
        "total_pedido": round(total, 2)
    })


@app.context_processor
def inject_cart_data():
    if current_user.is_authenticated:
        pedido_aberto = Pedido.query.filter_by(
            id_usuario=current_user.id_usuario,
            status="Em andamento"
        ).first()
    else:
        pedido_aberto = None

    total_pedido = 0
    if pedido_aberto:
        total_pedido = sum(
            item.quantidade * float(item.produto.preco_unitario)
            for item in pedido_aberto.itens
        )

    return dict(
        pedido_aberto=pedido_aberto,
        total_pedido=total_pedido
    )


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    
    elif request.method == 'POST':
        email = request.form['emailForm']
        senha = request.form['senhaForm']

        if not validadores['email'].validar(email):
            return redirect(url_for('login', erro='email_invalido'))

        user = db.session.query(Usuario).filter_by(email=email).first()
        if not user or not check_password_hash(user.senha, senha):
            return redirect(url_for('login', erro='credenciais_invalidas'))
        
        login_user(user)
        return redirect(url_for('home'))
    

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    
    elif request.method == 'POST':
        nome = request.form['nomeForm']
        email = request.form['emailForm']
        senha = request.form['senhaForm']
        confirm_senha = request.form['confirm_senhaForm']

        dados_para_validar = {
            'nome': nome,
            'email': email,
            'senha': senha
        }
        
        for campo, valor in dados_para_validar.items():
            if not validadores[campo].validar(valor):
                return redirect(url_for('register', erro=validadores[campo].mensagem_erro()))
        
        if senha != confirm_senha:
            return redirect(url_for('register', erro='senhas_nao_coincidem'))

        senha_hash = generate_password_hash(senha)
        novo_usuario = Usuario(nome=nome, email=email, senha=senha_hash)
        db.session.add(novo_usuario)
        db.session.commit()

        login_user(novo_usuario)
        return redirect(url_for('login', sucesso='registro_ok'))
    

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))
