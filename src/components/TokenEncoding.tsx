import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Binary, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface TokenEncodingProps {
  encoded: number[];
  tokens: Array<{ text: string; type: string }>;
}

export const TokenEncoding = ({ encoded, tokens }: TokenEncodingProps) => {
  if (encoded.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Binary className="h-5 w-5 text-primary" />
            Token Encoding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Enter text to see token encoding
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Binary className="h-5 w-5 text-primary" />
          Token Encoding ({encoded.length} IDs)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Token → ID Mapping:</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  tokens.map((t, i) => `${JSON.stringify(t.text)} -> ${encoded[i]}`).join("\n")
                );
                toast({ title: "Copied", description: "Mapping copied to clipboard" });
              }}
            >
              <Copy className="h-4 w-4 mr-1" /> Copy
            </Button>
          </div>
          <ScrollArea className="h-32 w-full border rounded p-2">
            <div className="flex flex-wrap gap-1">
              {tokens.map((token, index) => (
                <div key={index} className="flex items-center gap-1 text-xs">
                  <span className="px-2 py-1 bg-muted rounded">
                    "{token.text}"
                  </span>
                  <span>→</span>
                  <Badge variant="outline" className="text-xs">
                    {encoded[index]}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Encoded Sequence:</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await navigator.clipboard.writeText(`[${encoded.join(', ')}]`);
                toast({ title: "Copied", description: "Encoded IDs copied to clipboard" });
              }}
            >
              <Copy className="h-4 w-4 mr-1" /> Copy
            </Button>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <code className="text-sm break-all">[{encoded.join(', ')}]</code>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};