# WeatherNow
WeatherNow é um projeto que consome a OpenWeatherAPI com Javascript e insere dados meteorológicos dinamicamente no HTML do site. Utilizei também CSS para estilos, ou seja, tecnologias simples: HTML, CSS e Js. Porém, o conceito vai além da "simplicidade das tecnologias", que, por mais que eu não esteja utilizando frameworks como é de comum - React, Bootstrap, etc - é um projeto com um conceito muito importante. É essêncial saber consumir dados de uma API e utilizar seus dados.

## Fluxo do Projeto
Ao entrar no site, irá ser pedido acesso à sua localização. Caso aceite, irá retornar automaticamente informações do clima local do usuário. Caso contrário, apenas um feedback dizendo que não é possível retornar os dados automáticos. Em ambos casos, haverá também uma barra de pesquisa que o usuário pode pesquisar por cidades e irá receber dados dela. Os dados incluem: Temperatura, humidade, velocidade do vento e a previsão para os próximos três dias.

## Fluxo técnico

### InitApp()
Tudo se inicia nessa função (initApp) que chamará duas funções:

#### CheckLoading()
Função que irá checar se a variável "isLoading" é verdadeira ou falsa. Isso irá servir, juntamente com a função "setIsLoading" para criar a mensagem de "Carregando..." enquanto a API retorna os dados. Basicamente, está buscando dados? Sim, então irá retornar uma mensagem dizendo que está carregando. Encontrou os dados? Então some o "carregando..." e aparece os dados.

#### GetUserLocation()
Irá pedir para o usuário dar acesso à sua localização. Se der, irá retornar automaticamente os dados meteorológicos do local do usuário. Caso negar, irá retornar uma mensagem de feedback dizendo: "Ative sua localização para receber um feedback automático de sua cidade ao entrar no app!"

### onClick()
Como dito anteriormente, haverá também uma barra de pesquisa. Ao simplesmente clicar para pesquisar sem nada escrito irá retornar um alerta dizendo que é preciso escrever o nome de uma cidade. Caso escreva errado, digamos, escreva "Tonkyo" ao em vez de "Tokyo", a API não irá encontrar tal cidade e irá ser retornado um alerta dizendo que tal cidade é inválida. Se escrever corretamente, irá retornar os dados dela, juntamente com a previsão dos próximos dias.


### Outras funções

#### getBackground()
Muda a cor do papel de parede baseado no clima. Se está chovendo fica uma cor, se o clima está limpo fica outra, etc...

#### insertInfo()
Essencial para inserir dados da API no HTML da página.

#### getForecast()
Busca na API a previsão dos próximos dias.
