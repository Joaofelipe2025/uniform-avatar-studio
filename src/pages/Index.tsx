
import { useState } from 'react';
import { UniformViewer3D } from '@/components/UniformViewer3D';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Save, Download, Send, Menu, Settings, User, Bell } from 'lucide-react';
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
        name: `Project ${new Date().toLocaleDateString()}`,
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
        console.error('Error saving project:', error);
        toast.error('Error saving project');
        return;
      }

      console.log('Project saved:', data);
      toast.success('Project saved successfully!', {
        description: 'You can access it in the "My Projects" section'
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Unexpected error while saving project');
    }
  };

  const handleExportImage = () => {
    toast.success('Image exported!', {
      description: 'Download will start shortly...'
    });
  };

  const handleSendDesign = () => {
    setShowSendDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Full Width Header */}
      <header className="bg-white shadow-lg border-b sticky top-0 z-50 flex-shrink-0">
        <div className="w-full px-6">
          <div className="flex justify-between items-center h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Uniform Designer</h1>
                  <p className="text-xs text-gray-500">Professional uniform customization</p>
                </div>
              </div>
            </div>
            
            {/* Center Section - Project Info */}
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Auto-saved</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <span>Current View: {currentView.charAt(0).toUpperCase() + currentView.slice(1)}</span>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleSaveProject}
                size={isMobile ? "sm" : "default"}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button 
                onClick={handleExportImage}
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="border-gray-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button 
                onClick={handleSendDesign}
                size={isMobile ? "sm" : "default"}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Design
              </Button>
              
              {/* User Menu */}
              <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-gray-200">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <User className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <SidebarProvider defaultOpen={true} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="flex flex-1 min-h-0">
          <CustomizationSidebar
            customization={customization}
            setCustomization={setCustomization}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
          
          {/* Main Viewer Area */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Mobile Header Actions */}
            {isMobile && (
              <div className="p-4 bg-white border-b md:hidden flex-shrink-0">
                <div className="flex items-center justify-between">
                  <SidebarTrigger className="p-2 rounded-lg bg-gray-100">
                    <Menu className="w-5 h-5" />
                  </SidebarTrigger>
                  <span className="text-sm text-gray-600">Current: {currentView}</span>
                </div>
              </div>
            )}

            {/* 3D Viewer - Takes all remaining space */}
            <div className="flex-1 p-4 min-h-0">
              <div className="bg-white rounded-2xl shadow-xl h-full relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <p className="text-sm font-medium text-gray-700">
                      Viewing: <span className="text-blue-600 capitalize">{currentView}</span>
                    </p>
                  </div>
                </div>
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

        {/* Send Design Dialog */}
        <SendDesignDialog
          open={showSendDialog}
          onOpenChange={setShowSendDialog}
          customization={customization}
          currentView={currentView}
        />
      </SidebarProvider>
    </div>
  );
};

export default Index;
