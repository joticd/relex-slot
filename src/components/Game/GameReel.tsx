import { Container } from "@pixi/react"
import { FC, memo, useEffect } from "react"
import { TReel } from "../../types/types";
import { getReelHeight, getSymbolY } from "../../utils/helpers";
import { REEL_WIDTH } from "../../utils/constants";
import { GameSymbol } from "./GameSymbol";
import { useDispatch } from "react-redux";
import { updateSymbolPosition } from "../../store/slices/gameSlice";

interface Props {
    xx: number;
    reel: TReel;
    reelIndex: number;
    canvasSize: {
        width: number;
        height: number;
    }
}

export const GameReel: FC<Props> = memo(({xx, reel, reelIndex, canvasSize}) => {    
    const reelHeight = getReelHeight();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(reel.length > 0) {
            reel.forEach((_, symbolIndex) => {
                dispatch(updateSymbolPosition({
                    reelIndex,
                    symbolIndex,
                    positionFrom: {x: 0, y: getSymbolY(symbolIndex) - canvasSize.height*0.65},
                    position: {x: 0, y: getSymbolY(symbolIndex)},
                    positionTo: {x: 0, y: getSymbolY(symbolIndex) + canvasSize.height*0.65}
                }))
            });
        }
    }, []);

    return (
        <Container x={xx} y={0} width={REEL_WIDTH} height={reelHeight}>
            {
                reel.map((sym, i)=>{
                    
                    return (
                        <GameSymbol
                            key={i}
                            symbol={sym}
                            yPosition={getSymbolY(i)}
                            reelIndex={reelIndex}
                            symbolIndex={i}
                        />
                    )
                })
            }
        </Container>
    );
}, (prevProps, nextProps) => {
    return prevProps.reel[0].id === nextProps.reel[0].id;
});