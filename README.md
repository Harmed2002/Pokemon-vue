# Pokemon-vue

## Listado de Pokedex y gestión de favoritos

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20desarrollo-yellow)

## Configuración recomendada del navegador

-   Navegadores basados en Chromium (Chrome, Edge, Brave, etc.):
    -   [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
    -   [Activar el formateador de objetos personalizados en Chrome DevTools](http://bit.ly/object-formatters)
-   Firefox:
    -   [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
    -   [Activar el formateador de objetos personalizados en Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 🚀 Características principales

-   **Ventana de Bienvenida**: Ventana con mensaje de bienvenida
-   **Ventana de Loading**: Ventana que se despliega mientras se hace la carga de datos
-   **Listado de Pokemons**: Ventana con lista de nombres de Pokemons y botón para marcar/desmarcar favoritos 
-   **Listado de Favoritos**: Ventana con lista de Pokemons favoritos y botón para marcar/desmarcar favoritos
-   **Ventana de Detalle de Pokemon**: Ventana modal que muestra el detalle del Pokemon seleccionado y botón para marcar/desmarcar favoritos
-   **Entrada para búsqueda**: Funcionalidad para las búsquedas interactivas de pokemons por nombre

## 💻 Tecnologías implementadas

-   **Vue.js**: Para una experiencia de usuario fluida y moderna
-   **TailwindCSS**: Para construir interfaces de manera ágil, reduciendo el tiempo de desarrollo
-   **Pinia**: Biblioteca de gestión de estado para aplicaciones Vue, comparte y gestiona datos de manera centralizada entre diferentes componentes
-   **pinia-plugin-persistedstate**: Plugin para persistir el estado de las tiendas de Pinia entre recargas de la página, manteniendo los datos guardados en el navegador del usuario (LocalStorage)
-   **Axios**: Para realizar solicitudes HTTP, consultas API, de forma sencilla y eficiente desde aplicaciones web y móviles
-   **TypeScript**: Para desarrollar aplicaciones JavaScript robustas y escalables mediante el uso de un sistema de tipado estático

## 🚀 Características funcionales
-   **Búsqueda en tiempo real**: Filtra mientras escribes
-   **Toggle All/Favorites**: Cambia entre vistas
-   **Scroll infinito**: Solo en modo "All" para obtener los datos a medida que se visualizan
-   **Click en favoritos**: Marca/desmarca favorito
-   **Persistencia**: Pokemons y favoritos guardados en localStorage

## 📋 Requisitos previos

-   Node.js y npm
-   Vue.js 3.5.22
-   Axios 1.12.2

## ⚙️ Instalación

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/Harmed2002/Pokemon-vue.git

    ```

2. **Entrar al directorio raiz**

    ```bash
    cd pokemon-vue

    ```

3. **Instalar los paquetes de npm**

    ```bash
    npm install

    ```

### Compilar y recargar en caliente para el desarrollo

```sh
npm run dev
```

### Chequeo de tipos, compilación y minificación para producción

```sh
npm run build
```

### Lint wiconth [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Correr las pruebas

```sh
npm run test
```
