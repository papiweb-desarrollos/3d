import React, { useState, ChangeEvent, DragEvent } from 'react';
import { generateAndExportGlb } from './services/glbExporter';
import { ExportOptions } from './types';
import { UploadIcon, CubeIcon, Spinner, CoffeeIcon } from './components/icons';
import CoffeeCup3D from './components/CoffeeCup3D';
import AIImageGenerator from './components/AIImageGenerator';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'ai'>('upload');
  const [backgroundImageError, setBackgroundImageError] = useState<boolean>(false);
  
  const [options, setOptions] = useState<ExportOptions>({
    doubleSided: true,
    maxSize: 2,
    roughness: 0.8,
    metalness: 0.1,
  });
  const [activePreset, setActivePreset] = useState<string>('Default');

  const presets: { [key: string]: { roughness: number; metalness: number; } } = {
    'Default': { roughness: 0.8, metalness: 0.1 },
    'Matte': { roughness: 1.0, metalness: 0.0 },
    'Glossy': { roughness: 0.1, metalness: 0.0 },
    'Metallic': { roughness: 0.2, metalness: 0.9 },
  };

  const handlePresetSelect = (name: string) => {
    const preset = presets[name];
    if(preset) {
      setOptions(prev => ({ ...prev, ...preset }));
      setActivePreset(name);
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImageFile(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please upload a valid JPG or PNG image.');
      setImageFile(null);
      setImageUrl(null);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files?.[0] ?? null);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files?.[0] ?? null);
  };

  const handleGenerate = async () => {
    if (!imageUrl || !imageFile) {
      setError('No image selected.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await generateAndExportGlb(imageUrl, imageFile.type, imageFile.name, options);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during conversion.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIImageGenerated = (generatedImageUrl: string, imageName: string) => {
    setImageUrl(generatedImageUrl);
    // Crear un archivo blob temporal para mantener compatibilidad
    fetch(generatedImageUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], imageName, { type: 'image/png' });
        setImageFile(file);
        setError(null);
        setActiveTab('upload'); // Cambiar a la pestaña de upload para mostrar la imagen
      })
      .catch(() => {
        setError('Error al procesar la imagen generada por IA');
      });
  };
  
  const CustomCheckbox: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void }> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer select-none">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className={`w-11 h-6 rounded-full shadow-inner transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-600'}`}></div>
        <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'transform translate-x-5' : ''}`}></div>
      </div>
      <span className="text-gray-300 font-medium">{label}</span>
    </label>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-sans relative">
      {/* Imagen de fondo de Claude mejorada con mejor estilo y manejo de errores */}
      {!backgroundImageError && (
        <img 
          src="/claude-elegant.png"
          alt="Claude AI background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
          style={{ position: 'fixed' }}
          onLoad={() => setBackgroundImageError(false)}
          onError={() => setBackgroundImageError(true)}
        />
      )}
      
      {/* Fallback gradient para cuando la imagen no carga */}
      {backgroundImageError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-800 via-purple-900/50 to-gray-800 z-0"
          style={{ position: 'fixed' }}
        />
      )}
      
      {/* Overlay optimizado para mejor elegancia y legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-purple-900/40 to-gray-900/70 z-5" style={{ position: 'fixed' }}></div>
      
      <div className="w-full max-w-2xl mx-auto relative z-20">
        <header className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left mb-8 gap-4">
            <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
                <CoffeeCup3D />
            </div>
            <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                    Image to GLB Papiweb Converter
                </h1>
                <p className="text-gray-200 mt-2 text-lg font-medium">
                    Create a 3D plane from your image, ready for any 3D environment.
                </p>
                <p className="text-purple-300 mt-1 text-sm italic">
                    ✨ Featuring Claude AI background
                </p>
            </div>
        </header>

        {/* Pestañas de navegación */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === 'upload'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UploadIcon className="w-4 h-4" />
              Subir Imagen
            </div>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === 'ai'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Generar con IA
            </div>
          </button>
        </div>

        <main className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-indigo-900/20 border border-gray-700 p-6 sm:p-8 space-y-6">
          {activeTab === 'upload' ? (
            <>
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-gray-700/50' : 'border-gray-600 hover:border-indigo-600'}`}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={onFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-3">
                  <UploadIcon className="w-12 h-12 text-gray-500" />
                  <p className="text-gray-300 font-semibold">
                    <span className="text-indigo-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG or JPG</p>
                </label>
              </div>
            </>
          ) : (
            <AIImageGenerator onImageGenerated={handleAIImageGenerated} />
          )}

          {error && <div className="text-red-400 bg-red-900/50 border border-red-700 rounded-lg p-3 text-center">{error}</div>}

          {imageUrl && (
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold text-gray-200 mb-4">Preview & Options</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img src={imageUrl} alt="Preview" className="rounded-md w-full h-auto object-contain max-h-48" />
                    <p className="text-xs text-gray-500 mt-2 text-center truncate" title={imageFile?.name}>{imageFile?.name}</p>
                  </div>
                  <div className="md:w-2/3 space-y-4 flex flex-col justify-center">
                    <CustomCheckbox 
                      label="Double-Sided Material"
                      checked={options.doubleSided}
                      onChange={(checked) => setOptions(prev => ({ ...prev, doubleSided: checked }))}
                    />
                    <div>
                      <label htmlFor="max-size" className="block text-gray-300 font-medium mb-2">Max Size (in meters)</label>
                      <input
                        id="max-size"
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={options.maxSize}
                        onChange={(e) => setOptions(prev => ({...prev, maxSize: parseFloat(e.target.value) || 2}))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
                 <div className="bg-blue-900/20 backdrop-blur-sm border border-blue-700/50 rounded-lg p-4 mt-4">
                    <h4 className="text-gray-300 font-medium mb-3">Material Properties</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                        {Object.keys(presets).map(name => (
                            <button
                                key={name}
                                onClick={() => handlePresetSelect(name)}
                                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${activePreset === name ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="roughness" className="font-medium text-gray-300">Roughness</label>
                                <span className="text-sm text-gray-400 font-mono bg-gray-700/50 px-2 py-0.5 rounded">{options.roughness.toFixed(2)}</span>
                            </div>
                            <input
                                id="roughness"
                                type="range" min="0" max="1" step="0.01"
                                value={options.roughness}
                                onChange={e => {
                                    setOptions(prev => ({ ...prev, roughness: parseFloat(e.target.value) }));
                                    setActivePreset('Custom');
                                }}
                                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>
                        <div>
                           <div className="flex justify-between items-center mb-1">
                                <label htmlFor="metalness" className="font-medium text-gray-300">Metalness</label>
                                <span className="text-sm text-gray-400 font-mono bg-gray-700/50 px-2 py-0.5 rounded">{options.metalness.toFixed(2)}</span>
                            </div>
                            <input
                                id="metalness"
                                type="range" min="0" max="1" step="0.01"
                                value={options.metalness}
                                onChange={e => {
                                    setOptions(prev => ({ ...prev, metalness: parseFloat(e.target.value) }));
                                    setActivePreset('Custom');
                                }}
                                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>
                    </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <Spinner className="w-5 h-5 mr-3" />
                    Generating GLB...
                  </>
                ) : (
                  <>
                    <CubeIcon className="w-6 h-6 mr-2" />
                    Generate & Download .glb
                  </>
                )}
              </button>
            </div>
          )}
        </main>
        
        <footer className="text-center mt-8 space-y-2 pb-4">
          <p className="text-sm text-gray-500">
            Powered by React, TailwindCSS, and Three.js
          </p>
          <a
            href="https://link.mercadopago.com.ar/papiweb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors"
          >
            <CoffeeIcon className="w-5 h-5" />
            <span>Papiweb desarrollos informáticos</span>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default App;