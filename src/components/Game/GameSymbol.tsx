import { Sprite } from "@pixi/react";
import { FC, memo, useEffect, useRef } from "react";
import { Symbol } from "../../types/types";
import { SYMBOL_HEIGHT, SYMBOL_WIDTH } from "../../utils/constants";
import * as PIXI from "pixi.js";
import { addSpritesToArray, removeSpritesToArray } from "../../store/slices/gameSlice";

interface Props {
    symbol: Symbol;
    yPosition: number;
    reelIndex: number, 
    symbolIndex: number
}
export const GameSymbol:FC<Props> = memo(({
    symbol,
    yPosition,
    reelIndex,
    symbolIndex
}) => {
    const spriteRef = useRef<PIXI.Sprite | null>(null);
    useEffect(()=>{
        if(spriteRef.current) {
            spriteRef.current.texture = PIXI.Texture.from(symbol.name);

            addSpritesToArray(spriteRef.current, reelIndex, symbolIndex);
        }

        return () => {
            if(spriteRef.current) {
                removeSpritesToArray(reelIndex, symbolIndex);
            }
        }
    }, [symbol.name]);
    
    return (
        <Sprite
            image={symbol.name}
            x={0}
            y={yPosition}
            width={SYMBOL_WIDTH}
            height={SYMBOL_HEIGHT}
            anchor={0.5}
            ref={spriteRef}
        />
    );
}, (prevProps, nextProps) => {
    return prevProps.symbol.id === nextProps.symbol.id;
});