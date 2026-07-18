# To-Do List App

Aplicación híbrida de lista de tareas construida con **Ionic 8 + Angular 20 + Capacitor**.

## Funcionalidades

- Agregar, marcar como completadas y eliminar tareas
- Crear, editar y eliminar categorías
- Asignar categorías a las tareas
- Filtrar tareas por categoría y estado (todas / pendientes / completadas)
- Almacenamiento local persistente (Ionic Storage)
- Firebase Remote Config con feature flag (`feature_task_deadlines`) para activar/desactivar fechas límite

## Requisitos

- Node.js 18+
- npm 9+
- Ionic CLI: `npm install -g @ionic/cli`
- **Android**: Android Studio + Android SDK
- **iOS**: macOS + Xcode 15+ (solo en macOS)

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
ionic serve
```

## Compilar para Android

```bash
ionic build
npx cap sync android
npx cap open android
```

Desde Android Studio, seleccionar un emulador o dispositivo y ejecutar.

## Compilar para iOS (solo macOS)

```bash
ionic build
npx cap sync ios
npx cap open ios
```

Desde Xcode, seleccionar un simulador o dispositivo y ejecutar.

## Firebase Remote Config

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Agregar una app web y copiar las credenciales
3. Actualizar `src/environments/environment.ts` y `src/environments/environment.prod.ts` con las credenciales
4. En Firebase Console > Remote Config, crear el parámetro `feature_task_deadlines` con valor `true` o `false`
5. La aplicación leerá este valor y mostrará/ocultará el campo de fecha límite al crear tareas

## Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── task-item/         # Componente de tarea individual
│   │   └── category-filter/   # Filtro de categorías
│   ├── home/                  # Página principal (lista de tareas)
│   ├── models/
│   │   ├── task.model.ts      # Interfaz Task
│   │   └── category.model.ts  # Interfaz Category
│   ├── pages/
│   │   └── categories/        # Página de gestión de categorías
│   └── services/
│       ├── task.service.ts        # CRUD de tareas con Ionic Storage
│       ├── category.service.ts    # CRUD de categorías con Ionic Storage
│       └── remote-config.service.ts # Firebase Remote Config
├── environments/              # Configuración de Firebase
└── main.ts                    # Punto de entrada con APP_INITIALIZER
```
