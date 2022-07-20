# Beaster | Frontend

## Tecnologias utilizadas

O frontend do projeto **Beaster** foi criado com o objetivo de ser o de mais simples e fácil execução - afinal, o trabalho tem como foco a aplicação dos conceitos de Orientação a Objetos aprendidos em aula, e no contexto de desenvolvimento web moderno tais conceitos não são tão utilizados.

Desta forma, o site foi criado apenas como uma interface entre o usuário e o banco de dados (este sim, aplicando os conceitos estudados em aula). As ferramentas utilizadas para a criação do site foram:

- [React](https://pt-br.reactjs.org/) _Para a criação da interface_
- [Axios](https://axios-http.com/ptbr/docs/intro) _Para realização das requisições HTTP_
- [Mantine](https://mantine.dev/) _Para utilização de componentes de UI prontos_
- [Husky](https://typicode.github.io/husky/#/) _Para uso de gitHooks e manutenção da estrutura do código_
- [Git](https://git-scm.com/) _Para versionamento do código_
- [Typescript](https://www.typescriptlang.org/) _Para uso de tipagem_

## Como rodar no seu computador

Para servir o site localmente _na porta 3000 do localhost_ alguma configuração é necessária.

### Tenha o Node.js e npm instalados

Como muitas aplicações web feitas em Javascript/Typescript, precisamos do [Node.js](https://nodejs.org/en/) e do [npm](https://www.npmjs.com/) para rodá-las.

Para instalar o Node.js e o npm, você pode baixar e executar o instalador do [site oficial do Node](https://nodejs.org/en/download/). Basta seguir os passos do instalador e se tudo correr bem, você terá os dois instalados na sua máquina.

> Note que o instalador só é recomendado para o Windows. Se você possui alguma distribuição do Linux ou o um MacOS, a CLI de versionamento do node, [nvm](https://github.com/nvm-sh/nvm), é extremamente mais fácil de lidar e usar.

Para verificar se o processo de instalação foi bem sucedido você pode rodar os seguintes comandos:

```sh
node -v
```

```sh
npm -v
```

### Extraia o zip com o projeto para uma pasta

Um dos arquivos .zip enviado em anexo contém o frontend do projeto. Descompacte o conteúdo do zip em uma pasta da sua escolha e a acesse pelo terminal

### Instale as dependências necessárias

Para instalar as dependências do projeto, basta executar o comando:

```sh
npm install
```

> Uma dificuldade que muitas pessoas têm com a execução de comandos npm é o diretório em que o terminal que roda o comando está. Um jeito de garantir que o terminal está no caminho correto é verificar se o arquivo `package.json` está presente no caminho. Para verificar isso, basta conferir o resultado do comando `ls` - se o `package.json` estiver lá, o seu caminho está correto.

### Rode o projeto

Com tudo instalado, basta apenas rodar o projeto. Isso pode ser feito com o seguinte comando:

```sh
npm start
```

Em alguns instantes o seu navegador irá abrir a aba contendo a aplicação automaticamente. Se isso não acontecer, basta abrir o navegador e ir para o endereço `http://localhost:3000`. Com isso, basta apenas rodar o backend e a aplicação estará pronta para ser usada.
