
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';

interface ColorCustomizerProps {
  customization: any;
  setCustomization: (customization: any) => void;
}

const predefinedColors = [
  '#2563eb', '#dc2626', '#16a34a', '#ca8a04', '#9333ea', 
  '#c2410c', '#0891b2', '#be185d', '#4338ca', '#059669'
];

export const ColorCustomizer = ({ customization, setCustomization }: ColorCustomizerProps) => {
  const updateColor = (colorType: string, color: string) => {
    setCustomization({
      ...customization,
      [colorType]: color
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Choose colors</h2>
        <p className="text-sm text-gray-600 mb-4">Decide on your color combination</p>
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="space-y-4">
          {/* Color 1 */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between p-4 h-auto"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: customization.baseColor }}
                />
                <span className="font-medium">Color 1</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <div className="grid grid-cols-5 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400"
                  style={{ backgroundColor: color }}
                  onClick={() => updateColor('baseColor', color)}
                />
              ))}
            </div>
          </div>

          {/* Color 2 */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between p-4 h-auto"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: customization.accentColor }}
                />
                <span className="font-medium">Color 2</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <div className="grid grid-cols-5 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400"
                  style={{ backgroundColor: color }}
                  onClick={() => updateColor('accentColor', color)}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <p className="text-sm text-gray-600">Custom color picker coming soon...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
