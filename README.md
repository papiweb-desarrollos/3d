# 🎨 Generador de Imágenes IA con Conversión 3D

Una aplicación web moderna que combina **Inteligencia Artificial** con **visualización 3D**, permitiendo generar imágenes con prompts de texto y convertirlas en modelos 3D interactivos.

## ✨ Características Principales

### 🤖 **Generación de Imágenes IA**
- **API de Gemini**: Integración completa con Google Generative AI
- **Prompts inteligentes**: Descripciones detalladas generadas automáticamente
- **Interfaz intuitiva**: Ejemplos rápidos y área de texto optimizada
- **Imágenes placeholder**: Generación instantánea con canvas HTML5

### 🎯 **Conversión 3D**
- **Formato GLB**: Exportación a modelos 3D estándar
- **Visualización interactiva**: Controles de rotación, zoom y desplazamiento
- **Three.js**: Renderizado 3D de alta calidad
- **Responsive**: Adaptable a diferentes tamaños de pantalla

### 🎨 **Interfaz Moderna**
- **Pestañas dinámicas**: Navegación fluida entre funcionalidades
- **Diseño futurista**: Gradientes, efectos glassmorphism y animaciones
- **UX optimizada**: Feedback visual y estados de carga

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- Una API Key de Google Gemini

### 1. Clonar el repositorio
```bash
git clone https://github.com/papiweb-desarrollos/3d.git
cd 3d
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:
```bash
GEMINI_API_KEY=tu_api_key_aqui
VITE_GEMINI_API_KEY=tu_api_key_aqui
```

### 4. Ejecutar en modo desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **3D**: Three.js 
- **Build**: Vite 6.2
- **IA**: Google Generative AI (Gemini)
- **Styling**: CSS moderno con gradientes y efectos

## 📁 Estructura del Proyecto

```
/
├── components/
│   ├── AIImageGenerator.tsx    # Generador de imágenes IA
│   ├── CoffeeCup3D.tsx        # Visualizador 3D
│   └── icons.tsx              # Iconos SVG
├── services/
│   └── glbExporter.ts         # Exportador GLB
├── App.tsx                    # Componente principal
├── index.tsx                  # Punto de entrada
├── vite.config.ts            # Configuración Vite
└── package.json              # Dependencias
```

## 🎯 Funcionalidades Destacadas

### 🤖 Generador IA
1. **Prompt inteligente**: Escribe cualquier descripción
2. **Ejemplos rápidos**: Prompts predefinidos para inspiración
3. **Generación automática**: Creación instantánea de imágenes
4. **Integración seamless**: Pasa directamente a conversión 3D

### 🎨 Conversión 3D
1. **Carga de imágenes**: Arrastra y suelta o selecciona archivos
2. **Vista previa**: Visualización antes de convertir
3. **Modelo 3D**: Renderizado interactivo en tiempo real
4. **Exportación**: Descarga en formato GLB

## 🧪 Scripts de Testing

El proyecto incluye varios scripts de prueba:

```bash
# Test de conexión API
node test-api-connection.js

# Test de integración de componentes
node test-component-integration.js

# Test completo del flujo
node test-complete-workflow.js

# Generadores especializados
node generate-claude-human.js
node generate-claude-elegant.js
```

## 🔧 Configuración Avanzada

### Variables de Entorno
- `GEMINI_API_KEY`: Para uso en servidor
- `VITE_GEMINI_API_KEY`: Para uso en cliente (Vite)

### Personalización
- Modifica `components/AIImageGenerator.tsx` para cambiar prompts
- Ajusta `components/CoffeeCup3D.tsx` para personalizar la visualización 3D
- Edita `App.tsx` para modificar la interfaz principal

## 📱 Uso de la Aplicación

### Pestaña "Generador IA"
1. Escribe una descripción de la imagen deseada
2. O selecciona un ejemplo rápido
3. Haz clic en "Generar Imagen con IA"
4. La imagen aparecerá lista para conversión

### Pestaña "Conversión 3D"
1. Carga una imagen (generada o propia)
2. Previsualiza el resultado
3. Haz clic en "Convertir a 3D"
4. Interactúa con el modelo 3D
5. Descarga en formato GLB

## 🎨 Ejemplos de Prompts

```
"Un dragón amigable en un jardín colorido"
"Una ciudad futurista con edificios de cristal"
"Un robot espacial en un paisaje alienígena"
"Claude IA como mujer elegante y sofisticada"
```

## 📄 Licencia

Proyecto de código abierto para fines educativos y de desarrollo.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:
1. Fork el proyecto
2. Crea una branch para tu feature
3. Commit tus cambios
4. Push a la branch
5. Abre un Pull Request

## 📞 Soporte

Para soporte y consultas:
- **GitHub Issues**: [Reportar problemas](https://github.com/papiweb-desarrollos/3d/issues)
- **Documentación**: README y comentarios en código

---

**¡Crea, imagina y visualiza en 3D con el poder de la IA!** 🚀✨
