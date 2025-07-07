// Test de conexión con la API de Gemini
import { GoogleGenerativeAI } from '@google/generative-ai';

// Cargar variables de entorno
import fs from 'fs';
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key] = value;
  }
});

const API_KEY = envVars.GEMINI_API_KEY || envVars.VITE_GEMINI_API_KEY;

console.log('🔍 Verificando conexión con API de Gemini...');
console.log(`📋 API Key encontrada: ${API_KEY ? 'Sí' : 'No'}`);
console.log(`🔑 Primeros caracteres: ${API_KEY ? API_KEY.substring(0, 10) + '...' : 'N/A'}`);

async function testGeminiConnection() {
  try {
    if (!API_KEY) {
      throw new Error('API Key no encontrada en .env.local');
    }

    console.log('\n⏳ Inicializando cliente de Gemini...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    console.log('⏳ Obteniendo modelo...');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log('⏳ Enviando prompt de prueba...');
    const prompt = "Responde con exactamente 3 palabras: 'Conexión API exitosa'";
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('\n✅ CONEXIÓN EXITOSA!');
    console.log(`📨 Respuesta de la API: ${text}`);
    console.log(`📊 Longitud de respuesta: ${text.length} caracteres`);
    
    return true;
  } catch (error) {
    console.error('\n❌ ERROR EN LA CONEXIÓN:');
    console.error(`🚨 Tipo de error: ${error.name}`);
    console.error(`💬 Mensaje: ${error.message}`);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.error('🔧 Solución: Verifica que tu API Key sea válida');
    } else if (error.message.includes('PERMISSION_DENIED')) {
      console.error('🔧 Solución: Verifica los permisos de tu API Key');
    } else if (error.message.includes('QUOTA_EXCEEDED')) {
      console.error('🔧 Solución: Has excedido tu cuota de API');
    }
    
    return false;
  }
}

testGeminiConnection()
  .then(success => {
    if (success) {
      console.log('\n🎉 La API de Gemini está lista para usar en tu aplicación!');
    } else {
      console.log('\n🔧 Revisa la configuración antes de continuar.');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Error inesperado:', error);
    process.exit(1);
  });
