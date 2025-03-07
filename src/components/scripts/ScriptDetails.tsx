
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Copy, Star, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ScriptDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getScript, toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const script = getScript(id || '');
  
  const [copied, setCopied] = useState(false);
  
  if (!script) {
    return (
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Button>
        <Card className="exploit-card">
          <CardContent className="py-8 text-center">
            <p>Script not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(script.content);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: `${script.name} script copied to clipboard`,
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const downloadScript = () => {
    const element = document.createElement('a');
    const file = new Blob([script.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${script.name.replace(/\s+/g, '_')}.lua`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Script downloaded",
      description: `${script.name} has been downloaded`,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/dashboard')}
        className="mb-4 transition-all duration-200 hover:translate-x-[-4px]"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Scripts
      </Button>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="exploit-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">{script.name}</CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => toggleFavorite(script.id)}
                className="h-8 w-8 text-yellow-400 hover:text-yellow-500 transition-transform duration-300 hover:scale-110"
              >
                <Star className={`h-5 w-5 ${script.isFavorite ? 'fill-yellow-400' : ''}`} />
              </Button>
            </div>
            <div className="flex items-center mt-2">
              <p className="text-sm text-muted-foreground">Game: {script.game}</p>
            </div>
            <p className="text-muted-foreground mt-2">{script.description}</p>
          </CardHeader>
          <CardContent>
            <div className="bg-background/50 p-4 rounded-md overflow-hidden">
              <pre className="text-sm overflow-auto max-h-[400px] p-2">
                {script.content}
              </pre>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button 
                onClick={copyToClipboard}
                className="exploit-button transition-all duration-300 hover:scale-[1.02]"
                disabled={copied}
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy Script'}
              </Button>
              <Button 
                variant="outline" 
                onClick={downloadScript}
                className="border-exploit-primary/30 hover:bg-exploit-primary/10 transition-all duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScriptDetails;
