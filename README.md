# 🧩 app-constructor

## Descripción general

**app-constructor** es un monorepo que contiene tanto el **backend** como el **frontend** de una aplicación web:

- **Backend**: Java + Spring Boot con Hibernate / JPA y arquitectura MVC.
- **Frontend**: Astro para desarrollo web moderno y rendereo optimizado.

---

## 🚀 Estructura del monorepo

```
/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
├── web/
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

- `apps/backend/`: API REST con lógica empresarial, repositorios y servicios en Spring Boot.
- `apps/web/`: sitio web estático/dinámico con Astro y componentes modernos.

---

## 🧱 Tecnologías utilizadas

### Backend
- Java 17+
- Spring Boot
- Hibernate / JPA
- MVC
- Maven 
- JUnit 

### Frontend
- Astro
- Tailwind CSS

---

## Configuración

``` 
spring.datasource.url=jdbc:postgresql://{DB_HOSTNAME}/{DB_NAME}
spring.datasource.username={DB_USER}
spring.datasource.password={DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update

spring.datasource.hikari.ssl=true
server.port=8081

jwt.secret={JWT_SECRET}

springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/docs
```

## 🛠️ Instalación

### Requisitos

- Java JDK 17+
- Node.js y pnpm
- Maven
- Git

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/jhonson-lc/app-constructor.git
cd app-constructor

# Instalar dependencias frontend
cd frontend
pnpm install

# Construir backend
cd ../backend
mvn clean package
```

---

## 🚀 Ejecución

### Backend

```bash
cd backend
mvn spring-boot:run
```

La API estará disponible por defecto en `http://localhost:8081`.

### Frontend

```bash
cd frontend
pnpm run dev
```

El frontend estará en `http://localhost:4321`.

---

## 🔗 Comunicación Frontend ↔ Backend

- El frontend realiza peticiones `fetch` a la API REST del backend.
- Se debe configurar CORS en Spring Boot para permitir el dominio del frontend.

---

## 🎯 Características principales

✅ Monorepo limpio y organizado

✅ Spring Boot + Hibernate para backend robusto

✅ Astro para frontend veloz y moderno

✅ Preparado para despliegue en producción

✅ Escalable y mantenible

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## 👨‍💻 Autor

**Jhonson LC** - [GitHub](https://github.com/jhonson-lc)