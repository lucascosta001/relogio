# Relógio digital

Relógio digital responsivo com exibição de horas, minutos, segundos e data local. A interface permite alterar cores e escolher entre temas prontos.

## Funcionalidades

- Exibe a hora local do dispositivo no formato de 24 horas.
- Alinha as atualizações à virada de cada segundo.
- Atualiza imediatamente ao retornar à aba depois de ela ficar em segundo plano.
- Exibe a data em português (Brasil).
- Oferece temas padrão, frio e quente, além de cores personalizadas.
- Mostra um aviso quando o dispositivo está na orientação retrato.
- Adapta o layout a telas menores e permite navegar pelos controles com teclado.

## Tecnologias

- HTML, CSS e JavaScript moderno (ES6).
- Programação orientada a objetos com a classe `DigitalClock`.
- APIs nativas do navegador: `Date`, `Intl.DateTimeFormat`, `setTimeout` e `matchMedia`.

O projeto não requer bibliotecas, instalação de pacotes, etapa de build ou conexão para carregar fontes externas.

## Como executar

1. Abra `index.html` em um navegador moderno; ou
2. Inicie um servidor estático na pasta do projeto, por exemplo:

   ```bash
   python -m http.server 8000
   ```

3. Acesse `http://localhost:8000`.

## Estrutura

```text
.
├── index.html       # Documento e ponto de entrada
├── css/
│   └── style.css    # Layout, responsividade e temas
└── js/
    └── app.js       # Classe DigitalClock e inicialização
```

## Organização do código

`DigitalClock` cuida da inicialização da interface, dos eventos dos controles, da atualização do relógio e da aplicação dos temas. Os presets ficam definidos em `PRESETS`; as propriedades CSS são atualizadas em `applyTheme()`. O relógio consulta o horário do sistema a cada atualização, em vez de incrementar um contador, e agenda o próximo ciclo para a virada do segundo.

## Verificações

Verifique a sintaxe do JavaScript com:

```bash
node --check js/app.js
```

---

Desenvolvido por [Lucas Alan Costa Novais](https://github.com/lucascosta001).
