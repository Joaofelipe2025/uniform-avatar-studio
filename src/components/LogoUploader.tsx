
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface LogoUploaderProps {
  customization: any;
  setCustomization: (customization: any) => void;
}

export const LogoUploader = ({ customization, setCustomization }: LogoUploaderProps) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomization({
          ...customization,
          logoUrl: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const removeLogo = () => {
    setCustomization({
      ...customization,
      logoUrl: undefined
    });
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">Logo/Escudo</Label>
      
      {customization.logoUrl ? (
        <div className="relative">
          <img
            src={customization.logoUrl}
            alt="Logo uploaded"
            className="w-full max-w-32 mx-auto rounded-lg border"
          />
          <Button
            onClick={removeLogo}
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragOver 
              ? 'border-spized-blue bg-spized-blue/10' 
              : 'border-gray-300 hover:border-spized-blue/50'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">
            Arraste uma imagem ou clique para selecionar
          </p>
          <p className="text-sm text-gray-500">
            PNG, JPG até 5MB
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
