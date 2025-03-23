import { Container } from "@pixi/react";
import { FC, memo } from "react";
import { GameReel } from "./GameReel";
import { getReelHeight, getReelsContainerWidth, getReelX } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Props {
    canvasSize: {
        width: number;
        height: number;
    },
}

export const GameReels: FC<Props> = memo(({canvasSize}) => {
    const reelsContainerWidth = getReelsContainerWidth();
    const reelHeight = getReelHeight();
    const { reels = [] } = useSelector((state: RootState) => state.game);

    const containerY = canvasSize.height/2 - reelHeight/1.5;

    const containerX = (canvasSize.width - reelsContainerWidth) / 2;

    return (
        <Container y={containerY} x={containerX} width={reelsContainerWidth} height={reelHeight}>
            {
                reels.map((reel, i)=> (
                    <GameReel
                        key={i}
                        reel={reel}
                        xx={getReelX(i)}
                        reelIndex={i}
                        canvasSize={canvasSize}
                    />
                ))
            }
        </Container>
    );
})