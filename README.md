# Homework - Frontend

## Descrição:
```
Projeto construido com intuido de monitorar vendas, é possível cadastrar vendedor(CRUD) e também fazer o registro das vendas.
```

## Tecnologias usadas: 
```
Vue 2 | Vuetify | Axios
```

## Itens obrigatórios: 
```
VueJs: 2 | Node: 16 | 
```

## Funções - Vendedor:

- Cadastro de Vendedor
- Listar Vendedores
- Excluir Vendedor
- Editar Vendedor

## Funções - Vendas:

- Cadastro de Venda
- Listar Venda por Vendedor

## Inicializando o projeto

**Passo 1:**

Na raiz do projeto, execute este comando para instalar as dependências:

```
npm install
```

**Passo 2:**

Na raiz do projeto, renomeie o arquivo .env.example para .env, em seguida, coloque a URL da Api referente ao Backend

```
Ex:

VUE_APP_API_BASE = localhost
```

**Passo 3:**

Para rodar o projeto, execute os seguintes comandos:

```
npm run serve 
```


## Telas:

Referente ao vendedor:

```
       URL                        TO DO
/register-user     /* Cria um vendedor */
/list-user         /* Lista todos os vendedores, nesta tela também é possível editar/excluir vendedor
                      PS: Não é possível excluir vendedor que já tenha realizado alguma venda */

```

Referente as vendas:

```
      URL                        TO DO
/list-sale        /* Lista as vendas, é necessário selecionar um vendedor e o vendedor terá que ter feito ao menos uma venda */
/register-sale    /* Cria uma venda */

```
