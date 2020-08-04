import {IFrontCounterMapDispatchToProps, IFrontCounterMapStateProps, ReduxCounter} from "./ReduxCounter"
import {connect} from "react-redux"
import {Action} from "redux"
import {ActionType} from "../../actions/ActionType"
import {fetchCounter, saveCounter} from "../../actions/counter"
import {IAppState} from "../../reducers/types"

const mapStateToProps = (state: IAppState): IFrontCounterMapStateProps => {
    return ({
        counter: state.counter.value
    })
}

// TODO add type for dispatch
const mapDispatchToProps = (dispatch: any): IFrontCounterMapDispatchToProps => ({
    onClick: () => dispatch({
        type: ActionType.COUNTER_INCREMENT
    } as Action),
    loadInitData: () => dispatch(fetchCounter()),
    onSave: () => dispatch(saveCounter())
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxCounter)