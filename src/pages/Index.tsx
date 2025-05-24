
import { useState } from 'react';
import { UniformViewer3D } from '@/components/UniformViewer3D';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Save, Download, Send, Menu } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { CustomizationSidebar } from '@/components/CustomizationSidebar';
import { SendDesignDialog } from '@/components/SendDesignDialog';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const isMobile = useIsMobile();
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [currentView, setCurrentView] = useState('shirt');
  const [customization, setCustomization] = useState({
    baseColor: '#2563eb',
    accentColor: '#1d4ed8',
    pattern: 'stripes',
    playerName: 'SILVA',
    playerNumber: '10',
    logoUrl: undefined
  });

  const handleSaveProject = async () => {
    try {
      const projectData = {
        name: `Projeto ${new Date().toLocaleDateString()}`,
        customization,
        current_view: currentView,
        status: 'draft'
      };

      const { data, error } = await supabase
        .from('uniform_projects')
        .insert(projectData)
        .select()
        .single();

      if (error) {
        console.error('Erro ao salvar projeto:', error);
        toast.error('Erro ao salvar projeto');
        return;
      }

      console.log('Projeto salvo:', data);
      toast.success('Projeto salvo com sucesso!', {
        description: 'Você pode acessá-lo na seção "Meus Projetos"'
      });
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error('Erro inesperado ao salvar projeto');
    }
  };

  const handleExportImage = () => {
    toast.success('Imagem exportada!', {
      description: 'Download iniciará em breve...'
    });
  };

  const handleSendDesign = () => {
    setShowSendDialog(true);
  };

  return (
    <SidebarProvider defaultOpen={true} open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <CustomizationSidebar
          customization={customization}
          setCustomization={setCustomization}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
          {/* Header */}
          <header className="bg-white shadow-sm border-b relative z-10">
            <div className="px-4 lg:px-6">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </SidebarTrigger>
                  <div className="text-xl lg:text-2xl font-bold text-black">
                    Configurador de Uniformes
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleSaveProject}
                    size={isMobile ? "sm" : "default"}
                    className="bg-black hover:bg-gray-800"
                  >
                    <Save className="w-4 h-4 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Salvar</span>
                  </Button>
                  <Button 
                    onClick={handleExportImage}
                    variant="outline"
                    size={isMobile ? "sm" : "default"}
                  >
                    <Download className="w-4 h-4 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Exportar</span>
                  </Button>
                  <Button 
                    onClick={handleSendDesign}
                    size={isMobile ? "sm" : "default"}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="w-4 h-4 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Enviar Design</span>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* 3D Viewer */}
          <div className="flex-1 p-3 lg:p-6 min-h-0 relative">
            <div className="bg-white rounded-xl shadow-lg p-3 lg:p-6 h-full relative overflow-hidden">
              <div className="h-full w-full min-h-[400px] lg:min-h-[500px]">
                <UniformViewer3D 
                  currentView={currentView}
                  customization={customization}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Send Design Dialog */}
        <SendDesignDialog
          open={showSendDialog}
          onOpenChange={setShowSendDialog}
          customization={customization}
          currentView={currentView}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
