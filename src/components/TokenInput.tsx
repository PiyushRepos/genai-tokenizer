import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Type, ClipboardPaste } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

interface TokenInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const TokenInput = ({ value, onChange, onClear }: TokenInputProps) => {
  const examples = [
    "Hello, world!",
    "Chai > Coffee? Let's tokenize this.",
    "Price: 199.99 INR.",
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5 text-primary" />
          Text Input
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <Badge
              key={ex}
              variant="outline"
              className="cursor-pointer hover:bg-muted"
              onClick={() => onChange(ex)}
            >
              {ex}
            </Badge>
          ))}
        </div>
        <Textarea
          placeholder="Enter your text here to tokenize..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px] resize-none"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {value.length} characters
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            disabled={!value}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};