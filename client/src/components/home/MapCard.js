import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  mapCard: {
    maxWidth: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    width: 500,
    height: 500,
  }
};

class MapCard extends React.Component {
  // const { classes } = props;
  //   const bull = <span className={classes.bullet}>•</span>;

  render() {
    return (
      <div className="mapCard">
        <Card>
          <CardContent>
            {/* <Typography color="textSecondary">Map of the Rio Grande</Typography>
            <Guage /> */}
            <div className={styles.row}>
              <Typography variant="display1">Under Construction</Typography>
              <Avatar
                alt="HeartBeatLogo"
                src="../../HeartBeatLogo.jpg"
                className={styles.avatar}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(MapCard);
