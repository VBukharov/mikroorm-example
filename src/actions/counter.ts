import {dictionaryService} from "../backend/service/dictionary-service"
import {ActionType} from "./ActionType"
import {ISetCounterAction} from "./types"
import {IAppState} from "../reducers/types"


const setCounter = (value: number): ISetCounterAction => ({
    type: ActionType.COUNTER_INIT,
    value
})

const fetchCounter = () => {
    // TODO add type for dispatch
    return (dispatch: any, getState: () => IAppState) => {
        dictionaryService.getValue("counter")
            .then(value => {
                dispatch(setCounter(value))
            })
    }
}

const saveCounter = () => {
    return (dispatch: any, getState: () => IAppState) => {
        dictionaryService.updateValue("counter", getState().counter.value)
            .then(value => {
                alert("Value is saved");
            })
    }
}

export {fetchCounter, saveCounter}