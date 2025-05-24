
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
  HelpCircle
} from 'lucide-react';
import { DesignSelector } from './DesignSelector';
import { ColorCustomizer } from './ColorCustomizer';
import { PatternCustomizer } from './PatternCustomizer';
import { NumberCustomizer } from './NumberCustomizer';
import { NameCustomizer } from './NameCustomizer';
import { TextCustomizer } from './TextCustomizer';
import { LogoCustomizer } from './LogoCustomizer';

interface CustomizationSidebarProps {
  customization: any;
  setCustomization: (customization: any) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const menuItems = [
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'color', label: 'Cor', icon: CircleDot },
  { id: 'pattern', label: 'Padrão', icon: Layers },
  { id: 'number', label: 'Número', icon: Hash },
  { id: 'name', label: 'Nome', icon: User },
  { id: 'text', label: 'Texto', icon: Type },
  { id: 'logo', label: 'Logo', icon: Image },
  { id: 'support', label: 'Suporte', icon: HelpCircle },
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
      default:
        return <div className="p-4 text-center text-gray-500">Selecione uma opção do menu</div>;
    }
  };

  return (
    <Sidebar className="w-80 border-r bg-white" collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Personalização</h2>
          <div className="flex items-center space-x-2">
            <Undo className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
            <Redo className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
          </div>
        </div>
      </SidebarHeader>
      
      <div className="flex h-full">
        {/* Menu Navigation */}
        <div className="w-20 border-r bg-gray-50 flex-shrink-0">
          <SidebarContent className="p-2">
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="flex flex-col items-center p-3 h-auto text-xs group hover:bg-blue-50 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700 rounded-lg transition-colors"
                    title={item.label}
                  >
                    <item.icon className="w-5 h-5 mb-1 group-hover:text-blue-600 data-[active=true]:text-blue-700" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {renderContent()}
          </div>
        </div>
      </div>
      
      <SidebarRail />
    </Sidebar>
  );
};
