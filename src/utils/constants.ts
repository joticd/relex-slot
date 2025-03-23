
export const REELS_NUMBER = 5;
export const SYMBOLS_NUMBER = 3;
export const TOTAL_SYMBOLS = 9;
export const BET = 1;
export const BALANCE = 1000;

export const SYMBOL_WIDTH = 50;
export const SYMBOL_HEIGHT = 50;
export const SYMBOL_GAP = SYMBOL_HEIGHT * 0.5;
export const REEL_WIDTH = SYMBOL_WIDTH * 1.2;
export const REELS_GAP = REEL_WIDTH * 0.5;

export const FORCE_WIN = 4;

export const SPIN_ANIMATION = 0.7;
export const SPIN_SYM_DELEY = 0.2;

export const WIN_SYM_RADIUSX = 10;
export const WIN_SYM_RADIUSY = 8;
export const WIN_SYM_SCALE = 1.2;
export const WIN_SYM_DURATION = 1.5;

export const SYMBOLS_CONSTANTS = new Map();
for(let i = 1; i < TOTAL_SYMBOLS + 1; i++){
    SYMBOLS_CONSTANTS.set(i, `planet0${i}`);
};

export const SYMBOL_VALUES: Record<string, Record<number, number>> = {
    "planet01": { 4: 10, 5: 20 },
    "planet02": { 4: 20, 5: 40 },
    "planet03": { 4: 30, 5: 60 },
    "planet04": { 4: 40, 5: 80 },
    "planet05": { 4: 50, 5: 100 },
    "planet06": { 4: 60, 5: 120 },
    "planet07": { 4: 70, 5: 140 },
    "planet08": { 4: 80, 5: 160 },
    "planet09": { 4: 90, 5: 180 }
};

export const SPIN_DELEY = 100 * 2 *REELS_NUMBER * SYMBOLS_NUMBER * (SPIN_SYM_DELEY + SPIN_ANIMATION);

