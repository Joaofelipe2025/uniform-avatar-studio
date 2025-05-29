
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const models = [
  { id: 'home', name: 'Home', description: 'Home kit design' },
  { id: 'away', name: 'Away', description: 'Away kit design' },
  { id: 'goalkeeper', name: 'Goalkeeper', description: 'Goalkeeper kit design' }
];

export const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-1">Select Kit Type</h2>
        <p className="text-sm text-gray-600">Choose the uniform style</p>
      </div>
      
      <div className="p-4 space-y-3">
        {models.map((model) => (
          <Button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            variant={selectedModel === model.id ? "default" : "outline"}
            className={cn(
              "w-full justify-start h-auto p-4 flex-col items-start",
              selectedModel === model.id && "bg-blue-600 hover:bg-blue-700"
            )}
          >
            <div className="text-left">
              <div className="font-medium">{model.name}</div>
              <div className="text-xs opacity-80 mt-1">{model.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
