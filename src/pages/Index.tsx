
import { useState } from 'react';
import { UniformViewer3D } from '@/components/UniformViewer3D';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Save, Download, Menu, X } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  const [showPanel, setShowPanel] = useState(!isMobile);
  
  const [currentView, setCurrentView] = useState('shirt');
  const [customization, setCustomization] = useState({
    baseColor: '#2563eb',
    accentColor: '#1d4ed8',
    pattern: 'stripes',
    playerName: 'SILVA',
    playerNumber: '10',
    logoUrl: undefined
  });

  const handleSaveProject = () => {
    // Simular salvamento
    const projects = JSON.parse(localStorage.getItem('uniformProjects') || '[]');
    const newProject = {
      id: Date.now(),
      name: `Projeto ${new Date().toLocaleDateString()}`,
      customization,
      currentView,
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    localStorage.setItem('uniformProjects', JSON.stringify(projects));
    
    toast.success('Projeto salvo com sucesso!', {
      description: 'Você pode acessá-lo na seção "Meus Projetos"'
    });
  };

  const handleExportImage = () => {
    // Simular exportação
    toast.success('Imagem exportada!', {
      description: 'O download começará em breve...'
    });
  };

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-spized-blue">
                Spized Configurator
              </div>
              {isMobile && (
                <Button
                  onClick={togglePanel}
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                >
                  {showPanel ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
              )}
            </div>
            
            {!isMobile && (
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSaveProject}
                  className="bg-spized-blue hover:bg-spized-blue-dark"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
                <Button 
                  onClick={handleExportImage}
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          {/* 3D Viewer */}
          <div className={`${isMobile ? 'order-2' : 'lg:col-span-2'}`}>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="aspect-square lg:aspect-[4/3] w-full">
                <UniformViewer3D 
                  currentView={currentView}
                  customization={customization}
                />
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          {(showPanel || !isMobile) && (
            <div className={`${isMobile ? 'order-1' : ''} ${showPanel ? 'animate-slide-in' : ''}`}>
              <CustomizationPanel
                customization={customization}
                setCustomization={setCustomization}
                currentView={currentView}
                setCurrentView={setCurrentView}
                onSaveProject={handleSaveProject}
                onExportImage={handleExportImage}
              />
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">🎨 Personalização Total</h3>
            <p className="text-gray-600 text-sm">
              Cores, padrões, logos e textos personalizados para criar uniformes únicos.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">📱 Responsivo</h3>
            <p className="text-gray-600 text-sm">
              Interface otimizada para desktop e mobile, perfeita para qualquer dispositivo.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">🚀 Alta Performance</h3>
            <p className="text-gray-600 text-sm">
              Renderização 3D otimizada com carregamento rápido e experiência fluida.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
