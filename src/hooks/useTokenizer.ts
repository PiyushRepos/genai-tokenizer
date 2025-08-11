import { useState, useCallback, useMemo } from 'react';
import { CustomTokenizer, Token, TokenizerStats } from '@/lib/tokenizer';

export const useTokenizer = () => {
  const [text, setText] = useState('');
  const [decodeInput, setDecodeInput] = useState('');
  const tokenizer = useMemo(() => CustomTokenizer.getInstance(), []);

  const tokens = useMemo(() => {
    if (!text.trim()) return [];
    return tokenizer.tokenize(text);
  }, [text, tokenizer]);

  const encoded = useMemo(() => {
    if (!text.trim()) return [];
    return tokenizer.encode(text);
  }, [text, tokenizer]);

  const decoded = useMemo(() => {
    if (!decodeInput.trim()) return '';
    try {
      const ids = decodeInput.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      return tokenizer.decode(ids);
    } catch {
      return 'Invalid input';
    }
  }, [decodeInput, tokenizer]);

  const stats = useMemo(() => {
    return tokenizer.getStats(tokens);
  }, [tokens, tokenizer]);

  const updateText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const updateDecodeInput = useCallback((newInput: string) => {
    setDecodeInput(newInput);
  }, []);

  const clearText = useCallback(() => {
    setText('');
  }, []);

  const clearVocabulary = useCallback(() => {
    tokenizer.clearVocabulary();
    setText('');
    setDecodeInput('');
  }, [tokenizer]);

  return {
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
  };
};