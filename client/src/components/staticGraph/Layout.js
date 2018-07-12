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
            compareViewPortData: [],
            count: 200,
            currentFlowDataName: 'impaired',
            compareFlowDataName: 'unImpaired'
        }
    }

    componentDidUpdate() {
        if ((!this.state.plotted && this.props.data.length > 1) || this.props.currentFlowDataName !== this.state.currentFlowDataName) {
            
            this.countdown = setInterval(() => this.calculateViewPortData(), 10);
            this.setState({ plotted: true, currentFlowDataName: this.props.currentFlowDataName});

        }
    }

    componentWillUnmount() {
        clearInterval(this.countdown);
    }



    static getDerivedStateFromProps(props,state) {
        if(props.compareData.length > 1 && props.data.length > 1 && state.count === 200){
            return {
                viewPortData: props.data.slice(0, 200),
                compareViewPortData: props.compareData.slice(0,200)
            }
        }
        return null
       
    }

    calculateViewPortData() {
        if(this.state.viewPortData.length > 1 && this.state.count < 202){
            //current selection data
            const currentData = cloneDeep(this.state.viewPortData)
            const newData = currentData.slice(1, currentData.length)
            newData.push(this.props.data[this.state.count])

            console.log(newData)
            //compare selection data
            
            const currentCompareData = cloneDeep(this.state.compareViewPortData);
            const newCompareData = currentCompareData.slice(1, currentCompareData.length);
            newCompareData.push(this.props.compareData[this.state.count]);


            if(this.state.count === this.props.data.length - 1){
                return null
            }
            this.setState({viewPortData: newData, count: this.state.count + 1})
        
        }
    }

    render() {
        if(!this.props.data || this.props.data.length < 1){
            return null}
        return <StaticGraph data={this.state.viewPortData} compareData={this.state.compareViewPortData} compareFlowDataName={this.props.compareFlowDataName} currentFlowDataName={this.props.currentFlowDataName} />; 
    }
}



Layout.propTypes = {
  data: PropTypes.array,
  compareData: PropTypes.array,
  compareViewPortData: PropTypes.array,
  currentFlowDataName: PropTypes.string,
  compareFlowDataName: PropTypes.string,
};

export default Layout