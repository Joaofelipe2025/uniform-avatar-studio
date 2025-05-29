
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface SendDesignButtonProps {
  customization: {
    baseColor: string;
    accentColor: string;
    pattern: string;
    playerName: string;
    playerNumber: string;
    logoUrl?: string;
    modelType?: string;
    patternColor?: string;
  };
  currentView: string;
}

export const SendDesignButton = ({ customization, currentView }: SendDesignButtonProps) => {
  const [sending, setSending] = useState(false);

  const handleSendDesign = async () => {
    setSending(true);
    
    try {
      const designData = {
        name: `Design - ${customization.playerName || 'Unknown'} #${customization.playerNumber || 'N/A'}`,
        customization: {
          ...customization,
          model: customization.modelType || 'home',
          pattern: customization.pattern,
          pattern_color: customization.patternColor || '#ffffff',
          shirt_color: customization.baseColor,
          number: customization.playerNumber,
          name: customization.playerName,
        },
        current_view: currentView,
        status: 'sent' as const,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('uniform_projects')
        .insert(designData)
        .select()
        .single();

      if (error) {
        console.error('Error sending design:', error);
        toast.error('Failed to send design');
        return;
      }

      console.log('Design sent successfully:', data);
      toast.success('Design sent successfully!', {
        description: 'Your design has been saved and sent for review'
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Unexpected error while sending design');
    } finally {
      setSending(false);
    }
  };

  return (
    <Button 
      onClick={handleSendDesign}
      disabled={sending}
      className="bg-green-600 hover:bg-green-700 w-full"
    >
      <Send className="w-4 h-4 mr-2" />
      {sending ? 'Sending...' : 'Send Design'}
    </Button>
  );
};
