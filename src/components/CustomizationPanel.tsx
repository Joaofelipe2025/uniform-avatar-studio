
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorPicker } from './ColorPicker';
import { PatternSelector } from './PatternSelector';
import { TextCustomizer } from './TextCustomizer';
import { LogoUploader } from './LogoUploader';
import { ViewSelector } from './ViewSelector';
import { Camera, Palette, Type, Upload, Save, Download } from 'lucide-react';

interface CustomizationPanelProps {
  customization: any;
  setCustomization: (customization: any) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  onSaveProject: () => void;
  onExportImage: () => void;
}

export const CustomizationPanel = ({
  customization,
  setCustomization,
  currentView,
  setCurrentView,
  onSaveProject,
  onExportImage
}: CustomizationPanelProps) => {
  const [activeTab, setActiveTab] = useState('color');

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-spized-blue text-white p-4">
        <h2 className="text-xl font-bold">Personalizar Uniforme</h2>
        <p className="text-spized-blue/80 text-sm">Configure cores, padrões e detalhes</p>
      </div>

      {/* View Selector */}
      <div className="p-4 border-b bg-gray-50">
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
      </div>

      {/* Customization Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 m-4">
          <TabsTrigger value="color" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Cores</span>
          </TabsTrigger>
          <TabsTrigger value="pattern" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Padrões</span>
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline">Texto</span>
          </TabsTrigger>
          <TabsTrigger value="logo" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Logo</span>
          </TabsTrigger>
        </TabsList>

        <div className="p-4">
          <TabsContent value="color" className="space-y-4">
            <ColorPicker
              customization={customization}
              setCustomization={setCustomization}
            />
          </TabsContent>

          <TabsContent value="pattern" className="space-y-4">
            <PatternSelector
              customization={customization}
              setCustomization={setCustomization}
            />
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <TextCustomizer
              customization={customization}
              setCustomization={setCustomization}
            />
          </TabsContent>

          <TabsContent value="logo" className="space-y-4">
            <LogoUploader
              customization={customization}
              setCustomization={setCustomization}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Action Buttons */}
      <div className="p-4 border-t bg-gray-50 space-y-2">
        <Button 
          onClick={onSaveProject} 
          className="w-full bg-spized-blue hover:bg-spized-blue-dark"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Projeto
        </Button>
        <Button 
          onClick={onExportImage} 
          variant="outline"
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Imagem
        </Button>
      </div>
    </div>
  );
};
