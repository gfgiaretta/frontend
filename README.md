# Next.js + Tailwind CSS + TypeScript + ESLint + Prettier

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Padrão de nomenclatura de branch

- `noUs/<task-name>`: Para tarefas que não estão relacionadas a um ticket ( task-name em kebab-case )
- `us-<ticket-number>/<task-name>`: Para tarefas relacionadas a um ticket ( ticket-number -> número seprarados por "-"; task-name em kebab-case )
- `fix-us-<ticket-number>/<task-name>`: Para correções de bugs em tarefaz já mergeadas ( ticket-number -> número seprarados por "-"; task-name em kebab-case )

## Padrão de commit

- Tags:

  - `feat`: Para novas funcionalidades
  - `fix`: Para correções de bugs
  - `chore`: Para tarefas de manutenção

- `[tag]: <past verb> <description>`
  - Exemplo: `[feat]: added new feature to component`
  - Exemplo: `[fix]: resolved render error in component`
  - Exemplo: `[chore]: updated dependencies`

## Nomenclatura de arquivos

- Arquivos de páginas devem ser nomeados em kebab-case (exemplo: `src/app/my-page/page.tsx`)
- Arquivos de componentes devem ser nomeados em PascalCase (exemplo: `src/components/MyComponent/MyComponent.tsx`)
- Arquivos de componentes de UI devem ser nomeados em PascalCase (exemplo: `src/components/ui/MyComponent.tsx`)

## Desenvolvimento

- _Cores_:
  Utilizar as varívais de estilização do tailwind ( exemplos de uso em `src/app/examples` )
- _Tipografia_:
  Utilizar componente de Text do `src/components/ui/Text.tsx` ( exemplos de uso em `src/app/examples` )
- _Dicionário_:
  Strings estáticas devem ser armazenadas em um arquivo de dicionário `public/dictionaries`. Neste arquvio contém dois idiomas ( pt-Br e en-Us ), as strings devem ser armazenadas em ambos os idiomas, sendo agrupadas por alguma tag que identifique a que estão relacionadas.
  Por exemplo:
  Strings relacionadas a tela "Profile", nos arquvios de idioma deve ser criado um objeto
  "Profile": {
  'string-variable': "traducao"
  } ( Profile em PascalCase )
  que vai conter todas as strings presentes na tela "Profile". Esta tag deve ser utilizada na importação do hook de tradução
  `const t = useTranslation('Profile')` e as strings devem ser acessadas através do `t('string-variable')` ( string-variable em kebab-case )
- _Estilização_:
  Utilizar o tailwind para estilização de componentes `https://tailwindcss.com/docs/` ( No menu da lateral esquerda do site você encontra a documentação de cada classe: LAYOUT | FLEXBOX & GRID | SPACING | SIZING | BACKGROUNDS | BORDERS | EFFECTS | FILTERS | TABLES | TRANSITION & ANIMATION | TRANSFORMS | INTERACTIVITY | SVG | ACESSIBILITY )
- _Código_:
  Desenvolver o código em inglês
- _Formatação_:
  Antes de commitar rodar `npm run lint -- --fix` para corrigir os erros de formatação, erros no código apontados pelo eslint devem ser corrigidos na mão, ecitar o uso do `// eslint-disable-next-line` para ignorar os erros

## Páginas

- Arquivos de páginas devem ser criados na pasta `src/app/<page-name>/page.tsx` ( page-name em kebab-case )
- Functions de página devem ser nomeadas com a primeira letra maiúscula ( PascalCase )
- Páginas NÃO devem ser client components ( não devem ter `use client` ), a menos que seja necessário
- Paginas de exemplo de uso de componente devem ser criadas em `src/app/examples/<page-name>/page.tsx` ( page-name em kebab-case; Idealmente não devem ser comitadas )

## Componentes

- Arquivos de componentes devem ser criados na pasta `src/components/<ComponentName>/` ( ComponentName em PascalCase )
- Rota completa: `src/components/<ComponentName>/<ComponentName>.tsx` ( ComponentName em PascalCase )
- Arquivos de componentes devem ser nomeados com a primeira letra maiúscula ( PascalCase )
- Arquivos de componentes devem ser nomeados com o mesmo nome da pasta
- Arquivos relacionados a um componente devem ser criados na mesma pasta ( caso este não seja utilizado em outros componentes )

## Componentes de UI

- Componentes de UI são componentes que não possuem lógica de negócio, apenas estilização e renderização de dados
- Componentes de UI devem ser criados na pasta `src/components/ui/`
- Rota completa: `src/components/ui/<ComponentName>.tsx` ( ComponentName em PascalCase )
- Arquivos de componentes de UI devem ser o mais genérico possivel
- Arquivos de componentes de UI devem ser nomeados com a primeira letra maiúscula

## Component x Function/Arrow Function

- Componentes devem ser criados como function components ( export default function <ComponentName> ) `ComponentName em PascalCase`
- Funções são criadas dentro de componentes, não devem ser exportadas ( const <functionName> = () => { ... } ) `functionName em camelCase`

-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
