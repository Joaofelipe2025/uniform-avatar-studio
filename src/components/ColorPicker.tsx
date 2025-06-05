
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  customization: any;
  setCustomization: (customization: any) => void;
}

const predefinedColors = [
  '#2563eb', '#dc2626', '#16a34a', '#ca8a04', 
  '#9333ea', '#c2410c', '#0891b2', '#be123c',
  '#000000', '#ffffff', '#6b7280', '#f59e0b'
];

export const ColorPicker = ({ customization, setCustomization }: ColorPickerProps) => {
  const updateColor = (type: 'baseColor' | 'accentColor' | 'patternColor', color: string) => {
    console.log(`Updating ${type} to:`, color);
    setCustomization({
      ...customization,
      [type]: color,
      // Quando a cor base muda, também atualiza a cor do padrão para manter consistência
      ...(type === 'baseColor' && { patternColor: color })
    });
  };

  return (
    <div className="space-y-6">
      {/* Base Color */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold">Cor Principal</Label>
        <div className="grid grid-cols-6 gap-2">
          {predefinedColors.map((color) => (
            <button
              key={`base-${color}`}
              onClick={() => updateColor('baseColor', color)}
              className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                customization.baseColor === color 
                  ? 'border-spized-blue shadow-lg' 
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <input
          type="color"
          value={customization.baseColor}
          onChange={(e) => updateColor('baseColor', e.target.value)}
          className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
        />
      </div>

      {/* Pattern Color */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold">Cor do Padrão</Label>
        <div className="grid grid-cols-6 gap-2">
          {predefinedColors.map((color) => (
            <button
              key={`pattern-${color}`}
              onClick={() => updateColor('patternColor', color)}
              className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                customization.patternColor === color 
                  ? 'border-spized-blue shadow-lg' 
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <input
          type="color"
          value={customization.patternColor || customization.baseColor}
          onChange={(e) => updateColor('patternColor', e.target.value)}
          className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
        />
      </div>

      {/* Accent Color */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold">Cor Secundária</Label>
        <div className="grid grid-cols-6 gap-2">
          {predefinedColors.map((color) => (
            <button
              key={`accent-${color}`}
              onClick={() => updateColor('accentColor', color)}
              className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                customization.accentColor === color 
                  ? 'border-spized-blue shadow-lg' 
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <input
          type="color"
          value={customization.accentColor}
          onChange={(e) => updateColor('accentColor', e.target.value)}
          className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
};
