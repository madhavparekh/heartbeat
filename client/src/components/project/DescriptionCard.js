import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";

const styles = () => ({
  card: {
    // maxWidth: "90%",

    // display: "flex",
    justifyContent: "center",
    margin: "20px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  img: {
    justifyContent: "center",
  },
  //   avatar: {

  //   },
});

class DescriptionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title="Project Description" subheader="" />
        <CardContent
          style={{
            justifyContent: "center",

            marginBottom: "20px",
            marginLeft: "12px",
            marginRight: "12px",
          }}
        >
          <Typography component="p" paragraph>
            When you go to the doctor and (s)he wants to know the strength of
            your heart, (s)he orders a cardiograph, which shows the your
            heartbeat as the seconds pass. Similarly, when we analyze rivers, we
            build “hydrographs” which in a very figurative analogy, hydrographs
            are the cardiographs of a river. A cardiograph show your heartbeat
            in five or ten seconds, however, river have a longer pace, their
            heartbeat cycle is not a few seconds but an entire year. Let’s start
            with a basin that I know pretty well, the Rio Grande basin (also
            known in Mexico as the Rio Bravo). We will call it the RGB for Rio
            Grande/Bravo. In its natural form, it had three main type of beats:
          </Typography>
          <Typography>
            1) In the northern portion of the basin (called the northern
            branch), from its headwaters all the way to Presidio, the river had
            a snowmelt heartbeat (you can also call it pulse), meaning that the
            high flow of water responded to the melt of snow in Colorado, in the
            San Juan Mountains (close to Lobatos). This is a clear signature
            where there were low flows in fall and winter, but then in spring
            where snow start melting, the river has large flows all the way into
            the summer. See the figure below, this was the natural heartbeat
            (natural flow regime) of the RGB, the navy blue line shows the
            “average” heartbeat in any given year (in fact is the median
            heartbeat, or the 50% probability of the streamflow), but as all of
            us humans, the heartbeat changed every year, which is shown in the
            shaded light blue area, some year the river did not have much water
            (lower bound) and some year it had a lot of water (upper bound).
          </Typography>
          <img src="../../static/images/NaturalHydrology_NorthernBranch.png" />
          <Typography>
            2) In the Rio Conchos, the natural heartbeat (natural flow regime)
            is driven by hurricanes coming from the Pacific and the Gulf of
            Mexico during summer (Figure below on the right). Hurricanes brought
            heavy precipitation, thus the flow has higher variability in the
            summer months [July (J), August (A), September (S) and October(O)]
            and very small flow in the remaining months. Because of this, the
            natural heartbeat (natural flow regime) had a monsoon driven
            (hurricane driven) signature.
          </Typography>
          <img src="../../static/images/2image.png" />
          <Typography>
            3) The Rio Conchos (middle hydrograph on the left named Rio Conchos)
            brings a different natural heartbeat signature (natural flow regime)
            to the southern branch of the basin. As you can see in the figure
            below, the RGB streamflow above the confluence of the Rio Conchos
            had the snowmelt natural flow regime signature (hydrograph on the
            top named RGB above Conchos and orange line in the bottom-right
            hydrograph), and just below their confluence (hydrograph called RGB
            below Rio Conchos) the natural heartbeat (the natural flow regime)
            was a mixture of snomelt and monsoon driven signatures (hydrograph
            in the bottom right, orange snowmelt signature and blue monsoon
            sinature). Also notice that both of them are about the same
            magnitude, both of them have the same importance but they appeared
            at different times of the year. This made the RGB a very exotic
            basin, meaning that in some part of the year, in the middle of the
            desert, water in the RGB was very cold coming directly from
            snowmelt, and in other times, water was not as cold but with high
            variability because of hurricanes, coll!!!
          </Typography>
          <img src="../../static/images/NaturalHydrology_SouthernBranch.png" />
          <Typography>
            From this portion of the river and all the way to the outlet (RGB
            below Devils River, at Roma and at Brownsville), the RGB will have
            this natural heartbeat (natural flow regime) composed by two
            signatures, snowmelt and monsoon.
          </Typography>
          <img src="../../static/images/NaturalHydrology_SouthernBranch.png" />
          <Typography>
            <h3>Recent heartbeat of the RGB</h3>
            The previous hydrographs are a summary of streamflow from 1900 to
            1913. As time passed, us, humans, started diverting water for
            different activities (cities, agriculture) and building
            infrastructure (reservoir and canals). These activities highly
            altered the natural heartbeat of the RGB basin. In the northern
            Branch of the RGB, the recent hydrology (red hydrographs) show that
            the natural flows hjas been heavily depleted. In the southern branch
            it has occurred the same, the natural flow regime has also been
            depleted, for example, in the outlet, the river has almost
            flat-lined. This is a great analogy, because the ecosystems (trees,
            bushes, fishes, invertebrates, mammals and amphibians) that lived in
            the riparian corridor are disappearing. These creatures evolved and
            were adapted to the natural flow regime and as the natural flow
            regime is vanishing, so do they.
          </Typography>
          <img src="../../static/images/RecentHydrology_NorthernBranch.png" />
        </CardContent>
      </Card>
    );
  }
}

DescriptionCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DescriptionCard);
