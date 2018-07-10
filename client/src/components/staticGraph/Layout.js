import React from "react";
import PropTypes from 'prop-types';
import StaticGraph from "./StaticGraph";
import { cloneDeep } from 'lodash';

class Layout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
            plotted: false,
            viewPortData : [],
            count: 300,

        }
    }

    componentDidUpdate() {
        if(!this.state.plotted && this.props.data.length > 1){

            this.countdown = setInterval(() => this.calculateViewPortData(), 5)
            this.setState({ plotted: true })
        }
    }

    componentWillUnmount() {
        clearInterval(this.countdown);
    }



    static getDerivedStateFromProps(props,state) {
        if(!state.plotted){
            return {
                viewPortData: props.data.slice(0, 300)
            }
        }
       
    }

    calculateViewPortData() {
        if(this.state.viewPortData.length > 1){
            const currentData = cloneDeep(this.state.viewPortData)
            const newData = currentData.slice(1, currentData.length)
            newData.push(this.props.data[this.state.count])
            this.setState({viewPortData: newData, count: this.state.count + 1})
        
        }
    }

    render() {
        return <StaticGraph data={this.state.viewPortData} /> 
    }
}



Layout.propTypes = {
    data: PropTypes.array,
};

export default Layout