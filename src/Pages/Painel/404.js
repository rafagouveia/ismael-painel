import React, {Component} from "react";
import {withStyles, Paper} from "@material-ui/core";
import Error from "../../assets/error-404.png"
import Typography from "@material-ui/core/Typography";
const styles = theme => ({
   root: {
       display: "flex",
       flexWrap: "wrap",
       padding: 50
   },
    logoError: {

    }
});
class ErrorPage extends Component{
    render() {
        const {classes} = this.props;
        return(
            <Paper>
                <div className={classes.root}>
                    <div className={classes.logoError}>
                        <img src={Error} width="50%"  alt="Alt Blank"/>
                    </div>
                    <Typography variant="h6" component="p" gutterBottom>
                        Essa página não foi encontrada, ela pode ter sido removida, alterada ou não existe.
                        Por favor tenha certeza que está acessando a página correta.
                    </Typography>
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(ErrorPage)