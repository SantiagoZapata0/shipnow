# ShipNow API

## Descripción

ShipNow es una API REST para la gestión de una logística de distribución de productos. Permite administrar usuarios (con roles diferenciados), productos (con control de stock y estado), pedidos y entregas, sobre una arquitectura profesional por capas. Incluye además un módulo de mocking para generar datos de prueba sin cargarlos a mano.

## Tecnologías utilizadas

- **Node.js** + **Express** — servidor y ruteo HTTP
- **MongoDB** (Atlas) + **Mongoose** — base de datos y modelado
- **dotenv** — manejo de variables de entorno
- **@faker-js/faker** — generación de datos de prueba (mocking)
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
| `NODE_ENV`    | Entorno de ejecución (`development` / `production`). Determina, entre otras cosas, si el módulo de mocking queda disponible (ver sección Mocking). |
| `JWT_SECRET`  | Clave secreta para la firma de tokens JWT (autenticación, pendiente de implementar) |

Si alguna de estas variables falta al arrancar la aplicación, el servidor **no inicia** y lanza un error descriptivo indicando cuál falta.

## Arquitectura del proyecto

El proyecto sigue una arquitectura de **3 capas**: **Controller → Service → Repository**. El Router y el Model son piezas de soporte que complementan esa arquitectura (el Router dirige las peticiones HTTP hacia el Controller correspondiente; el Model define la estructura de datos que el Repository consulta), pero no se cuentan como una capa adicional — son requisitos para que las 3 capas centrales funcionen, no una capa más.

Flujo completo de una petición:
```
Router → Controller → Service → Repository → Model (Mongoose)
```

```
src/
├── config/            # Validación y exportación de variables de entorno
├── constants/         # Valores inmutables del dominio (roles, estados, prioridades)
├── models/            # Definición de esquemas de Mongoose (Product, User, Order, Delivery)
├── repositories/      # Único punto de acceso a Mongoose/MongoDB (1 de las 3 capas)
├── services/          # Lógica de negocio (1 de las 3 capas)
├── controllers/       # Manejo de req/res (1 de las 3 capas)
├── routes/            # Definición de endpoints
├── mocks/             # Módulo de mocking (repositories, services, controllers, routes propios)
├── test/              # Reservado para tests automatizados (pendiente de implementar)
└── app.js / server.js
```

- **Router**: conecta cada path y método HTTP con su Controller correspondiente. No contiene lógica.
- **Controller**: única puerta de entrada HTTP. Recibe `req`, llama al Service, devuelve la respuesta con el status code correspondiente. No conoce Mongoose ni reglas de negocio.
- **Service**: contiene toda la lógica de negocio (validaciones, filtros según rol, cálculos, armado de respuestas). Es el único que decide *qué* datos pedir y *por qué*.
- **Repository**: único lugar que conoce Mongoose. Expone métodos de acceso a datos (búsqueda, creación, actualización, borrado), sin decidir reglas de negocio.
- **Model**: define exclusivamente el esquema de cada entidad (estructura, tipos, validaciones de formato, referencias).

El módulo de **mocking** replica esta misma separación en su propia carpeta (`mocks/`), con Repository, Service, Controller y Router propios, para no mezclar datos de prueba con la lógica real de producción.

## Decisión de diseño: Service vs Repository

Se optó por separar estrictamente la lógica de negocio (Service) del acceso a datos (Repository) para que cada capa tenga una única responsabilidad y el código sea más fácil de mantener y testear.

El **Repository** se mantiene deliberadamente "tonto": solo sabe consultar o modificar la base de datos a partir de los parámetros que recibe (por ejemplo, `findAllProducts(filters)` recibe un objeto de filtros ya armado y lo pasa a Mongoose tal cual). No decide *qué* filtrar ni *por qué* — eso es responsabilidad de negocio.

El **Service**, en cambio, es quien conoce las reglas del dominio. Un ejemplo concreto es el listado de productos: un usuario común solo debe ver productos con estado `AVAILABLE` y stock mayor a cero, mientras que un administrador necesita ver el catálogo completo (incluyendo borradores, sin stock o discontinuados) para poder gestionarlos. Esta decisión depende del contexto de la petición, por lo que corresponde al Service (`getAvailableProducts()` y `getAllProducts()`), no al Repository.

Esta separación también evita que el Repository se convierta en un "pasamanos" (un simple `return Model.find()` sin agregar valor), y facilita que si cambia una regla de negocio, el cambio se haga en un solo lugar sin tocar la capa de acceso a datos.

El mismo criterio se aplicó en el módulo de mocking: la **generación** de datos falsos con Faker vive en el Service (no requiere Mongoose), mientras que el **guardado masivo** en la base (`insertMany`) vive en un Repository propio del módulo de mocks, para no mezclar operaciones de prueba con los Repository de producción.

## Entidades del dominio

| Entidad    | Descripción                                                                 |
|------------|-------------------------------------------------------------------------------|
| `Product`  | Productos del catálogo. Estados: `DRAFT`, `AVAILABLE`, `OUT_OF_STOCK`, `ARRIVING_SOON`, `DISCONTINUED`. |
| `User`     | Usuarios del sistema. Roles: `USER`, `ADMIN`, `COURIER` (repartidor).       |
| `Order`    | Pedidos realizados por un usuario. Contiene un array de ítems (producto + cantidad) y un total calculado. Estados: `PENDING`, `PAYMENT_VALIDATED`, `PACKAGED`, `DISPATCHED`, `CANCELLED`. Prioridades: `LOW`, `MEDIUM`, `HIGH`. |
| `Delivery` | Entrega física asociada a un pedido, y opcionalmente a un repartidor (`User` con rol `COURIER`) una vez asignado. Estados: `PENDING`, `ON_THE_WAY`, `DELIVERED`, `NOT_DELIVERED`. |

Todas las constantes de roles, estados y prioridades están centralizadas en `src/constants/constants.js` y definidas con `Object.freeze`, evitando strings sueltos en el resto del código.

## Endpoints principales

### Products

| Método | Endpoint                   | Descripción                                  |
|--------|------------------------------|-----------------------------------------------|
| GET    | `/api/products`              | Lista todos los productos (admin)             |
| GET    | `/api/products/available`    | Lista productos disponibles (usuario)         |
| GET    | `/api/products/:pid`         | Obtiene un producto por ID                    |
| POST   | `/api/products`               | Crea un nuevo producto                        |
| PUT    | `/api/products/:pid`          | Actualiza un producto existente               |
| DELETE | `/api/products/:pid`          | Elimina un producto                           |

### Users

| Método | Endpoint                    | Descripción                                |
|--------|-------------------------------|----------------------------------------------|
| GET    | `/api/users`                  | Lista todos los usuarios                     |
| GET    | `/api/users/role?role=`       | Lista usuarios filtrados por rol (query param) |
| GET    | `/api/users/email?email=`     | Busca un usuario por email (query param)     |
| GET    | `/api/users/:uid`             | Obtiene un usuario por ID                    |
| POST   | `/api/users`                   | Crea un nuevo usuario                        |
| PUT    | `/api/users/:uid`              | Actualiza un usuario existente               |
| DELETE | `/api/users/:uid`              | Elimina un usuario                           |

### Health check

| Método | Endpoint       | Descripción                     |
|--------|-----------------|-----------------------------------|
| GET    | `/api/health`   | Verifica que el servidor esté activo |

## Mocking y carga de datos de prueba

El módulo de mocking permite generar datos simulados de **Usuarios** (incluyendo repartidores, vía rol `COURIER`), **Pedidos** y **Entregas**, sin necesidad de cargarlos a mano. Cada entidad expone dos endpoints bajo el prefijo común `/api/mocks`:

- **`GET`**: genera los datos y los devuelve en la respuesta, **sin guardarlos** en la base.
- **`POST`**: genera los datos y, si se indica, los **guarda** en MongoDB.

> ⚠️ El módulo de mocking solo está disponible cuando `NODE_ENV` **no** es `production` (se monta condicionalmente en `app.js`).

### Endpoints de mocking

| Método | Endpoint             | Descripción                                                  |
|--------|------------------------|-----------------------------------------------------------------|
| GET    | `/api/mocks/users?count=N`      | Genera `N` usuarios falsos (roles válidos) sin guardarlos     |
| POST   | `/api/mocks/users`               | Genera usuarios falsos y los guarda si `saveToDatabase: true` |
| GET    | `/api/mocks/orders?count=N`      | Genera `N` pedidos falsos sin guardarlos                       |
| POST   | `/api/mocks/orders`              | Genera pedidos falsos y los guarda si `saveToDatabase: true`  |
| GET    | `/api/mocks/deliveries?count=N`  | Genera `N` entregas falsas sin guardarlas                      |
| POST   | `/api/mocks/deliveries`          | Genera entregas falsas y las guarda si `saveToDatabase: true` |

Body esperado en los endpoints `POST`:
```json
{
  "count": 10,
  "saveToDatabase": true
}
```
Si `saveToDatabase` se omite o es `false`, los datos se generan y se devuelven en la respuesta, pero no se persisten.

### Qué datos genera cada mock

- **Usuarios**: nombre, apellido, email y contraseña con Faker; rol elegido al azar entre `USER_ROLES` (`USER`, `ADMIN`, `COURIER`).
- **Pedidos**: requieren usuarios y productos **ya existentes** en la base (los referencia por `_id`, no inventa nuevos). Cada pedido tiene entre 1 y 5 ítems con cantidades aleatorias, `total` calculado a partir del precio real de cada producto, y `status`/`priority` elegidos entre las constantes correspondientes.
- **Entregas**: requieren pedidos **ya existentes**. El repartidor (`courier`) se asigna aproximadamente en el 50% de los casos (simulando entregas aún sin asignar); las fechas `estimatedFrom` y `estimatedTo` representan una ventana de entrega de 7 días.

### Orden recomendado para probar

Como Pedidos y Entregas referencian datos reales, conviene generarlos en este orden:

1. Cargar o generar **usuarios** (`POST /api/mocks/users` con `saveToDatabase: true`).
2. Cargar **productos** reales manualmente (`POST /api/products`), ya que no forman parte del módulo de mocking.
3. Generar **pedidos** (`POST /api/mocks/orders` con `saveToDatabase: true`), que van a referenciar los usuarios y productos ya existentes.
4. Generar **entregas** (`POST /api/mocks/deliveries` con `saveToDatabase: true`), que van a referenciar los pedidos ya existentes y, si hay, a los usuarios con rol `COURIER`.