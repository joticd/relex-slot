
import { Balance } from "./Balance";
import { Bet } from "./Bet";
import { SpinBtn } from "./SpinBtn";
import { Dialog } from "./Dialog";

export const BottomBar = () => {

  return (
    <div className="bottombar flex-row bottombar-align">
      <Dialog />
      <Bet />
      <Balance />
      <SpinBtn />
    </div>
  );
};
