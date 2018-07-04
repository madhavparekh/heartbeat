import React from "react";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import GeneralFlow from "../generalFlow/Layout"

class GraphCard extends React.Component{
  
  render() {
    return(
      <Card>
        <CardContent>
          <h1>Graph Card</h1>
          <svg width="960" height="600">
            <GeneralFlow />
          </svg>  
        </CardContent>
      </Card>
    );
  }  
}
export default GraphCard;
