import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Balance = () => {
    const { balance } = useSelector((state: RootState) => state.game);
    return (
        <div className="full bottom-el  balance-width">
            <p className="bet-label glow-text text-center mb-05">Balance</p>
            <p className="text-display full balance-width">{balance}</p>
        </div>
    );
}