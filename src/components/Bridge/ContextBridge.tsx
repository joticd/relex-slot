import { ReactNode, Context as ReactContext } from "react";

interface Props<T> {
    children: ReactNode;
    Context: ReactContext<T>;
    render: (children: ReactNode) => ReactNode;
}

export const ContextBridge =<T,>({children, Context, render}: Props<T>) => {
    return (
        <Context.Consumer>
            {(value) => render(<Context.Provider value={value}>{children}</Context.Provider>)}
        </Context.Consumer>
    );
}