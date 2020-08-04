import * as React from 'react'
import {Component, CSSProperties} from 'react'
import {dictionaryService} from "../../backend/service/dictionary-service";

interface IProps {
    count: number
}

export class FrontCounter extends Component<{}, IProps> {
    constructor(props: IProps) {
        super(props);
        this.state = {count: 0};
    }

    componentDidMount() {
        dictionaryService
            .getValue('counter')
            .then((result: number) => this.setState({count: result}));
    }

    setCount = () => {
        dictionaryService
            .updateValue('counter', this.state.count + 1)
            .then(
                async () => {
                    const result = await dictionaryService.getValue('counter');
                    this.setState({count: result});
                }
            );
    }

    resetCount = () => {
        dictionaryService
            .updateValue('counter', 0)
            .then(
                async () => {
                    const result = await dictionaryService.getValue('counter');
                    this.setState({count: result});
                }
            )
    }

    render() {
        return (
            <div>
                <h3>Internal React state based Counter</h3>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.setCount}>
                    Click me
                </button>
                <button onClick={this.resetCount}>
                    Reset
                </button>
            </div>
        );
    }

}
