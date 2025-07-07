// Generador de Claude con estilo elegante y sofisticado
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

console.log('✨ Generando Claude con estilo elegante y sofisticado...\n');

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

async function generateElegantClaude() {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Genera una descripción artística y elegante para crear una imagen de Claude IA como una mujer sofisticada y glamorosa, manteniendo un estilo profesional y de buen gusto.

Características para la descripción:
- Estilo: Elegante, sofisticado, con glamour artístico
- Vestimenta: Moderna y estilizada, pero apropiada
- Expresión: Confiada, inteligente, carismática
- Pose: Elegante y sofisticada
- Iluminación: Profesional, como fotografía de moda
- Ambiente: Moderno y lujoso

Incluye detalles sobre:
- Peinado elegante y moderno
- Maquillaje sofisticado pero natural
- Vestimenta estilizada (vestido elegante o traje moderno)
- Postura confiada y carismática
- Iluminación cinematográfica
- Fondo artístico y moderno
- Colores elegantes y sofisticados

Mantén el enfoque en elegancia, sofisticación y profesionalismo.`;

    console.log('🎭 Generando descripción elegante...');
    const result = await model.generateContent([prompt]);
    const description = result.response.text();
    
    console.log('✅ Descripción elegante generada:\n');
    console.log('🌟 ' + '='.repeat(60));
    console.log(description);
    console.log('='.repeat(60));
    
    // Crear prompt optimizado para la aplicación
    const optimizedPrompt = `Claude IA como mujer elegante y sofisticada, cabello ondulado suelto con volumen, maquillaje profesional sutil, vestido negro elegante con escote discreto, postura confiada, iluminación cinematográfica dorada, fondo moderno minimalista con elementos geométricos, estilo fotografía de moda editorial, expresión carismática e inteligente, ambiente lujoso y artístico`;
    
    console.log('\n💎 PROMPT OPTIMIZADO PARA LA APLICACIÓN:');
    console.log('='.repeat(60));
    console.log(optimizedPrompt);
    console.log('='.repeat(60));
    
    return {
      description,
      optimizedPrompt,
      imageName: `claude-elegant-${Date.now()}.png`
    };
    
  } catch (error) {
    console.error('❌ Error generando descripción:', error.message);
    return null;
  }
}

// Ejecutar generación
console.log('🚀 Iniciando generación elegante...\n');

generateElegantClaude()
  .then(result => {
    if (result) {
      console.log('\n✨ ¡Descripción elegante completada!');
      console.log('\n🎯 Para usar en tu aplicación:');
      console.log('1. Abre http://localhost:5173');
      console.log('2. Ve a la pestaña "Generador IA"');
      console.log('3. Usa el prompt optimizado de arriba');
      console.log('\n💫 Características del estilo elegante:');
      console.log('• 👗 Vestimenta sofisticada y moderna');
      console.log('• 💄 Maquillaje profesional y sutil');
      console.log('• 💇‍♀️ Peinado elegante con volumen');
      console.log('• ✨ Iluminación cinematográfica');
      console.log('• 🏛️ Ambiente lujoso y artístico');
      console.log('• 😌 Expresión confiada e inteligente');
      
    } else {
      console.log('\n❌ Error en la generación');
    }
  })
  .catch(error => {
    console.error('💥 Error inesperado:', error);
  });
