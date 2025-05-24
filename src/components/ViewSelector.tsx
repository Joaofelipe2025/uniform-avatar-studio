
import { Button } from '@/components/ui/button';

interface ViewSelectorProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const views = [
  { id: 'shirt', name: 'Jersey', icon: '👕' },
  { id: 'shorts', name: 'Shorts', icon: '🩳' },
  { id: 'socks', name: 'Socks', icon: '🧦' }
];

export const ViewSelector = ({ currentView, onViewChange }: ViewSelectorProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700">View</h3>
      <div className="grid grid-cols-3 gap-2">
        {views.map((view) => (
          <Button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            variant={currentView === view.id ? "default" : "outline"}
            className={`flex flex-col items-center p-4 h-auto ${
              currentView === view.id 
                ? 'bg-spized-blue hover:bg-spized-blue-dark' 
                : 'hover:bg-spized-blue/10'
            }`}
          >
            <span className="text-2xl mb-1">{view.icon}</span>
            <span className="text-sm">{view.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
