# Sistema de Formularios - Univalle

Sistema de login y gestión de formularios para la Universidad del Valle.

## 📋 Requisitos Previos

Antes de empezar, necesitas tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
  - Descárgalo desde: https://nodejs.org/
  - Recomendado: Descargar la versión LTS (Long Term Support)

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/SamuelVicente937/ProyectoSistemas1.git
cd ProyectoSistemas1/SistemaFormularios
```

O si no tienes Git instalado:
- Ve a: https://github.com/SamuelVicente937/ProyectoSistemas1
- Click en el botón verde "Code"
- Click en "Download ZIP"
- Descomprime el archivo
- Abre la carpeta en tu terminal o CMD

### 2. Instalar dependencias
```bash
npm install
```

Este comando instalará automáticamente:
- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (iconos)
- Y todas las demás dependencias necesarias

### 3. Ejecutar el proyecto
```bash
npm run dev
```

El proyecto se abrirá en: `http://localhost:5173`

## 🛠️ Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila el proyecto para producción
- `npm run preview` - Vista previa de la versión de producción

## 📁 Estructura del Proyecto
```
src/
├── components/
│   ├── Login/
│   │   └── Login.tsx
│   ├── Input/
│   │   └── Input.tsx
│   ├── Button/
│   │   └── Button.tsx
│   └── index.ts
├── assets/
│   └── logo-univalle.png
├── App.tsx
└── main.tsx
```

## 🎨 Tecnologías Utilizadas

- **React** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - JavaScript con tipado estático
- **Tailwind CSS** - Framework de CSS utility-first
- **Vite** - Herramienta de construcción rápida
- **Lucide React** - Iconos modernos

## ⚠️ Solución de Problemas

### Error: "node no se reconoce como comando"
- Asegúrate de haber instalado Node.js correctamente
- Reinicia tu terminal o CMD después de instalar Node.js

### Error: "npm no se reconoce como comando"
- Node.js incluye npm automáticamente
- Verifica que Node.js esté en las variables de entorno del sistema

### El puerto 5173 ya está en uso
```bash
# Busca el proceso y ciérralo, o usa otro puerto
npm run dev -- --port 3000
```

### Los estilos no se ven correctamente
```bash
# Limpia la caché y reinstala
rm -rf node_modules
npm install
npm run dev
```

## 📝 Notas

- No subas la carpeta `node_modules` a GitHub (ya está en `.gitignore`)
- Si modificas algo, haz commit y push de tus cambios
- Cada vez que alguien descargue el proyecto, debe correr `npm install`
