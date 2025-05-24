
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { 
  Palette, 
  CircleDot, 
  Layers, 
  Hash, 
  User, 
  Type, 
  Image,
  Undo,
  Redo,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { DesignSelector } from './DesignSelector';
import { ColorCustomizer } from './ColorCustomizer';
import { PatternCustomizer } from './PatternCustomizer';
import { NumberCustomizer } from './NumberCustomizer';
import { NameCustomizer } from './NameCustomizer';
import { TextCustomizer } from './TextCustomizer';
import { LogoCustomizer } from './LogoCustomizer';
import { cn } from '@/lib/utils';

interface CustomizationSidebarProps {
  customization: any;
  setCustomization: (customization: any) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const menuItems = [
  { id: 'design', label: 'Design', icon: Palette, description: 'Choose design template' },
  { id: 'color', label: 'Colors', icon: CircleDot, description: 'Customize colors' },
  { id: 'pattern', label: 'Pattern', icon: Layers, description: 'Select patterns' },
  { id: 'number', label: 'Number', icon: Hash, description: 'Player number' },
  { id: 'name', label: 'Name', icon: User, description: 'Player name' },
  { id: 'text', label: 'Text', icon: Type, description: 'Custom text' },
  { id: 'logo', label: 'Logo', icon: Image, description: 'Upload logo' },
  { id: 'support', label: 'Support', icon: HelpCircle, description: 'Get help' },
];

export const CustomizationSidebar = ({
  customization,
  setCustomization,
  currentView,
  setCurrentView
}: CustomizationSidebarProps) => {
  const [activeSection, setActiveSection] = useState('design');

  const renderContent = () => {
    switch (activeSection) {
      case 'design':
        return (
          <DesignSelector
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        );
      case 'color':
        return (
          <ColorCustomizer
            customization={customization}
            setCustomization={setCustomization}
          />
        );
      case 'pattern':
        return (
          <PatternCustomizer
            customization={customization}
            setCustomization={setCustomization}
          />
        );
      case 'number':
        return (
          <NumberCustomizer
            customization={customization}
            setCustomization={setCustomization}
          />
        );
      case 'name':
        return (
          <NameCustomizer
            customization={customization}
            setCustomization={setCustomization}
          />
        );
      case 'text':
        return (
          <TextCustomizer
            customization={customization}
            setCustomization={setCustomization}
          />
        );
      case 'logo':
        return (
          <LogoCustomizer
            customization={customization}
            setCustomization={setCustomization}
          />
        );
      case 'support':
        return (
          <div className="p-6 text-center">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">Contact our support team for assistance with your uniform design.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </div>
        );
      default:
        return <div className="p-6 text-center text-gray-500">Select an option from the menu</div>;
    }
  };

  const activeItem = menuItems.find(item => item.id === activeSection);

  return (
    <Sidebar className="w-80 border-r bg-white shadow-lg" collapsible="none">
      <SidebarHeader className="border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Customization</h2>
            <p className="text-blue-100 text-sm">Design your uniform</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button 
              className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>
        {activeItem && (
          <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <activeItem.icon className="w-4 h-4" />
              <span className="font-medium">{activeItem.label}</span>
            </div>
            <p className="text-xs text-blue-100">{activeItem.description}</p>
          </div>
        )}
      </SidebarHeader>
      
      <div className="flex h-full">
        {/* Navigation Menu */}
        <div className="w-20 border-r bg-gray-50 flex-shrink-0">
          <SidebarContent className="p-2">
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className={cn(
                      "flex flex-col items-center p-3 h-auto text-xs group rounded-xl transition-all duration-200",
                      "hover:bg-blue-50 hover:shadow-sm",
                      activeSection === item.id 
                        ? "bg-blue-100 text-blue-700 shadow-sm border border-blue-200" 
                        : "text-gray-600 hover:text-blue-600"
                    )}
                    title={item.label}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 mb-2 transition-colors",
                      activeSection === item.id 
                        ? "text-blue-700" 
                        : "text-gray-500 group-hover:text-blue-600"
                    )} />
                    <span className="text-xs font-medium leading-tight text-center">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="p-0">
            {renderContent()}
          </div>
        </div>
      </div>
      
      <SidebarRail />
    </Sidebar>
  );
};
