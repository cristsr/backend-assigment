# Backend Coding Challenge

Code Challenge para candidatos Backend para DocRed.

## Tabla de contenidos

<details open="open">
  <summary>Menú</summary>
  <ol>
    <li>
        <a href="#sobre-el-proyecto">🗂️ Sobre el proyecto</a>
      <ul>
        <li><a href="#contexto">🔍 Contexto</a></li>
        <li><a href="#requerimientos-del-producto">📋 Requerimientos del producto</a></li>
      </ul>
    </li>
    <li><a href="#construido-con">🛠️ Construido con</a></li>
    <li>
      <a href="#comenzando">🚀 Comenzando</a>
      <ul>
        <li><a href="#pre-requisitos">📋 Pre-requisitos</a></li>
        <li><a href="#instalación">🔧 Instalación</a></li>
        <li><a href="#variables-de-entorno">📌 Variables de entorno</a></li>
        <li><a href="#configuracion-de-variables-de-entorno">🛠️ Configuracion de variables de entorno</a></li>
      </ul>
    </li>
    <li><a href="#despliegue">📦 Despliegue y Testing</a></li>
  </ol>
</details>

## Sobre el proyecto

### Contexto

El soporte de nuestros usuarios es muy importante en DocRed. Nuestros agentes quieren ser mas eficientes en la
resolución de los problemas o consultas que nuestros usuarios puedan tener. Para eso, se decidio construir un software
para automatizar el proceso - el software que tu vas a construir.

### Requerimientos del producto

- Los usuarios de Docred pueden reportar un problema.
- Los problemas nuevos deben asignarse automáticamente, a un agente que esté libre.
- Cada agente debe trabajar en un problema a la vez.
- El agente puede marcar un problema como resuelto, de esta manera, el agente queda libre para tomar un nuevo problema.
- El sistema asignará automáticamente, un nuevo problema a un agente, cuando este se libere.

## Construido con

* [NestJs](https://nestjs.com/)
* [TypeOrm](https://typeorm.io/)
* [PostgreSQL](https://www.postgresql.org/)

## Comenzando

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos
de desarrollo y pruebas._

### Pre-requisitos

* [NodeJS v14.15.1](https://nodejs.org/en/)

### Instalación

_Clonar el repositorio._

```sh
git clone https://github.com/cristsr/backend-assigment
```

_Instalar paquetes de NPM._

```sh
npm install
```

### Variables de entorno
Para el correcto funcionamiento de la aplicación se deben definir las siguientes variables de entorno:

| Variable        | Valores por defecto                                  | Descripción                               |
|-----------------|------------------------------------------------------|-------------------------------------------|
| ENV             | local                                                | Ambiente de ejecución                     |
| PORT            | 3000                                                 | Puerto de la app                          |
| DB_TYPE         | postgres                                             | Tipo de base de datos                     |                      
| DB_URI          | postgres://postgres:postgres@localhost:5432/postgres | URI de la base de datos                   |           
| DB_SYNCHRONIZE  | false                                                | Sincronizar entidades en la base de datos |
| SHOW_DOCS       | true                                                 | Mostrar documentación                     |


### Configuración de variables de entorno

En la raiz del proyecto se encuentra el archivo **.envexample** el cual se debe duplicar o copiar en un archivo nuevo
que se debe llamar **.env**

En windows:
```sh
$ copy .envexample .env
```

En linux:
```sh
$ cp .envexample .env
```

Una vez que se ha copiado el archivo, se debe editar el archivo **.env** para que contenga los valores de las variables de entorno.

> 🚧 Nota
>
> Por cuestiones de seguridad, la variable de entorno **DB_URI** se proporciona por correo electrónico, junto al enlace del repositorio

## Despliegue y testing

### Despliegue
Ejecutar `npm run start` en la terminal para iniciar la aplicación.

### Testing
Ejecutar `npm run test:cov` en la terminal para ejecutar las pruebas unitarias.
