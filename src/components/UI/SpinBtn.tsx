import { useSelector } from "react-redux";
import { RootState, store } from "../../store/store";
import { pixiSprites, startSpin } from "../../store/slices/gameSlice";
import { animateSpin } from "../../store/thunk/gameThunk";
import { useAppDispatch } from "../hooks/useAppDispatch";

export const SpinBtn = () => {
    const dispatch = useAppDispatch();
    const { balance, bet, isSpinning } = useSelector((state: RootState) => state.game);
    const disabled = isSpinning || balance < bet;

    const handleSpin = () => {

        if(isSpinning || balance < bet) return;

        dispatch(startSpin());
        
        const currentState = store.getState();
        const symbolsPosition = currentState.game.symbolsPosition;

        dispatch(animateSpin({
            pixiSprites,
            symbolsPosition
        }));
        
    }
    return (
        <div>
            <button 
                type="button" 
                className="display-btn spin-btn"
                disabled={disabled}
                onClick={handleSpin}

            >
                Spin
            </button>
        </div>
    );
}

