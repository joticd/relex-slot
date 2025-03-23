import { Line, SymbolPosition, TReel, WinLine } from "../types/types";
import {
  REEL_WIDTH,
  REELS_GAP,
  REELS_NUMBER,
  SYMBOL_GAP,
  SYMBOL_HEIGHT,
  SYMBOL_VALUES,
  SYMBOL_WIDTH,
  SYMBOLS_CONSTANTS,
  SYMBOLS_NUMBER,
  TOTAL_SYMBOLS,
} from "./constants";

export const getCanvasSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
};

export const getSymbolX = () => {
  return (REEL_WIDTH - SYMBOL_WIDTH) / 2;
};
export const getSymbolY = (i: number) => {
  return (SYMBOLS_NUMBER - i - 1) * (SYMBOL_HEIGHT + SYMBOL_GAP);
};
export const getReelsContainerWidth = () => {
  return REELS_NUMBER * REEL_WIDTH + (REELS_NUMBER - 1) * REELS_GAP;
};
export const getReelX = (i: number) => {
  return i * (REEL_WIDTH + REELS_GAP);
};
export const getReelHeight = () => {
  return SYMBOLS_NUMBER * SYMBOL_HEIGHT + (SYMBOLS_NUMBER - 1) * SYMBOL_GAP;
};

export const getRandomNumber = (): number => {
  return Math.floor(Math.random() * TOTAL_SYMBOLS) + 1;
};

export const randomReels = (): TReel[] => {
  const newReel: TReel[] = [];

  for (let i = 0; i < REELS_NUMBER; i++) {
    const reel: TReel = [];
    for (let j = 0; j < SYMBOLS_NUMBER; j++) {
      const newId = getRandomNumber();
      reel.push({
        id: newId,
        name: SYMBOLS_CONSTANTS.get(newId),
      });
    }
    newReel.push(reel);
  }
  return newReel;
};

export const initialPosition = (): SymbolPosition[][] => {
  const symbolsPositions: SymbolPosition[][] = [];
  for (let i = 0; i < REELS_NUMBER; i++) {
    symbolsPositions[i] = [];
    for (let j = 0; j < SYMBOLS_NUMBER; j++) {
      symbolsPositions[i][j] = {
        position: {
          x: 0,
          y: 0,
        },
        positionFrom: {
          x: 0,
          y: 0,
        },
        positionTo: {
          x: 0,
          y: 0,
        },
      };
    }
  }
  return symbolsPositions;
};

export const getNewSymbols = (forceWin = false): string[][] => {
  const newSymbols: string[][] = [];
  const winSym = getRandomNumber();
  for (let i = 0; i < REELS_NUMBER; i++) {
    newSymbols[i] = [];
    for (let j = 0; j < SYMBOLS_NUMBER; j++) {
      let newId = forceWin && j === 1 ? winSym : getRandomNumber();
      
      newSymbols[i][j] = `planet0${newId}`;
    }
  }
  return newSymbols;
};

export const checkWins = (reels: TReel[], bet: number): WinLine[] => {
  const win: WinLine[] = [];

  for (let s = 0; s < SYMBOLS_NUMBER; s++) {
    let symCounter = 1;
    let line: Line[] = [];
    let firstSym = "";
    let winAmount = 0;
    for (let r = 0; r < REELS_NUMBER; r++) {
      if (r === 0) {
        firstSym = reels[r][s].name;
        line.push({
          reelIndex: r,
          symbolIndex: s,
        });
        continue;
      }

      if (r === 1 && firstSym !== reels[r][s].name) {
        firstSym = reels[r][s].name;
        line = [];
      }

      if (r === 1 && firstSym === reels[r][s].name) {
        symCounter++;
        line.push({
          reelIndex: r,
          symbolIndex: s,
        });
      }

      if (r > 1 && firstSym === reels[r][s].name) {
        symCounter++;
        line.push({
          reelIndex: r,
          symbolIndex: s,
        });
      }

      if (r > 1 && firstSym !== reels[r][s].name) {
        break;
      }
    }

    if (symCounter > 3) {

      const valueTable = SYMBOL_VALUES[firstSym] || {};
      const multiplier = valueTable[symCounter as keyof typeof valueTable] || 0;

      winAmount = multiplier * bet;

      win.push({
        line, 
        winAmount
      });
    }
  }

  return win;
};
