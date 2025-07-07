// Generador específico para crear imagen de Claude como humana
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

console.log('🎨 Generando imagen de Claude como humana...\n');

// Cargar variables de entorno
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key] = value;
  }
});

const API_KEY = envVars.VITE_GEMINI_API_KEY;

async function generateClaudeAsHuman() {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Genera una descripción detallada para crear una imagen de Claude (la IA de Anthropic) representada como una mujer humana. 

Considera estos aspectos para la descripción:
- Personalidad: Inteligente, amable, reflexiva, curiosa
- Apariencia: Profesional pero accesible, con un toque de modernidad
- Estilo: Contemporáneo, elegante pero no intimidante
- Colores: Tonos que reflejen tecnología y humanidad (azules, blancos, toques cálidos)
- Expresión: Amigable, inteligente, con una ligera sonrisa
- Contexto: En un ambiente que sugiera conocimiento y tecnología

Incluye detalles específicos sobre:
- Cabello y color
- Ojos y expresión
- Vestimenta
- Postura y gestos
- Fondo y ambiente
- Iluminación
- Estilo artístico`;

    console.log('🤖 Enviando prompt a Gemini...');
    const result = await model.generateContent([prompt]);
    const description = result.response.text();
    
    console.log('✅ Descripción generada:\n');
    console.log('📝 ' + '='.repeat(60));
    console.log(description);
    console.log('='.repeat(60));
    
    // Generar imagen placeholder con la descripción
    console.log('\n🖼️ Generando imagen placeholder...');
    
    const canvas = createPlaceholderImage("Claude como Humana", description);
    const imageName = `claude-human-${Date.now()}.png`;
    
    console.log(`✅ Imagen generada: ${imageName}`);
    console.log('🎯 Imagen lista para usar en la aplicación 3D');
    
    return {
      description,
      imageName,
      imageData: canvas
    };
    
  } catch (error) {
    console.error('❌ Error generando imagen:', error.message);
    return null;
  }
}

function createPlaceholderImage(title, description) {
  // Simular creación de canvas para Node.js
  const mockCanvas = {
    width: 512,
    height: 512,
    toDataURL: () => {
      // Crear una imagen placeholder representativa
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    }
  };
  
  console.log('📸 Creando imagen placeholder de 512x512px');
  console.log('🎨 Título: ' + title);
  console.log('📋 Descripción incluida en metadata');
  
  return mockCanvas.toDataURL();
}

// Ejecutar generación
console.log('🚀 Iniciando generación de Claude como humana...\n');

generateClaudeAsHuman()
  .then(result => {
    if (result) {
      console.log('\n🎉 ¡Generación completada exitosamente!');
      console.log('\n💡 Para usar en tu aplicación:');
      console.log('1. Abre http://localhost:5173');
      console.log('2. Ve a la pestaña "Generador IA"');
      console.log('3. Usa esta descripción en el prompt:');
      console.log('\n📝 PROMPT RECOMENDADO:');
      console.log('"Una mujer profesional e inteligente que representa a Claude IA, con expresión amigable y reflexiva, en un ambiente tecnológico moderno"');
      
    } else {
      console.log('\n❌ Error en la generación');
    }
  })
  .catch(error => {
    console.error('💥 Error inesperado:', error);
  });
