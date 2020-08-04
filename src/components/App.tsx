import * as React from 'react'
import ReduxCounter from "./redux-counter/ReduxCounter.container"
import {Link, Route, Switch} from "react-router-dom";
import {HomePage} from "./home/HomePage"
import {FrontCounter} from "./state-counter/FrontCounter"
import {RoutePaths} from "./RoutePaths"

interface IProps {
}

// Create main App component
const App: React.FunctionComponent<IProps> = (props: IProps) => (
    <div>
        <div>
            <h1>Test App</h1>
        </div>

        <nav>
            <ul>
                <li>
                    <Link to={RoutePaths.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={RoutePaths.FRONT_COUNTER}>Front counter</Link>
                </li>
                <li>
                    <Link to={RoutePaths.REDUX_COUNTER}>Redux counter</Link>
                </li>
            </ul>
        </nav>

        <Switch>
            <Route path={RoutePaths.FRONT_COUNTER}>
                <FrontCounter/>
            </Route>
            <Route path={RoutePaths.REDUX_COUNTER}>
                <ReduxCounter/>
            </Route>
            <Route path={RoutePaths.HOME}>
                <HomePage/>
            </Route>
        </Switch>

    </div>
)

// Export the App component
export {App}
