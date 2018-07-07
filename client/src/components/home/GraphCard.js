import React from "react";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import GeneralFlow from "../generalFlow/Layout"
import StaticGraph from "../staticGraph/Layout"
import FlowData from "../../containers/FlowData";

class GraphCard extends React.Component{
  
  render() {
    return(
      <Card>
        <CardContent>
          <h1>Graph Card</h1>
            {/* <GeneralFlow
              width={960}
              height={600}
              forceStrength={-10}
             /> */}
             <StaticGraph />
             <FlowData />
        </CardContent>
      </Card>
    );
  }  
}
export default GraphCard;
