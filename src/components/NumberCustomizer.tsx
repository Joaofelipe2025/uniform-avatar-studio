
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NumberCustomizerProps {
  customization: any;
  setCustomization: (customization: any) => void;
}

export const NumberCustomizer = ({ customization, setCustomization }: NumberCustomizerProps) => {
  const updateNumber = (value: string) => {
    setCustomization({
      ...customization,
      playerNumber: value
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Player Number</h2>
        <p className="text-sm text-gray-600 mb-4">Enter the player number</p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="playerNumber" className="text-sm font-medium">
          Number
        </Label>
        <Input
          id="playerNumber"
          type="text"
          placeholder="10"
          maxLength={2}
          value={customization.playerNumber}
          onChange={(e) => updateNumber(e.target.value)}
          className="text-center text-2xl font-bold h-14"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Preview</h4>
        <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
          <div className="text-4xl font-bold">
            {customization.playerNumber || '00'}
          </div>
        </div>
      </div>
    </div>
  );
};
