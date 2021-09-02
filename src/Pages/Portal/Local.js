import React, { Component} from "react";
import {Grid, Paper, withStyles} from '@material-ui/core';


const styles = ({
    paddingPage: {
        background: '#0539ff',
        padding: 50
    },
    papers: {
        padding: 30
    }
});

class Local extends Component{
    render() {
        const {classes} = this.props;
        return (
            <>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.paddingPage}
                >
                    <Paper className={classes.papers}>
                        <div> ISMAEL PRÉ-MOLDADOS E MATERIAIS DE CONSTRUÇÕES</div>
                        <div>
                            EM BREVE! Aqui ficará a historia da empresa, esse texto é apenas informativo e com o intuito de testar a area
                            para que se possar ter melhor entendimento na hora do desenvolvimento, essa informações serão alteradas pelo proprio
                            desenvolvedor.
                        </div>

                    </Paper>
                </Grid>
            </>
        )
    }
}

export default withStyles(styles)(Local);