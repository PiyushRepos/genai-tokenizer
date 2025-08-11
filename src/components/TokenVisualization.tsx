import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye } from "lucide-react";
import { Token } from "@/lib/tokenizer";
import { toast } from "@/components/ui/use-toast";

interface TokenVisualizationProps {
  tokens: Token[];
}

const getTokenColor = (type: Token['type']) => {
  switch (type) {
    case 'word':
      return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
    case 'number':
      return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
    case 'punctuation':
      return 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200';
    case 'special':
      return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200';
    case 'whitespace':
      return 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
  }
};

const formatTokenText = (token: Token) => {
  if (token.type === 'whitespace') {
    return token.text.replace(/ /g, '·').replace(/\n/g, '↵').replace(/\t/g, '→');
  }
  return token.text;
};

export const TokenVisualization = ({ tokens }: TokenVisualizationProps) => {
  if (tokens.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Token Visualization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Enter some text to see the tokenization
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          Token Visualization ({tokens.length} tokens)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 w-full">
          <div className="flex flex-wrap gap-1 p-2">
            {tokens.map((token, index) => (
              <Badge
                key={token.id}
                variant="outline"
                className={`${getTokenColor(token.type)} cursor-pointer transition-colors text-xs font-mono`}
                title={`Token ${index + 1}: \"${token.text}\" (${token.type})`}
                onClick={async () => {
                  await navigator.clipboard.writeText(token.text);
                  toast({ title: "Token copied", description: `Copied "${token.text}"` });
                }}
              >
                {formatTokenText(token)}
              </Badge>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200"></div>
            <span>Words</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-100 border border-green-200"></div>
            <span>Numbers</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-orange-100 border border-orange-200"></div>
            <span>Punctuation</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-purple-100 border border-purple-200"></div>
            <span>Special</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gray-100 border border-gray-200"></div>
            <span>Whitespace</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};