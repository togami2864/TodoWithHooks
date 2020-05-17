import React, { Component } from 'react';
import { Animate } from 'react-move';

class AnimatedProgressProvider extends Component {
    state = {
        isAnimated: false,
    };

    static defaultProps = {
        valueStart: 0,
    };

    componentDidMount() {
        this.setState({
            isAnimated: true,
        });
    }

    render() {
        return (
            <Animate
                start={() => ({
                    value: this.props.valueStart,
                })}
                update={() => ({
                    value: [this.state.isAnimated ? this.props.valueEnd : this.props.valueStart],
                    timing: {
                        duration: this.props.duration * 1000,
                        ease: this.props.easingFunction,
                    },
                })}
            >
                {({ value }) => this.props.children(value)}
            </Animate>
        );
    }
}

export default AnimatedProgressProvider;
