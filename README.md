# Tokenizer • Chai aur GenAI

An interactive, no-deps tokenizer playground to explore how text breaks into tokens, how IDs are assigned, and how decoding works — with a clean UI built on shadcn/ui and Tailwind.

## Features

- Type or paste text to see tokens in real time
- Token → ID mapping and encoded sequence view
- Click any token to copy it; copy mapping/IDs in one click
- Example chips to quickly try inputs
- Decode by entering comma-separated IDs
- Stats: counts by type, total tokens, unique-in-input, and total learned vocabulary
- Theme toggle (light/dark) with persistence
- Pure custom tokenizer logic (no external tokenization libs)

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui (Radix UI primitives)
- TanStack Query (scaffolded; minimal usage)

## Getting Started

Prerequisites: Node.js 18+ and npm.

Windows cmd commands:

```cmd
git clone https://github.com/PiyushRepos/genai-tokenizer.git
cd tokenizer
npm install
npm run dev
```

Build and preview:

```cmd
npm run build
npm run preview
```

## Usage Tips

- Use the example chips above the input to populate sample text.
- Use the “Copy Encoded IDs” and “Copy Original Text” buttons for quick sharing.
- Click any token badge to copy just that token.
- In Decoding, enter IDs like: `1, 2, 3`. Reset clears the learned vocabulary.

## Project Structure

- `src/lib/tokenizer.ts` — Custom tokenizer (tokenize, encode, decode, stats)
- `src/hooks/useTokenizer.ts` — State and memoized derivations
- `src/pages/Index.tsx` — Main page layout and wiring
- `src/components/` — UI components: input, stats, visualization, encoding, decoding
- `src/components/ui/` — shadcn/ui building blocks

## Tokenizer Details

- Types recognized: word, number, punctuation, whitespace, special
- Encoding: assigns incremental IDs per unique token text; stored in localStorage
- Decoding: maps IDs back to token text; unknown IDs render as `[UNK]`
- Stats:
	- totalTokens, words, numbers, punctuation, whitespace, special
	- characters, charactersWithoutSpaces
	- vocabularySize: unique tokens in current input
	- totalVocabularySize: learned vocabulary across the session/storage

## Credits

- Built with 💗 by Piyush Kumar — https://x.com/_PiyushDev
- UI components via shadcn/ui (Radix primitives)

