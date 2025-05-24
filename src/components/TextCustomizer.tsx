
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TextCustomizerProps {
  customization: any;
  setCustomization: (customization: any) => void;
}

export const TextCustomizer = ({ customization, setCustomization }: TextCustomizerProps) => {
  const updateText = (field: string, value: string) => {
    setCustomization({
      ...customization,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="playerNumber" className="text-lg font-semibold">
          Número do Jogador
        </Label>
        <Input
          id="playerNumber"
          type="text"
          placeholder="Ex: 10"
          maxLength={2}
          value={customization.playerNumber}
          onChange={(e) => updateText('playerNumber', e.target.value)}
          className="text-center text-2xl font-bold h-14"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="playerName" className="text-lg font-semibold">
          Nome do Jogador
        </Label>
        <Input
          id="playerName"
          type="text"
          placeholder="Ex: SILVA"
          maxLength={15}
          value={customization.playerName}
          onChange={(e) => updateText('playerName', e.target.value.toUpperCase())}
          className="text-center font-bold h-12"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Preview do Texto</h4>
        <div className="bg-spized-blue text-white p-4 rounded-lg text-center">
          <div className="text-4xl font-bold">
            {customization.playerNumber || '00'}
          </div>
          <div className="text-sm font-medium mt-1">
            {customization.playerName || 'NOME'}
          </div>
        </div>
      </div>
    </div>
  );
};
