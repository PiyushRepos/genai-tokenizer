export interface Token {
  id: string;
  text: string;
  type: 'word' | 'punctuation' | 'whitespace' | 'number' | 'special';
  start: number;
  end: number;
}

export interface TokenizerStats {
  totalTokens: number;
  words: number;
  punctuation: number;
  whitespace: number;
  numbers: number;
  special: number;
  characters: number;
  charactersWithoutSpaces: number;
  // Unique tokens in the CURRENT input
  vocabularySize: number;
  // Total learned vocabulary across the session/storage
  totalVocabularySize: number;
}

export class CustomTokenizer {
  private static instance: CustomTokenizer;
  private vocabulary: Map<string, number> = new Map();
  private reverseVocabulary: Map<number, string> = new Map();
  private nextId: number = 0;
  private readonly VOCAB_STORAGE_KEY = 'tokenizer_vocabulary';
  
  public static getInstance(): CustomTokenizer {
    if (!CustomTokenizer.instance) {
      CustomTokenizer.instance = new CustomTokenizer();
    }
    return CustomTokenizer.instance;
  }

  constructor() {
    this.loadVocabulary();
  }

  tokenize(text: string): Token[] {
    const tokens: Token[] = [];
    let currentIndex = 0;
    
    while (currentIndex < text.length) {
      const char = text[currentIndex];
      
      if (this.isWhitespace(char)) {
        const token = this.extractWhitespace(text, currentIndex);
        tokens.push({
          id: `token-${tokens.length}`,
          text: token.text,
          type: 'whitespace',
          start: currentIndex,
          end: currentIndex + token.length
        });
        currentIndex += token.length;
      } else if (this.isLetter(char)) {
        const token = this.extractWord(text, currentIndex);
        tokens.push({
          id: `token-${tokens.length}`,
          text: token.text,
          type: 'word',
          start: currentIndex,
          end: currentIndex + token.length
        });
        currentIndex += token.length;
      } else if (this.isDigit(char)) {
        const token = this.extractNumber(text, currentIndex);
        tokens.push({
          id: `token-${tokens.length}`,
          text: token.text,
          type: 'number',
          start: currentIndex,
          end: currentIndex + token.length
        });
        currentIndex += token.length;
      } else if (this.isPunctuation(char)) {
        tokens.push({
          id: `token-${tokens.length}`,
          text: char,
          type: 'punctuation',
          start: currentIndex,
          end: currentIndex + 1
        });
        currentIndex++;
      } else {
        tokens.push({
          id: `token-${tokens.length}`,
          text: char,
          type: 'special',
          start: currentIndex,
          end: currentIndex + 1
        });
        currentIndex++;
      }
    }
    
    return tokens;
  }

  encode(text: string): number[] {
    const tokens = this.tokenize(text);
    const encoded: number[] = [];
    
    tokens.forEach(token => {
      if (!this.vocabulary.has(token.text)) {
        this.addToVocabulary(token.text);
      }
      encoded.push(this.vocabulary.get(token.text)!);
    });
    
    return encoded;
  }

  decode(ids: number[]): string {
    return ids.map(id => this.reverseVocabulary.get(id) || '[UNK]').join('');
  }

  getStats(tokens: Token[]): TokenizerStats {
    const stats: TokenizerStats = {
      totalTokens: tokens.length,
      words: 0,
      punctuation: 0,
      whitespace: 0,
      numbers: 0,
      special: 0,
      characters: 0,
      charactersWithoutSpaces: 0,
      vocabularySize: 0,
      totalVocabularySize: this.vocabulary.size
    };

    tokens.forEach(token => {
      stats[token.type]++;
      stats.characters += token.text.length;
      if (token.type !== 'whitespace') {
        stats.charactersWithoutSpaces += token.text.length;
      }
    });

    // Unique tokens in current input (by exact text)
    const unique = new Set(tokens.map(t => t.text));
    stats.vocabularySize = unique.size;

    return stats;
  }

  getVocabularySize(): number {
    return this.vocabulary.size;
  }

  clearVocabulary(): void {
    this.vocabulary.clear();
    this.reverseVocabulary.clear();
    this.nextId = 0;
    this.saveVocabulary();
  }

  private addToVocabulary(token: string): void {
    if (!this.vocabulary.has(token)) {
      this.vocabulary.set(token, this.nextId);
      this.reverseVocabulary.set(this.nextId, token);
      this.nextId++;
      this.saveVocabulary();
    }
  }

  private loadVocabulary(): void {
    try {
      const stored = localStorage.getItem(this.VOCAB_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.vocabulary = new Map(data.vocabulary);
        this.reverseVocabulary = new Map(data.reverseVocabulary);
        this.nextId = data.nextId || 0;
      }
    } catch (error) {
      console.warn('Failed to load vocabulary from storage:', error);
    }
  }

  private saveVocabulary(): void {
    try {
      const data = {
        vocabulary: Array.from(this.vocabulary.entries()),
        reverseVocabulary: Array.from(this.reverseVocabulary.entries()),
        nextId: this.nextId
      };
      localStorage.setItem(this.VOCAB_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save vocabulary to storage:', error);
    }
  }

  private isWhitespace(char: string): boolean {
    return /\s/.test(char);
  }

  private isLetter(char: string): boolean {
    return /[a-zA-Z]/.test(char);
  }

  private isDigit(char: string): boolean {
    return /\d/.test(char);
  }

  private isPunctuation(char: string): boolean {
    return /[.,;:!?'"()[\]{}\-_=+*&^%$#@~`|\\/<>]/.test(char);
  }

  private extractWhitespace(text: string, start: number): { text: string; length: number } {
    let end = start;
    while (end < text.length && this.isWhitespace(text[end])) {
      end++;
    }
    return {
      text: text.slice(start, end),
      length: end - start
    };
  }

  private extractWord(text: string, start: number): { text: string; length: number } {
    let end = start;
    while (end < text.length && (this.isLetter(text[end]) || text[end] === "'" || text[end] === "-")) {
      end++;
    }
    return {
      text: text.slice(start, end),
      length: end - start
    };
  }

  private extractNumber(text: string, start: number): { text: string; length: number } {
    let end = start;
    let hasDot = false;
    
    while (end < text.length) {
      const char = text[end];
      if (this.isDigit(char)) {
        end++;
      } else if (char === '.' && !hasDot) {
        hasDot = true;
        end++;
      } else {
        break;
      }
    }
    
    return {
      text: text.slice(start, end),
      length: end - start
    };
  }
}