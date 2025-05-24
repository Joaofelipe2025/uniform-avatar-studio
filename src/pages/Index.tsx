
import { useState } from 'react';
import { UniformViewer3D } from '@/components/UniformViewer3D';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Save, Download, Send, Menu } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { CustomizationSidebar } from '@/components/CustomizationSidebar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

  const handleSendDesign = () => {
    handleSaveProject();
    setShowSendDialog(true);
  };

  const handleConfirmSend = () => {
    setShowSendDialog(false);
    toast.success('Design sent successfully!', {
      description: 'Someone from A Unique Performance team will contact you soon to align order details.'
    });
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
                    Uniform Configurator
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleSaveProject}
                    size={isMobile ? "sm" : "default"}
                    className="bg-black hover:bg-gray-800"
                  >
                    <Save className="w-4 h-4 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Save</span>
                  </Button>
                  <Button 
                    onClick={handleExportImage}
                    variant="outline"
                    size={isMobile ? "sm" : "default"}
                  >
                    <Download className="w-4 h-4 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                  <Button 
                    onClick={handleSendDesign}
                    size={isMobile ? "sm" : "default"}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="w-4 h-4 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Send Design</span>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* 3D Viewer */}
          <div className="flex-1 p-3 lg:p-6 min-h-0 relative">
            <div className="bg-white rounded-xl shadow-lg p-3 lg:p-6 h-full relative z-0">
              <div className="h-full w-full min-h-[400px] lg:min-h-[500px]">
                <UniformViewer3D 
                  currentView={currentView}
                  customization={customization}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Send Design Confirmation Dialog */}
        <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Send Design to A Unique Performance</DialogTitle>
              <DialogDescription>
                Are you ready to send your design? Our team will review it and contact you to align all order details.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowSendDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmSend} className="bg-green-600 hover:bg-green-700">
                Send Design
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
};

export default Index;
