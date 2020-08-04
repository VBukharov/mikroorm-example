import {CounterAction} from "../actions/types"
import {ActionType} from "../actions/ActionType"
import {combineReducers} from "redux"
import {ICounterState} from "./types"

const initialState = (): ICounterState => ({
    value: 0
});

const counterReducer = (state: ICounterState = initialState(), action: CounterAction): ICounterState => {
    console.debug(`action ${action.type}, state: `, state)
    switch (action.type) {
        case ActionType.COUNTER_INCREMENT:
            return ({
                value: ++state.value
            })
        case ActionType.COUNTER_INIT:
            return {
                value: action.value
            }
        default:
            return state;
    }
}

// TODO add types
const rootReducer = combineReducers({
    counter: counterReducer
});

export {rootReducer}
