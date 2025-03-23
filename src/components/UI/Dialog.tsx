import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Dialog = () => {
    const { winAmount, showModal } = useSelector((state: RootState) => state.game);

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(()=>{
        if(!dialogRef.current) return;

        if(showModal) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }

       
    }, [showModal]);

    return (
        <dialog ref={dialogRef}>
            <div>
            <p className="bet-label glow-text text-center mb-05">You won</p>
            <p className="text-display full balance-width">{winAmount}</p>
            </div>
        </dialog>
    );
};