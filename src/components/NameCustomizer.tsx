
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NameCustomizerProps {
  customization: any;
  setCustomization: (customization: any) => void;
}

export const NameCustomizer = ({ customization, setCustomization }: NameCustomizerProps) => {
  const updateName = (value: string) => {
    setCustomization({
      ...customization,
      playerName: value.toUpperCase()
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2 text-black">Player Name</h2>
        <p className="text-sm text-gray-600 mb-4">Enter the player name</p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="playerName" className="text-sm font-medium">
          Name
        </Label>
        <Input
          id="playerName"
          type="text"
          placeholder="SILVA"
          maxLength={15}
          value={customization.playerName}
          onChange={(e) => updateName(e.target.value)}
          className="text-center font-bold h-12"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 text-black">Preview</h4>
        <div className="bg-black text-white p-4 rounded-lg text-center">
          <div className="text-sm font-medium">
            {customization.playerName || 'NAME'}
          </div>
        </div>
      </div>
    </div>
  );
};
