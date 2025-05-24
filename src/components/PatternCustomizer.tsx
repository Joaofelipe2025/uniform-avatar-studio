
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface PatternCustomizerProps {
  customization: any;
  setCustomization: (customization: any) => void;
}

const patterns = [
  { id: 'geometric-1', name: 'Geometric', preview: 'bg-gradient-to-br from-black via-gray-400 to-white' },
  { id: 'waves', name: 'Waves', preview: 'bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100' },
  { id: 'lines', name: 'Lines', preview: 'bg-gradient-to-r from-gray-800 via-gray-300 to-gray-800' },
  { id: 'diagonal-lines', name: 'Diagonal', preview: 'bg-gradient-to-br from-black via-white to-black' },
  { id: 'hexagon', name: 'Hexagon', preview: 'bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200' },
  { id: 'stripes', name: 'Stripes', preview: 'bg-gradient-to-r from-black via-white to-black' },
  { id: 'maze', name: 'Maze', preview: 'bg-gradient-to-br from-gray-100 via-gray-800 to-gray-100' },
  { id: 'grid', name: 'Grid', preview: 'bg-gradient-to-r from-gray-600 via-gray-200 to-gray-600' },
  { id: 'organic', name: 'Organic', preview: 'bg-gradient-to-br from-green-100 via-green-800 to-green-100' },
  { id: 'dots', name: 'Dots', preview: 'bg-gradient-to-r from-gray-800 via-gray-100 to-gray-800' },
];

export const PatternCustomizer = ({ customization, setCustomization }: PatternCustomizerProps) => {
  const selectPattern = (patternId: string) => {
    setCustomization({
      ...customization,
      pattern: patternId
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3 mb-2">
          <Button variant="ghost" size="sm" className="p-1">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold">Select pattern</h2>
        </div>
        <p className="text-sm text-gray-600">Assign a pattern to the areas</p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-3">
          {patterns.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => selectPattern(pattern.id)}
              className={`aspect-square rounded border-2 transition-all hover:scale-105 ${
                customization.pattern === pattern.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-full h-full rounded ${pattern.preview}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
