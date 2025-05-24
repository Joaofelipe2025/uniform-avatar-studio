
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DesignSelectorProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const uniformDesigns = [
  { id: 'solid', name: 'Solid', preview: 'bg-blue-500' },
  { id: 'stripes-vertical', name: 'Vertical Stripes', preview: 'bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500' },
  { id: 'stripes-horizontal', name: 'Horizontal Stripes', preview: 'bg-gradient-to-b from-blue-500 via-blue-300 to-blue-500' },
  { id: 'diagonal', name: 'Diagonal', preview: 'bg-gradient-to-br from-blue-500 via-blue-300 to-blue-500' },
  { id: 'gradient-vertical', name: 'Vertical Gradient', preview: 'bg-gradient-to-b from-blue-500 to-blue-800' },
  { id: 'gradient-diagonal', name: 'Diagonal Gradient', preview: 'bg-gradient-to-br from-blue-500 to-blue-800' },
];

const customerDesigns = [
  { id: 'custom-1', name: 'Customer Design 1', preview: 'bg-gradient-to-r from-red-500 to-yellow-500' },
  { id: 'custom-2', name: 'Customer Design 2', preview: 'bg-gradient-to-br from-green-500 to-blue-500' },
];

export const DesignSelector = ({ currentView, onViewChange }: DesignSelectorProps) => {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Select design</h2>
        <p className="text-sm text-gray-600 mb-4">Choose a standard design</p>
      </div>

      <Tabs defaultValue="designs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="designs">Designs</TabsTrigger>
          <TabsTrigger value="customer">Best customer designs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="designs" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {uniformDesigns.map((design) => (
              <Button
                key={design.id}
                variant="outline"
                className="h-24 p-2 flex flex-col items-center justify-center space-y-2"
                onClick={() => onViewChange(design.id)}
              >
                <div className={`w-12 h-8 rounded ${design.preview} border`} />
                <span className="text-xs font-medium">{design.name}</span>
              </Button>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="customer" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {customerDesigns.map((design) => (
              <Button
                key={design.id}
                variant="outline"
                className="h-24 p-2 flex flex-col items-center justify-center space-y-2"
                onClick={() => onViewChange(design.id)}
              >
                <div className={`w-12 h-8 rounded ${design.preview} border`} />
                <span className="text-xs font-medium">{design.name}</span>
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
