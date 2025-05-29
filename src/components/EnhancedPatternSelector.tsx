
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface EnhancedPatternSelectorProps {
  customization: any;
  setCustomization: (customization: any) => void;
}

const patterns = [
  { id: 'solid', name: 'Solid', preview: null },
  { id: 'abstract', name: 'Abstract', preview: '/textures/abstract.svg' },
  { id: 'diagonal lines', name: 'Diagonal Lines', preview: '/textures/diagonal lines.svg' }
];

const patternColors = [
  '#ffffff', '#000000', '#ffff00', '#ff0000', 
  '#00ff00', '#0000ff', '#ff8000', '#8000ff'
];

export const EnhancedPatternSelector = ({ customization, setCustomization }: EnhancedPatternSelectorProps) => {
  const selectPattern = (patternId: string) => {
    setCustomization({
      ...customization,
      pattern: patternId
    });
  };

  const selectPatternColor = (color: string) => {
    setCustomization({
      ...customization,
      patternColor: color
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-1">Pattern & Color</h2>
        <p className="text-sm text-gray-600">Choose pattern and its color</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Pattern Selection */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Select Pattern</Label>
          <div className="grid grid-cols-2 gap-3">
            {patterns.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => selectPattern(pattern.id)}
                className={cn(
                  "aspect-square rounded border-2 transition-all hover:scale-105 p-2",
                  customization.pattern === pattern.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                {pattern.preview ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={pattern.preview} 
                      alt={pattern.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-600">Solid</span>
                  </div>
                )}
                <div className="text-xs font-medium mt-1">{pattern.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Pattern Color Selection - only show if pattern is not solid */}
        {customization.pattern !== 'solid' && (
          <div>
            <Label className="text-sm font-medium mb-3 block">Pattern Color</Label>
            <div className="grid grid-cols-4 gap-2">
              {patternColors.map((color) => (
                <button
                  key={color}
                  onClick={() => selectPatternColor(color)}
                  className={cn(
                    "w-12 h-12 rounded-lg border-2 transition-all hover:scale-110",
                    customization.patternColor === color 
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-gray-300'
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <input
              type="color"
              value={customization.patternColor || '#ffffff'}
              onChange={(e) => selectPatternColor(e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer mt-3"
            />
          </div>
        )}
      </div>
    </div>
  );
};
