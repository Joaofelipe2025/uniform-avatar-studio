
import { useState } from 'react';
import { UniformViewer3D } from '@/components/UniformViewer3D';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Save, Download } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CustomizationSidebar } from '@/components/CustomizationSidebar';

const Index = () => {
  const isMobile = useIsMobile();
  
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
    const projects = JSON.parse(localStorage.getItem('uniformProjects') || '[]');
    const newProject = {
      id: Date.now(),
      name: `Project ${new Date().toLocaleDateString()}`,
      customization,
      currentView,
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    localStorage.setItem('uniformProjects', JSON.stringify(projects));
    
    toast.success('Project saved successfully!', {
      description: 'You can access it in the "My Projects" section'
    });
  };

  const handleExportImage = () => {
    toast.success('Image exported!', {
      description: 'Download will start shortly...'
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <CustomizationSidebar
          customization={customization}
          setCustomization={setCustomization}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="text-2xl font-bold text-spized-blue">
                  Spized Configurator
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleSaveProject}
                    className="bg-spized-blue hover:bg-spized-blue-dark"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button 
                    onClick={handleExportImage}
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* 3D Viewer */}
          <div className="flex-1 p-6">
            <div className="bg-white rounded-xl shadow-lg p-6 h-full">
              <div className="h-full w-full">
                <UniformViewer3D 
                  currentView={currentView}
                  customization={customization}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
