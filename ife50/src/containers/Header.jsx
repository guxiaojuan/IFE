import React from 'react'
import {connect} from 'react-redux'
import {inc, dec} from "../redux/actions/counter"

// React component

class Counter extends React.Component {
    componentDidMount() {
        const { counter,counts, increment, decrement } = this.props
        console.log('-------------')
        console.log(this.props)
        console.log(counter)
    }
    render() {
        const {counter,counts, increment, decrement} = this.props
        return (
            <div>
                <span>Welcome to React</span>
                <p>{counter.counts}</p>
                <div>
                    <h1 onClick={increment}> {counter.counter} </h1>
                    <button onClick={decrement}>click me</button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        state,
        counter: state.counter,
        counts:state.counts
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return{
        increment: () => {
            dispatch(inc())
        },
        decrement: () => {
            dispatch(dec())
        }
    }
}

Counter = connect(mapStateToProps, mapDispatchToProps)(Counter)
export default Counter



