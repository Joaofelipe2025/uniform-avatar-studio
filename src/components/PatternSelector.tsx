
import { Label } from '@/components/ui/label';

interface PatternSelectorProps {
  customization: any;
  setCustomization: (customization: any) => void;
}

const patterns = [
  { id: 'solid', name: 'Solid', preview: 'bg-gradient-to-r from-blue-500 to-blue-500' },
  { id: 'stripes', name: 'Stripes', preview: 'bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500' },
  { id: 'gradient', name: 'Gradient', preview: 'bg-gradient-to-b from-blue-500 to-blue-800' },
  { id: 'diamonds', name: 'Diamonds', preview: 'bg-gradient-to-br from-blue-500 via-blue-300 to-blue-500' }
];

export const PatternSelector = ({ customization, setCustomization }: PatternSelectorProps) => {
  const selectPattern = (patternId: string) => {
    setCustomization({
      ...customization,
      pattern: patternId
    });
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">Available Patterns</Label>
      <div className="grid grid-cols-2 gap-4">
        {patterns.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => selectPattern(pattern.id)}
            className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
              customization.pattern === pattern.id
                ? 'border-spized-blue bg-spized-blue/10'
                : 'border-gray-300 hover:border-spized-blue/50'
            }`}
          >
            <div className={`w-full h-16 rounded-md mb-2 ${pattern.preview}`} />
            <p className="text-sm font-medium">{pattern.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
