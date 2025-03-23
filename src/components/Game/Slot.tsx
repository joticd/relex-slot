import { useCallback, useEffect, useState } from "react";
import { getCanvasSize } from "../../utils/helpers";
import { GameReels } from "./GameReels";
import { loadAssets } from "../../utils/preloader";
import { StageRedux } from "../Bridge/StageRedux";
import { Sprite } from "@pixi/react";

export const Slot = () => {
  const [canvasSize, setCanvasSize] = useState(getCanvasSize());
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const updateCanvasSize = useCallback(() => {
    setCanvasSize(getCanvasSize());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateCanvasSize);

    const loadGameAssets = async () => {
      try {
        await loadAssets();
        setAssetsLoaded(true);
      } catch (error) {
        console.error("Faild to load", error);
      }
    };
    loadGameAssets();

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  if (!assetsLoaded) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <StageRedux width={canvasSize.width} height={canvasSize.height}>
      <Sprite
        image={"background"}
        width={canvasSize.width}
        height={canvasSize.height}
        x={0}
        y={0}
      />
      <GameReels canvasSize={canvasSize} />
    </StageRedux>
  );
};
