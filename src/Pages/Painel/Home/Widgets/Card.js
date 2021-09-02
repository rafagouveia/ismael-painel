import React, {Component} from "react";
import {Card, CardContent, withStyles} from "@material-ui/core";


const styles = () => ({
    card: {
        minWidth: 230,
        margin: 13,
        flexGrow: 1,
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    },
    paddingRoot: {
        padding: 13
    },
    cardContent: {
        display: 'flex',
        '&:last-child': {
            padding:0
        }
    },
    media: {
        padding: 13,
        backgroundColor: 'black',
        color: 'white'
    },
    icon: {
        fontSize: 58,
        color: 'white',
        background: 'black',
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        padding: 13,
    },
    title: {
        fontSize: 16,
        color: '#635f5f',
    },
    subtitle: {
        fontSize: 22,
        color: '#353535'
    }
});
class Cards extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card} elevation={5}>
                <CardContent className={classes.cardContent}>
                   <div className={classes.media}>
                       {this.props.media}
                   </div>
                    <div className={[classes.info]}>
                        <span className={classes.title}>
                            {this.props.title}
                        </span>
                        <span className={classes.subtitle}>
                            {this.props.value}
                        </span>
                    </div>

                </CardContent>
            </Card>
        )
    }
}



Cards.propTypes = {};
Cards.defaultPropTypes = {
  media: '',
  bg: 'black',
  title: '',
  value: '',
};


export default withStyles(styles)(Cards);