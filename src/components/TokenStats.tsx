import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";
import { TokenizerStats } from "@/lib/tokenizer";

interface TokenStatsProps {
  stats: TokenizerStats;
}

export const TokenStats = ({ stats }: TokenStatsProps) => {
  const statItems = [
    { label: "Total Tokens", value: stats.totalTokens, variant: "outline" },
    { label: "Words", value: stats.words, variant: "outline" },
    { label: "Numbers", value: stats.numbers, variant: "outline" },
    { label: "Punctuation", value: stats.punctuation, variant: "outline" },
    { label: "Unique in Input", value: stats.vocabularySize, variant: "outline" },
    { label: "Total Learned", value: stats.totalVocabularySize, variant: "outline" },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Token Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center p-3 rounded-lg border bg-card"
            >
              <Badge variant={item.variant as "default" | "secondary" | "outline"} className="mb-2">
                {item.value}
              </Badge>
              <span className="text-sm text-muted-foreground text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};