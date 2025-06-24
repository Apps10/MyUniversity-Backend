 Sistema Académico — Backend

Este es el backend de un sistema académico desarrollado con **NestJS**, **Prisma ORM**, **MySQL** y basado en **arquitectura hexagonal (DDD)**. Permite la gestión de estudiantes, materias, programas académicos y control de créditos.

## 🧱 Tecnologías

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)
- Arquitectura hexagonal

## ✨ Características

- Registro de estudiantes con validación de documento y correo.
- Relación entre programas académicos y estudiantes.
- Cada estudiante puede tener un solo programa.
- Gestión de materias y profesores.
- Inscripción de estudiantes a materias (máximo 3 materias por estudiante).
- Control de créditos disponibles y seleccionados.
- Visualización de estudiantes inscritos por materia.
- Asignación automática de profesores por materia.
- Restricción: un estudiante no puede repetir profesor.

## 🛠️ Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo/backend
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Configura el entorno
Crea una copia del archivo .env.example como .env en la raíz del backend:

```bash
DATABASE_URL="mysql://user:password@localhost:3306/nombre_de_tu_base"
```
Cambia los valores según tu configuración local.


### 4. Corre la base de datos
```bash
docker compose up -d
```

### 5. Ejecuta las migraciones y genera el cliente Prisma
```bash
npx prisma db push
npx prisma generate
```


### 6. Corre el servidor de desarrollo
```bash
npm run start:dev
```

## 📁 Estructura del proyecto
```bash
src/
├── application/        # Casos de uso
├── domain/             # Entidades y lógica del dominio
├── infraestructure/    # Módulos de NestJS, controladores
├── shared/             # PrismaService, utilidades
├── prisma/             # Migraciones y esquema
generated/
└── prisma/             # Cliente Prisma personalizado
```