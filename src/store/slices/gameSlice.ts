import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState, SymbolPositionUpdate, WinLine } from "../../types/types";
import { initialPosition, randomReels } from "../../utils/helpers";
import { animateSpin, spinAndCheckWins } from "../thunk/gameThunk";

export const pixiSprites: any[][] = [];

export const addSpritesToArray = (sprite: any, reelIndex: number, symbolIndex: number) => {
  if (!pixiSprites[reelIndex]) {
    pixiSprites[reelIndex] = [];
  }
  pixiSprites[reelIndex][symbolIndex] = sprite;
};

export const removeSpritesToArray = (reelIndex: number, symbolIndex: number) => {
  if (pixiSprites[reelIndex]) {
    pixiSprites[reelIndex][symbolIndex] = null;
  }
};

export const pixiContainers: any[][] = [];

export const addContainerToArray = (container: any, reelIndex: number, symbolIndex: number) => {
  if (!pixiContainers[reelIndex]) {
    pixiContainers[reelIndex] = [];
  }
  pixiContainers[reelIndex][symbolIndex] = container;
};

export const removeContainerToArray = (reelIndex: number, symbolIndex: number) => {
  if (pixiContainers[reelIndex]) {
    pixiContainers[reelIndex][symbolIndex] = null;
  }
};


const initialState: GameState = {
  reels: randomReels(),
  symbolsPosition: initialPosition(),
  balance: 1000,
  bet: 100,
  betOption: 100,
  isSpinning: false,
  isWinning: false,
  spinCount: 1,
  winAmount: 0,
  wins: [],
  showModal: false,
};

const reducers = {
  startSpin: (state: GameState) => {
    if (!state.isSpinning && state.balance >= state.bet) {
      state.isSpinning = true;
      state.wins = []; 
      state.winAmount = 0;
      state.showModal = false;
      state.balance = state.balance - state.bet;
    }
  },
  stopSpin: (state: GameState) => {
    state.isSpinning = false;
  },
  updateReels: (state: GameState, action: PayloadAction<string[][]>) => {
    const newSprites = action.payload;
    for(let i = 0; i < state.reels.length; i++ ){
      for(let j = 0; j < state.reels.length; j++ ){
        if(newSprites[i] && newSprites[i][j]) {
          state.reels[i][j].name = newSprites[i][j];
        }
      }

    }
    
  },
  setWinLines: (state: GameState, action: PayloadAction<WinLine[]>) => {
    state.wins = action.payload;
    const totalWin = action.payload.reduce(
      (sum, win) => sum + win.winAmount,
      0
    );
    if (totalWin > 0) {
      state.isWinning = true;
      state.winAmount = totalWin;
    } else {
      state.isWinning = false;
    }
  },
  showModal: (state: GameState) => {
    state.showModal = true;
  },
  closeModal: (state: GameState) => {
    state.showModal = false;
  },
  setBet: (state: GameState, action: PayloadAction<number>) => {
    if (!state.isSpinning) {
      state.bet = action.payload;
    }
  },
  updateBalance: (state: GameState, action: PayloadAction<number>) => {
    state.balance = action.payload;
  },
  updateSymbolPosition: (state: GameState, action: PayloadAction<SymbolPositionUpdate>) => {
    const { reelIndex, symbolIndex, positionFrom, position, positionTo } = action.payload;
    if(state.symbolsPosition[reelIndex] && state.symbolsPosition[reelIndex][symbolIndex]) {
      if (positionFrom) {
        state.symbolsPosition[reelIndex][symbolIndex].positionFrom = positionFrom;
      }
      if (position) {
        state.symbolsPosition[reelIndex][symbolIndex].position = position;
      }
      if (positionTo) {
        state.symbolsPosition[reelIndex][symbolIndex].positionTo = positionTo;
      }
    }
  }
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(spinAndCheckWins.pending, () => {
        console.log("spinAndCheckWins pending");
      })
      .addCase(spinAndCheckWins.fulfilled, (state) => {
        console.log("spinAndCheckWins fulfilled");
        state.spinCount++;
      })

      .addCase(animateSpin.pending, (state) => {
        state.isSpinning = true;
      })
      .addCase(animateSpin.fulfilled, () => {

      })
      
  },
});

export const {
  startSpin,
  stopSpin,
  updateReels,
  setWinLines,
  showModal,
  closeModal,
  setBet,
  updateBalance,
  updateSymbolPosition
} = gameSlice.actions;

export default gameSlice.reducer;
