import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RotateCcw, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface TokenDecodingProps {
  decodeInput: string;
  decoded: string;
  onDecodeInputChange: (value: string) => void;
  onClearVocabulary: () => void;
}

export const TokenDecoding = ({
  decodeInput,
  decoded,
  onDecodeInputChange,
  onClearVocabulary
}: TokenDecodingProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-primary" />
          Token Decoding
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="decode-input">Enter comma-separated IDs (e.g., 1, 2, 3):</Label>
          <Input
            id="decode-input"
            placeholder="e.g., 1, 2, 3, 4"
            value={decodeInput}
            onChange={(e) => onDecodeInputChange(e.target.value)}
          />
        </div>

        {decoded && (
          <div className="space-y-2">
            <Label>Decoded Text:</Label>
            <div className="p-3 bg-muted rounded-lg min-h-[40px] flex items-center">
              <span className="text-sm">
                {decoded === 'Invalid input' ? (
                  <span className="text-destructive">{decoded}</span>
                ) : (
                  `"${decoded}"`
                )}
              </span>
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onClearVocabulary();
              toast({ title: "Reset", description: "Successfully reset" });
            }}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Clears all learned tokens and resets the vocabulary
          </p>
        </div>
      </CardContent>
    </Card>
  );
};