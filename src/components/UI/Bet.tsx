import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setBet } from "../../store/slices/gameSlice";

export const Bet = () => {
  const dispatch = useAppDispatch();
  const { bet, betOption, balance } = useSelector((state: RootState) => state.game);

  const increase = () => {
    if(balance < (bet + betOption)) return;

    dispatch(setBet(bet + betOption));
  }
  const decrease = () => {
    if((bet - betOption) < 1) return;
    dispatch(setBet(bet - betOption));
  }

  return (
    <div className="flex-row bottom-el">
      <button type="button" className="display-btn bet-btn" onClick={decrease}>
        -
      </button>
      <div>
        <label className="label-block full bet-label glow-text mb-05">BET</label>
        <input type="number" className="full input-field" value={bet} readOnly/>
      </div>
      <button type="button" className="display-btn bet-btn" onClick={increase}>
        +
      </button>
    </div>
  );
};
