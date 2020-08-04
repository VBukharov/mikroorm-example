import * as React from 'react'
import {useEffect} from "react"

interface IFrontCounterMapStateProps {
    counter: number;
}

interface IFrontCounterMapDispatchToProps {
    onClick: () => void
    loadInitData: () => void
    onSave: () => void
}

const ReduxCounter: React.FunctionComponent<IFrontCounterMapStateProps & IFrontCounterMapDispatchToProps> = (props) => {
    useEffect(() => {
        props.loadInitData()
    }, []);

    return (
        <div>
            <h3>Redux state based Counter</h3>
            <p>You clicked {props.counter} times</p>
            <button onClick={props.onClick}>
                Click me
            </button>
            <button onClick={props.onSave}>
                Save increment
            </button>
        </div>
    )
}


export {ReduxCounter, IFrontCounterMapStateProps, IFrontCounterMapDispatchToProps}
