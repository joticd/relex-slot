import { FC, ReactNode } from "react";
import { ContextBridge } from "./ContextBridge";
import { ReactReduxContext } from "react-redux";
import { Stage } from "@pixi/react";

interface Props {
    width: number;
    height: number;
    children: ReactNode;    
}

export const StageRedux:FC<Props> = ({children, ...props}) => {
    return (
        <ContextBridge
            Context={ReactReduxContext}
            render={
                (children) => <Stage {...props}>{children}</Stage>
            }
        >
            {children}
        </ContextBridge>
    );
}