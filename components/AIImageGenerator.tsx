import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AIImageGeneratorProps {
  onImageGenerated: (imageUrl: string, imageName: string) => void;
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Por favor ingresa una descripción para la imagen');
      return;
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError('API Key de Gemini no configurada');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Nota: Gemini actualmente no genera imágenes directamente
      // Esta es una implementación de ejemplo que puedes adaptar
      // según el servicio de generación de imágenes que uses
      
      // Por ahora, simularemos la generación con una imagen placeholder
      const response = await model.generateContent([
        `Genera una descripción detallada para crear una imagen basada en: "${prompt}". 
         Incluye colores, estilo, composición y detalles específicos.`
      ]);

      const description = response.response.text();
      
      // Aquí podrías integrar con un servicio de generación de imágenes real
      // como DALL-E, Midjourney API, o Stable Diffusion
      
      // Por ahora, generamos una imagen placeholder con la descripción
      const placeholderImageUrl = generatePlaceholderImage(prompt);
      
      onImageGenerated(placeholderImageUrl, `ai-generated-${Date.now()}.png`);
      setPrompt('');
      
    } catch (err: any) {
      setError(`Error al generar imagen: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePlaceholderImage = (text: string): string => {
    // Genera una imagen placeholder con texto
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Fondo degradado
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Texto
      ctx.fillStyle = 'white';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Dividir texto en líneas
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 450 && currentLine !== '') {
          lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine.trim());
      
      // Dibujar líneas
      const lineHeight = 30;
      const startY = 256 - (lines.length * lineHeight) / 2;
      
      lines.forEach((line, index) => {
        ctx.fillText(line, 256, startY + index * lineHeight);
      });
      
      // Agregar decoración
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, 472, 472);
    }
    
    return canvas.toDataURL('image/png');
  };

  const examplePrompts = [
    "Un paisaje futurista con edificios de cristal y cielo morado",
    "Un gato espacial flotando entre estrellas",
    "Una ciudad submarina con peces bioluminiscentes",
    "Un bosque mágico con árboles brillantes",
    "Un robot amigable en un jardín de flores"
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm border border-purple-700/50 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
          Generador de Imágenes IA
        </h3>
      </div>

      <div className="space-y-3">
        <label htmlFor="ai-prompt" className="block text-gray-300 font-medium">
          Describe la imagen que quieres generar:
        </label>
        <textarea
          id="ai-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ej: Un dragón volando sobre montañas nevadas al atardecer..."
          className="w-full h-24 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-400">Ejemplos rápidos:</p>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-xs bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 px-3 py-1 rounded-full transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="text-red-400 bg-red-900/50 border border-red-700 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={generateImage}
        disabled={isGenerating || !prompt.trim()}
        className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generando imagen...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Generar Imagen con IA
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        * Actualmente genera imágenes placeholder. Integra con tu servicio de IA preferido.
      </p>
    </div>
  );
};

export default AIImageGenerator;
