# ShipNow API

## Descripción

ShipNow es una API REST para la gestión de una logística de distribución de productos. Permite administrar usuarios (con roles diferenciados) y productos (con control de stock y estado), sobre una arquitectura profesional por capas.

## Tecnologías utilizadas

- **Node.js** + **Express** — servidor y ruteo HTTP
- **MongoDB** (Atlas) + **Mongoose** — base de datos y modelado
- **dotenv** — manejo de variables de entorno
- **ESM** (ECMAScript Modules) — sistema de importación

## Instalación y ejecución local

### Requisitos previos

- Node.js instalado (v18 o superior recomendado)
- pnpm como gestor de paquetes
- Una base de datos MongoDB Atlas activa (o local, adaptando la URI)

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd shipnow
   ```

2. Instalar dependencias:
   ```bash
   pnpm install
   ```

3. Configurar las variables de entorno: crear un archivo `.env` en la raíz del proyecto siguiendo el formato de `.env.example` (ver sección siguiente).

4. Levantar el servidor en modo desarrollo:
   ```bash
   pnpm run dev
   ```

5. Verificar que el servidor esté activo entrando a:
   ```
   GET http://localhost:<PORT>/api/health
   ```

## Variables de entorno

El archivo `.env` debe incluir las siguientes variables (ver `.env.example`):

| Variable      | Descripción                                              |
|---------------|-----------------------------------------------------------|
| `PORT`        | Puerto en el que se levanta el servidor                  |
| `MONGO_KEY`   | URI de conexión a la base de datos MongoDB Atlas          |
| `NODE_ENV`    | Entorno de ejecución (`development` / `production`)       |
| `JWT_SECRET`  | Clave secreta para la firma de tokens JWT (autenticación) |

Si alguna de estas variables falta al arrancar la aplicación, el servidor **no inicia** y lanza un error descriptivo indicando cuál falta. Esto evita que la app quede corriendo con una configuración incompleta o inválida.

## Arquitectura del proyecto

El proyecto sigue una arquitectura de 3 capas, con un flujo de dependencias unidireccional:

```
Router → Controller → Service → Repository → Model (Mongoose)
```

```
src/
├── config/         # Validación y exportación de variables de entorno
├── constants/       # Valores inmutables del dominio (roles, estados)
├── models/          # Definición de esquemas de Mongoose
├── repositories/     # Único punto de acceso a Mongoose/MongoDB
├── services/         # Lógica de negocio
├── controllers/      # Manejo de req/res
├── routes/           # Definición de endpoints
└── app.js / server.js
```

- **Router**: conecta cada path y método HTTP con su Controller correspondiente. No contiene lógica.
- **Controller**: única puerta de entrada HTTP. Recibe `req`, llama al Service, devuelve la respuesta con el status code correspondiente. No conoce Mongoose ni reglas de negocio.
- **Service**: contiene toda la lógica de negocio (validaciones, filtros según rol, armado de respuestas). Es el único que decide *qué* datos pedir y *por qué*.
- **Repository**: único lugar que conoce Mongoose. Expone métodos de acceso a datos (búsqueda, creación, actualización, borrado), sin decidir reglas de negocio.
- **Model**: define exclusivamente el esquema de cada entidad (estructura, tipos, validaciones de formato).

## Decisión de diseño: Service vs Repository

Se optó por separar estrictamente la lógica de negocio (Service) del acceso a datos (Repository) para que cada capa tenga una única responsabilidad y el código sea más fácil de mantener y testear.

El **Repository** se mantiene deliberadamente "tonto": solo sabe consultar o modificar la base de datos a partir de los parámetros que recibe (por ejemplo, `findAllProducts(filters)` recibe un objeto de filtros ya armado y lo pasa a Mongoose tal cual). No decide *qué* filtrar ni *por qué* — eso lo definimos como responsabilidad de negocio.

El **Service**, en cambio, es quien conoce las reglas del dominio. Un ejemplo concreto de esta separación en el proyecto es el listado de productos: un usuario común solo debe ver productos con estado `AVAILABLE` y stock mayor a cero, mientras que un administrador necesita ver el catálogo completo (incluyendo productos sin stock o discontinuados) para poder gestionarlos. Esta decisión —qué mostrar según el rol de quien consulta— depende del contexto de la petición, por lo que corresponde al Service (`getAvailableProducts()` y `getAllProducts()`), y no al Repository, que simplemente ejecuta la consulta con los filtros que se le indican.

Esta separación también evita el problema de que el Repository se convierta en un "pasamanos" (un simple `return Model.find()` sin agregar valor), y facilita que, si en el futuro cambia una regla de negocio (por ejemplo, qué se considera "disponible"), el cambio se haga en un solo lugar (el Service) sin tocar la capa de acceso a datos.

## Endpoints principales

### Products

| Método | Endpoint               | Descripción                                  |
|--------|-------------------------|-----------------------------------------------|
| GET    | `/api/products`         | Lista todos los productos (admin)             |
| GET    | `/api/products/available` | Lista productos disponibles (usuario)       |
| GET    | `/api/products/:pid`    | Obtiene un producto por ID                    |
| POST   | `/api/products`         | Crea un nuevo producto                        |
| PUT    | `/api/products/:pid`    | Actualiza un producto existente               |
| DELETE | `/api/products/:pid`    | Elimina un producto                           |

### Users

| Método | Endpoint             | Descripción                                |
|--------|------------------------|----------------------------------------------|
| GET    | `/api/users`           | Lista todos los usuarios                     |
| GET    | `/api/users/role?role=` | Lista usuarios filtrados por rol            |
| GET    | `/api/users/email`     | Busca un usuario por email                   |
| GET    | `/api/users/:uid`      | Obtiene un usuario por ID                    |
| POST   | `/api/users`           | Crea un nuevo usuario                        |
| PUT    | `/api/users/:uid`      | Actualiza un usuario existente               |
| DELETE | `/api/users/:uid`      | Elimina un usuario                           |

### Health check

| Método | Endpoint       | Descripción                     |
|--------|-----------------|-----------------------------------|
| GET    | `/api/health`   | Verifica que el servidor esté activo |