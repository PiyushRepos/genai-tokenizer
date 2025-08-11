import { TokenInput } from "@/components/TokenInput";
import { TokenStats } from "@/components/TokenStats";
import { TokenVisualization } from "@/components/TokenVisualization";
import { TokenEncoding } from "@/components/TokenEncoding";
import { TokenDecoding } from "@/components/TokenDecoding";
import { useTokenizer } from "@/hooks/useTokenizer";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const {
    text,
    tokens,
    encoded,
    decoded,
    decodeInput,
    stats,
    updateText,
    updateDecodeInput,
    clearText,
    clearVocabulary
  } = useTokenizer();

  const handleCopyIds = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(encoded));
      toast({ title: "Copied", description: "Encoded IDs copied to clipboard" });
    } catch {
      toast({ title: "Copy failed", description: "Couldn't access clipboard" });
    }
  };

  const handleCopyTokens = async () => {
    try {
      await navigator.clipboard.writeText(tokens.map(t => t.text).join(""));
      toast({ title: "Copied", description: "Original text copied to clipboard" });
    } catch {
      toast({ title: "Copy failed", description: "Couldn't access clipboard" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Top Nav */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded bg-gradient-to-br from-[#ff9d00] to-[#ffd400]" />
            <h1 className="text-xl font-semibold">Tokenizer • Chai aur GenAI</h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              href="https://github.com/PiyushRepos"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Header */}
        <header className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-bl from-[#ff9d00] to-[#ffd400] bg-clip-text text-transparent">
            Tokenizer with Chai aur GenAI
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Explore tokenization and its impact on AI models — sip your chai while you learn.
          </p>
        </header>

        <Separator className="mb-6" />

        {/* Main Content */}
        <main className="grid gap-6 mb-6">
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <TokenInput
              value={text}
              onChange={updateText}
              onClear={clearText}
            />
            <div className="space-y-4">
              {/* <TokenStats stats={stats} /> */}
              <TokenEncoding encoded={encoded} tokens={tokens} />

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyIds} disabled={encoded.length === 0}>
                  Copy Encoded IDs
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyTokens} disabled={tokens.length === 0}>
                  Copy Original Text
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <TokenVisualization tokens={tokens} />
            <TokenDecoding
              decodeInput={decodeInput}
              decoded={decoded}
              onDecodeInputChange={updateDecodeInput}
              onClearVocabulary={clearVocabulary}
            />
          </div>
        </main>

        {/* Footer */}
        <Separator className="mb-6" />
        <div className="text-center text-xs text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span>Custom tokenizer — no external tokenization libraries</span>
            <span>Built by <a className="underline" href="https://x.com/_PiyushDev" target="_blank" rel="noreferrer">Piyush Kumar</a></span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4">
            <a
              href="https://x.com/_PiyushDev"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/piyushkumar-dev/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/PiyushRepos"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
