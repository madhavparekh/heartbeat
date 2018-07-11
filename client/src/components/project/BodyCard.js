import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";
import DescriptionCard from "./DescriptionCard";
import ResearchCard from "./ResearchCard";
import TechCard from "./TechCard";

const styles = {
  descCard: {
    marginLeft: 5,
    marginRight: 5,
  },
  middleCards: {
    // padding: 2,
    marginTop: 5,
    marginLeft: 2,
    marginRight: 5,
    marginBottom: 5,
  },
  mapCard: {
    marginLeft: 5,
    // marginRight: 4,
  },
  viewCard: {
    // padding: 2,
    // marginLeft: 4,
    marginRight: 5,
    // marginLeft: "auto",
  },
  graphCard: {
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class BodyCard extends React.Component {
  render() {
    return (
      <div>
        <Grid item xs={12}>
          <Card className={styles.card}>
            <CardContent>
              <Grid container spacing={8}>
                <Grid item xs={12} className={styles.descCards}>
                  <DescriptionCard />
                </Grid>

                <Grid item xs={6} className={styles.mapCard}>
                  {/* import Research Team */}
                  <ResearchCard />
                </Grid>
                <Grid item xs={6} className={styles.viewCard}>
                  {/* import Technology Team */}
                  <TechCard />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

BodyCard.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default withStyles(styles)(BodyCard);
