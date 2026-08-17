# ShipNow API

API REST para administrar la operación de una logística de distribución: usuarios, productos, pedidos y entregas. También incluye generación de datos de prueba y documentación interactiva con Swagger.

## Funcionalidades

- CRUD de usuarios, productos, pedidos y entregas.
- Gestión de roles, estados y prioridades mediante constantes centralizadas.
- Cálculo del total de un pedido a partir de los productos y cantidades recibidos.
- Validación de referencias entre entidades: un pedido requiere un usuario y productos existentes; una entrega requiere un pedido existente y, si se asigna, un usuario con rol `courier`.
- Módulo de mocks para usuarios, pedidos y entregas, con opción de persistirlos en MongoDB fuera de producción.
- Manejo centralizado de errores y logging con rotación diaria de archivos.
- Documentación OpenAPI disponible desde Swagger UI.

## Tecnologías

- Node.js con Express 5 y ECMAScript Modules.
- MongoDB con Mongoose.
- Swagger (`swagger-jsdoc` y `swagger-ui-express`).
- Winston y `winston-daily-rotate-file` para logs.
- Faker para la generación de datos de prueba.
- pnpm como gestor de dependencias.

## Requisitos e instalación

Se necesita una instancia de MongoDB accesible mediante URI (Atlas o local), Node.js y pnpm.

```bash
git clone <url-del-repositorio>
cd ShipNow
pnpm install
```

Crear un archivo `.env` en la raíz a partir de `.env.example`:

```env
PORT=3000
MONGO_KEY=mongodb+srv://<usuario>:<password>@<cluster>/<base-de-datos>
NODE_ENV=development
JWT_SECRET=<secreto>
```

Las cuatro variables son obligatorias: la aplicación valida su presencia antes de iniciar. Luego ejecutar:

```bash
pnpm run dev
```

El servidor queda disponible en `http://localhost:<PORT>`.

## Documentación Swagger

Con el servidor en ejecución, la documentación interactiva está disponible en:

```text
GET http://localhost:<PORT>/api/docs
```

La especificación se construye en `src/config/swagger.js` con OpenAPI 3.0. Allí se registra el servidor de desarrollo, las etiquetas de cada módulo y el patrón que carga los archivos `src/docs/**/*.yaml`.

Los YAML definen los paths y operaciones documentadas, separados por dominio:

| Archivo | Contenido |
|---|---|
| `health.yaml` | Estado del servidor. |
| `logger.yaml` | Endpoint de diagnóstico del logger. |
| `users.yaml` | Operaciones y filtros de usuarios. |
| `products.yaml` | Operaciones de productos y catálogo disponible. |
| `orders.yaml` | Operaciones de pedidos. |
| `deliveries.yaml` | Operaciones de entregas. |
| `mocks.yaml` | Generación y persistencia de datos de prueba. |

Para evitar repetir definiciones, los YAML usan referencias a los grupos declarados en `src/docs/components/`:

| Archivo | Grupo de componentes | Qué almacena |
|---|---|---|
| `schemas.js` | `GoodRqSchemas`, `BadRqSchemas` | Estructuras y ejemplos de cuerpos de respuesta exitosos y de error. |
| `responses.js` | `GoodResponses`, `BadResponses` | Respuestas HTTP reutilizables para los distintos endpoints, incluidas las respuestas de error. |
| `requestBodies.js` | `RequestBodies` | Cuerpos JSON reutilizables para crear o actualizar recursos y para generar mocks. |
| `parameters.js` | `Parameters` | Parámetros de ruta (`uid`, `pid`, `oid`, `did`) y de consulta (`role`, `email`, `count`). |

Por ejemplo, un YAML referencia un recurso compartido con `$ref: "#/components/<grupo>/<componente>"`. Al agregar un endpoint, se debe documentar su path en el YAML del dominio y reutilizar —o incorporar— el componente correspondiente para sus parámetros, cuerpo y respuestas.

## Arquitectura

La aplicación separa responsabilidades en tres capas:

```text
Router → Controller → Service → Repository → Model (Mongoose)
```

- **Router:** asocia métodos y paths HTTP con controllers.
- **Controller:** recibe la petición, delega en el servicio y envía la respuesta HTTP.
- **Service:** concentra reglas de negocio y validaciones del dominio.
- **Repository:** encapsula el acceso a Mongoose/MongoDB.
- **Model:** define los esquemas y restricciones de persistencia.

Estructura principal:

```text
src/
├── config/        # Entorno, base de datos, Swagger y logger
├── constants/     # Roles, estados y prioridades del dominio
├── controllers/   # Adaptadores HTTP
├── docs/          # Paths YAML y componentes reutilizables de Swagger
├── errors/        # CustomError y catálogo de códigos
├── middlewares/   # Rutas inexistentes y manejo global de errores
├── mocks/         # Router, controller, service y repository de datos de prueba
├── models/        # Esquemas de Mongoose
├── repositories/  # Acceso a datos
├── routes/        # Definición de endpoints
└── services/      # Lógica de negocio
```

## Dominio y reglas principales

| Entidad | Descripción |
|---|---|
| `User` | Tiene nombre, apellido, email único, contraseña y rol: `user`, `admin` o `courier`. |
| `Product` | Tiene código único, precio, stock, categoría, imágenes y estado: `draft`, `available`, `out_of_stock`, `arriving_soon` o `discontinued`. |
| `Order` | Pertenece a un usuario y contiene uno o más productos con cantidad. El total se calcula en el servicio. Sus estados son `pending`, `payment_validated`, `packaged`, `dispatched` y `cancelled`; sus prioridades son `low`, `medium` y `high`. |
| `Delivery` | Se asocia a un pedido y opcionalmente a un repartidor. Sus estados son `pending`, `on_the_way`, `delivered` y `not_delivered`. La fecha estimada final debe ser posterior a la inicial. |

## Endpoints

La especificación de Swagger es la referencia para cuerpos, ejemplos y respuestas por operación. Este es el mapa de rutas implementadas:

| Recurso | Operaciones |
|---|---|
| Salud | `GET /api/health` |
| Logger | `GET /logger-test` |
| Usuarios | `GET`, `POST /api/users`; `GET /api/users/role?role=<rol>`; `GET /api/users/email?email=<email>`; `GET`, `PUT`, `DELETE /api/users/:uid` |
| Productos | `GET`, `POST /api/products`; `GET /api/products/available`; `GET`, `PUT`, `DELETE /api/products/:pid` |
| Pedidos | `GET`, `POST /api/orders`; `GET`, `PUT`, `DELETE /api/orders/:oid` |
| Entregas | `GET`, `POST /api/deliveries`; `GET`, `PUT`, `DELETE /api/deliveries/:did` |
| Mocks* | `GET`, `POST /api/mocks/users`; `GET`, `POST /api/mocks/orders`; `GET`, `POST /api/mocks/deliveries` |

\* Las rutas de mocks solo se montan cuando `NODE_ENV` es distinto de `production`.

## Mocks

Los endpoints `GET /api/mocks/<recurso>?count=N` generan datos sin persistirlos. Si `count` no se envía, se generan 100 elementos; el valor se convierte a entero y debe quedar entre 1 y 100.

Los endpoints `POST /api/mocks/<recurso>` aceptan:

```json
{
  "count": 10,
  "saveToDatabase": true
}
```

Con `saveToDatabase: true`, los datos se insertan en MongoDB y la respuesta es `201`. Si es `false` o se omite, se generan pero no se guardan y se responde `200`.

- Los mocks de usuarios generan roles válidos al azar.
- Los de pedidos requieren usuarios y productos ya existentes.
- Los de entregas requieren pedidos existentes; solo asignan repartidor si hay usuarios con rol `courier`.

Para persistir datos relacionados, el orden recomendado es: usuarios, productos, pedidos y finalmente entregas.

## Errores y logging

Los controllers delegan los errores en un middleware centralizado. `CustomError` y `ERROR_CODES` definen códigos como `NOT_FOUND`, `INVALID_ID`, `BAD_REQUEST`, `VALIDATION_ERROR`, `DUPLICATE_KEY`, `INVALID_MOCK_COUNT` y `MOCK_DATA_NOT_FOUND`. Los errores de Mongoose y de conexión también se convierten a una respuesta segura y uniforme:

```json
{
  "status": "Error",
  "error": "NOT_FOUND",
  "message": "Producto no encontrado."
}
```

Winston registra en consola y guarda errores en `logs/error.log`; además crea archivos diarios `logs/error-YYYY-MM-DD.log` y conserva los últimos 14 días. El nivel mínimo es `debug` en desarrollo e `info` en producción. `GET /logger-test` emite un mensaje en cada nivel configurado.

## Estado actual y consideraciones de seguridad

La autenticación con JWT y la autorización por rol aún no están implementadas, aunque `JWT_SECRET` ya es una variable requerida. En particular, `GET /api/users/email` actualmente devuelve la contraseña almacenada y no está protegido. No se debe exponer esta API en producción hasta implementar autenticación, autorización y hasheo de contraseñas.

No hay una suite de pruebas automatizadas configurada todavía; el script `pnpm test` es un placeholder.
