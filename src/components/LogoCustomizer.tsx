
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface LogoCustomizerProps {
  customization: any;
  setCustomization: (customization: any) => void;
}

export const LogoCustomizer = ({ customization, setCustomization }: LogoCustomizerProps) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

  const removeLogo = () => {
    setCustomization({
      ...customization,
      logoUrl: undefined
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Logo Upload</h2>
        <p className="text-sm text-gray-600 mb-4">Add your team logo or sponsor</p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="logo-upload" className="text-sm font-medium">
          Upload Logo
        </Label>
        
        {!customization.logoUrl ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, SVG up to 10MB
              </p>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button asChild className="mt-3">
                <label htmlFor="logo-upload" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="border rounded-lg p-4 bg-gray-50">
              <img
                src={customization.logoUrl}
                alt="Uploaded logo"
                className="max-w-full max-h-32 mx-auto"
              />
            </div>
            <Button
              onClick={removeLogo}
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
