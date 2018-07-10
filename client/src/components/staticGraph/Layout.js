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
            count: 364,
            currentFlowDataName: 'impaired'
        }
    }

    componentDidUpdate() {
        if ((!this.state.plotted && this.props.data.length > 1) || this.props.currentFlowDataName !== this.state.currentFlowDataName) {
            this.countdown = setInterval(() => this.calculateViewPortData(), 5);
            this.setState({ plotted: true, currentFlowDataName: this.props.currentFlowDataName});
        }
    }

    componentWillUnmount() {
        clearInterval(this.countdown);
    }



    static getDerivedStateFromProps(props, state) {
        if(!state.plotted && props.data){
            return {
                viewPortData: props.data.slice(0, 364)
            }
        }
        return null
       
    }

    calculateViewPortData() {
        if(this.state.viewPortData.length > 1){
            const currentData = cloneDeep(this.state.viewPortData)
            const newData = currentData.slice(1, currentData.length)
            newData.push(this.props.data[this.state.count])
            if(this.state.count === this.props.data.length - 1){
                return null
            }
            this.setState({viewPortData: newData, count: this.state.count + 1})
        
        }
    }

    render() {
    
        if(!this.props.data || this.props.data.length < 1){
            return null}
        return <StaticGraph data={this.state.viewPortData} currentFlowDataName={this.props.currentFlowDataName} />; 
    }
}



Layout.propTypes = {
    data: PropTypes.array,
    currentFlowDataName: PropTypes.string,

};

export default Layout