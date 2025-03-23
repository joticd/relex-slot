import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkWins, getNewSymbols } from "../../utils/helpers";
import * as PIXI from "pixi.js";
import { closeModal, pixiSprites, setWinLines, showModal, stopSpin, updateBalance, updateReels } from "../slices/gameSlice";
import { FORCE_WIN, REELS_NUMBER, SPIN_ANIMATION, SPIN_DELEY, SPIN_SYM_DELEY, SYMBOLS_NUMBER, WIN_SYM_DURATION, WIN_SYM_RADIUSX, WIN_SYM_RADIUSY, WIN_SYM_SCALE } from "../../utils/constants";
import gsap from "gsap";
import { SymbolPosition, WinLine } from "../../types/types";

export const spinAndCheckWins = createAsyncThunk(
    "game/spinAndCheckWins",
    async (_, {dispatch, getState}) => {
        const state = getState() as { game: any};
        const spinCount = state.game.spinCount;

        const forceWin = spinCount % FORCE_WIN === 0;
        
        const newSprites = getNewSymbols(forceWin);

        dispatch(updateReels(newSprites));
        changeTextures(pixiSprites, newSprites);
        
        const updateState = getState() as { game: any};
        
        const updatedReels = updateState.game.reels;
        const currentBet = updateState.game.bet;

        const wins = checkWins(updatedReels, currentBet);

        if(wins.length > 0) {
            dispatch(setWinLines(wins));

            const totalWin = wins.reduce((sum, win) => sum + win.winAmount, 0);
            const newBalance = updateState.game.balance + totalWin;
          
            dispatch(updateBalance(newBalance));
            setTimeout(()=>{
                dispatch(animateWins(wins));

            }, SPIN_DELEY);

            // winSynAnim(wins, pixiSprites, dispatch)
            
        } else {
            
            setTimeout(()=>{
                
                dispatch(stopSpin());

            }, SPIN_DELEY);
        }

        return { newSprites, wins };
    }
);

export const animateSpin = createAsyncThunk(
    "game/animateSpin",
    async ( {pixiSprites, symbolsPosition}: {pixiSprites: any[][], symbolsPosition: SymbolPosition[][]}, {dispatch} ) => {
        return new Promise<void>((resolve) => {
            symDownAnim(pixiSprites, symbolsPosition, dispatch, resolve);
        });
    }
);

export const changeTextures = (pixiSprites: any[][], newSprites: string[][]) => {
    for (let i = 0; i < pixiSprites.length; i++) {
        for (let j = 0; j < pixiSprites[i].length; j++) {
            if (pixiSprites[i][j] && newSprites[i] && newSprites[i][j]) {
                pixiSprites[i][j].texture = PIXI.Texture.from(newSprites[i][j]);
            }
        }
    }
};

function symDownAnim (pixiSprites: any[][], symbolsPosition: SymbolPosition[][], dispatch: any, resolve: any) {
    let completeCounter = 0;
    const totalNum = REELS_NUMBER * SYMBOLS_NUMBER; 
    for(let i = 0; i < pixiSprites.length; i++){
        for(let j = 0; j < pixiSprites[i].length; j++){
            const sprite = pixiSprites[i][j];
            const spritePos = symbolsPosition[i][j];
            const delay = j * SPIN_SYM_DELEY + i * SPIN_SYM_DELEY;
            const positionDeley = (SYMBOLS_NUMBER - j - 1) * SPIN_SYM_DELEY + (REELS_NUMBER - i - 1) * SPIN_SYM_DELEY + delay;
            gsap.to(sprite, {
                y:  spritePos.positionTo.y,
                duration: SPIN_ANIMATION,
                ease: "power1.in",
                delay,
                onComplete: () => {
                    completeCounter++;
                    sprite.y = spritePos.positionFrom.y;
                    symOnPosition(sprite, spritePos, positionDeley);
                    if(totalNum === completeCounter) {
                        dispatch(spinAndCheckWins());
                        resolve();              
                    }
                    
                }
            });
        }
    }     
}

function symOnPosition(sprite: any, spritePos: SymbolPosition, positionDeley: number) {
    gsap.to(sprite, {
        y:  spritePos.position.y,
        duration: 0.8,
        ease: "power1.in",
        delay: positionDeley,
        onComplete: () => {
         
        }
    });
}

export const animateWins = createAsyncThunk(
    "game/animateWins",
    async (wins: WinLine[], { dispatch }) => {
        if(wins.length === 0) {
            dispatch(stopSpin());
            return;
        }

        return new Promise<void>((resolve) => {
            let completeCounter = 0;
            const totalNum = wins.reduce((sum, win) => sum + win.line.length, 0);

            const radiusX = WIN_SYM_RADIUSX;
            const radiusY = WIN_SYM_RADIUSY;
            const scaleFactor = WIN_SYM_SCALE;
            const duration = WIN_SYM_DURATION;
            

            const onAnimationComplete = () => {
                completeCounter++;
                if(completeCounter === totalNum) {

                    dispatch(showModal());

                    setTimeout(()=>{
                        dispatch(closeModal());
                        dispatch(stopSpin());
                        resolve();
                    }, 2000);
                }
            };

            for(let i = 0; i < wins.length; i++){
                const { line } = wins[i];
                for(let j = 0; j < line.length; j++){
                    const {reelIndex, symbolIndex} = line[j];
                    const sprite = pixiSprites[reelIndex][symbolIndex];

                    if(!sprite) {
                        onAnimationComplete();
                        continue;
                    }

                    const originalX = sprite.x;
                    const originalY = sprite.y;
                    const originalScaleX = sprite.scale.x;
                    const originalScaleY = sprite.scale.y;

                    const tl = gsap.timeline({
                        repeat: 2,
                        onComplete: () => {
                            sprite.x = originalX;
                            sprite.y = originalY;
                            sprite.scale.x = originalScaleX;
                            sprite.scale.y = originalScaleY;

                            onAnimationComplete();
                        }
                    });

                    tl.to(sprite.scale, {
                        x: originalScaleX * scaleFactor,
                        y: originalScaleY * scaleFactor,
                        duration: 0.3,
                        ease: "power1.out"
                    });

                    tl.to({}, {
                        duration, 
                        ease: "none",
                        onUpdate: function() {
                            const progress = this.progress();
                            const angle = progress * Math.PI * 2;

                            const newX = originalX + Math.cos(angle) * radiusX;
                            const newY = originalY + Math.sin(angle) * radiusY;

                            sprite.x = newX;
                            sprite.y = newY;
                        }
                    }, "-=0.15");

                    tl.to(sprite.scale, {
                        x: originalScaleX,
                        y: originalScaleY,
                        duration: 0.3,
                        ease: "power1.out"
                    }, "-=0.3");
                }
            }

        });
    }
);

