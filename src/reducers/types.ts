import {Action} from "redux"

interface IAppState {
    counter: ICounterState
}

interface ICounterState {
    value: number
}

export {
    IAppState,
    ICounterState
}
