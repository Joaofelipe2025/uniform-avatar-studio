
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface SendDesignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customization: any;
  currentView: string;
}

export const SendDesignDialog = ({ open, onOpenChange, customization, currentView }: SendDesignDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save project to Supabase
      const projectData = {
        name: `Projeto de ${formData.name} - ${new Date().toLocaleDateString()}`,
        customization,
        current_view: currentView,
        status: 'sent',
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone
      };

      const { data, error } = await supabase
        .from('uniform_projects')
        .insert(projectData)
        .select()
        .single();

      if (error) {
        console.error('Erro ao salvar projeto:', error);
        toast.error('Erro ao enviar design. Tente novamente.');
        return;
      }

      console.log('Projeto salvo:', data);
      
      toast.success('Design enviado com sucesso!', {
        description: 'Nossa equipe entrará em contato em breve para alinhar os detalhes do pedido.'
      });

      // Reset form and close dialog
      setFormData({ name: '', email: '', phone: '' });
      onOpenChange(false);

    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enviar Design</DialogTitle>
          <DialogDescription>
            Preencha seus dados para que nossa equipe possa entrar em contato e alinhar todos os detalhes do seu pedido.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Design'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
