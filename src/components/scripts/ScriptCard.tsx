
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Code, Copy, ExternalLink } from 'lucide-react';
import { Script, useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ScriptCardProps {
  script: Script;
  compact?: boolean;
}

const ScriptCard = ({ script, compact = false }: ScriptCardProps) => {
  const { toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script.content);
    toast({
      title: "Copied to clipboard",
      description: `${script.name} script copied to clipboard`,
    });
  };

  const viewDetails = () => {
    navigate(`/scripts/${script.id}`);
  };

  return (
    <Card 
      className={`exploit-card transition-all duration-300 ${isHovering ? 'scale-[1.02] shadow-lg' : ''} animate-fade-in`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{script.name}</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => toggleFavorite(script.id)}
            className="h-8 w-8 text-yellow-400 hover:text-yellow-500 transition-colors"
          >
            <Star className={`h-5 w-5 ${script.isFavorite ? 'fill-yellow-400' : ''} transition-transform duration-300 ${isHovering && !script.isFavorite ? 'scale-110' : ''}`} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Game: {script.game}</p>
      </CardHeader>
      
      {!compact && (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">{script.description}</p>
          <div className="mt-3 bg-background/50 p-2 rounded-md max-h-24 overflow-hidden relative">
            <pre className="text-xs overflow-hidden opacity-70">
              {script.content.slice(0, 120)}...
            </pre>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card pointer-events-none"></div>
          </div>
        </CardContent>
      )}
      
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={copyToClipboard}
          className="text-exploit-accent border-exploit-accent/30 hover:bg-exploit-accent/10 transition-colors duration-200"
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={viewDetails}
          className="border-exploit-primary/30 hover:bg-exploit-primary/10 transition-colors duration-200"
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScriptCard;
