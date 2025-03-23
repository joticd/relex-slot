export interface Symbol {
    id: number;
    name: string;    
}

export type TReel = Symbol[];

export interface Line {
    reelIndex: number;
    symbolIndex: number;
}

export interface WinLine {
    line: Line[];
    winAmount: number;
}

export interface SymbolPosition { 
    position: {
        x: number;
        y: number;
    };
    positionFrom: {
        x: number;
        y: number;
    };
    positionTo: {
        x: number;
        y: number;
    };
}

export interface GameState {
    reels: TReel[];
    symbolsPosition: SymbolPosition[][];
    isSpinning: boolean;
    spinCount: number;
    bet: number;
    betOption: number;
    balance: number;
    winAmount: number;
    isWinning: boolean;
    wins: WinLine[];
    showModal: boolean;
}

export interface SymbolPositionUpdate extends SymbolPosition {
    reelIndex: number;
    symbolIndex: number;
}

