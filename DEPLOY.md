# 🚀 Guía de Deploy en GitHub Pages

## ✅ Configuración Automática

Tu aplicación ya está configurada para deploy automático en GitHub Pages. Aquí están los pasos para activarlo:

## 📋 Pasos para Activar GitHub Pages

### 1. **Configurar GitHub Secrets**
Ve a tu repositorio en GitHub: `https://github.com/papiweb-desarrollos/3d`

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Haz clic en **New repository secret**
3. Agrega el secret:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Secret**: Tu clave de API de Gemini

### 2. **Activar GitHub Pages**
1. Ve a **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Guarda la configuración

### 3. **Activar Workflows**
1. Ve a la pestaña **Actions** de tu repositorio
2. Si aparece un botón "Enable GitHub Actions", haz clic en él
3. Los workflows se ejecutarán automáticamente en cada push

## 🔄 Deploy Automático

Una vez configurado, el deploy será automático:

- ✅ **Push a main** → Deploy automático
- ✅ **Pull requests** → Build de prueba
- ✅ **URL automática**: `https://papiweb-desarrollos.github.io/3d/`

## 🛠️ Archivos de Deploy

### `.github/workflows/deploy.yml`
Workflow de GitHub Actions que:
- Instala dependencias
- Hace build de la aplicación
- Despliega a GitHub Pages
- Usa la API key desde GitHub Secrets

### `vite.config.ts` actualizado
- Base path configurado para GitHub Pages: `/3d/`
- Build optimizado para producción
- Variables de entorno incluidas

## 🌐 URLs del Proyecto

- **Repositorio**: https://github.com/papiweb-desarrollos/3d
- **GitHub Pages** (después del deploy): https://papiweb-desarrollos.github.io/3d/
- **Actions**: https://github.com/papiweb-desarrollos/3d/actions

## 🔧 Comandos Locales

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📱 Verificación Post-Deploy

Después del primer deploy, verifica:

1. ✅ **Aplicación carga** correctamente
2. ✅ **API de Gemini** funciona
3. ✅ **Generador IA** responde
4. ✅ **Visualización 3D** funciona
5. ✅ **Responsive design** en móviles

## ⚡ Deploy Manual (Alternativo)

Si prefieres deploy manual:

```bash
# Build local
npm run build

# El contenido estará en ./dist/
# Sube manualmente a tu hosting preferido
```

## 🚨 Troubleshooting

### Error: "API Key not found"
- Verifica que el secret `VITE_GEMINI_API_KEY` esté configurado
- Revisa que el nombre sea exacto (case-sensitive)

### Error: "404 Page not found"
- Verifica que GitHub Pages esté activado
- Confirma que el base path en vite.config.ts sea correcto

### Error de Build
- Revisa los logs en la pestaña Actions
- Verifica que todas las dependencias estén en package.json

---

## 🎉 ¡Listo para el Deploy!

Tu aplicación está **completamente configurada** para GitHub Pages. Solo necesitas:

1. **Agregar el GitHub Secret** con tu API key
2. **Activar GitHub Pages** 
3. **Hacer push** de estos cambios

¡Tu aplicación estará disponible públicamente en minutos! 🚀
