import {Action} from "redux"


interface ISetCounterAction extends Action {
    value: number
}

type CounterAction = Action & ISetCounterAction;

export  {
    CounterAction,
    ISetCounterAction
}