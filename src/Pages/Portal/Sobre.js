import React, { Component} from "react";
import {Grid, Paper, withStyles} from '@material-ui/core';
import Map from "./maps";

const styles = ({
    paddingPage: {
        background: '#0539ff',
    },
    papers: {
        padding: 30
    }
});

class Sobre extends Component{
    render() {
        const {classes} = this.props;
        return (
            <>
                <div className="about-page">
                    <div className="about-header">
                        <h3>ISMAEL E CRIS PRÉ-MOLDADOS</h3>
                        <span>Sobre a melhor empresa de pré-moldados da região!</span>
                    </div>
                    <div className="about-content">
                        <div className="content-header">
                            <h2> Sobre Nossa Empresa!</h2>
                        </div>
                        <div className="about-description">
                            Nós somos frabricadores de pré-moldados mais tradicional da região, fabricamos para diversas empresas, também fabricamos em unidades para atender conforme o consumir,
                            de grande e pequena escala.
                            Estamos sempre evoluindo e trazendo novos modelos e formas de fabricar nossos materiais, somos uma tradicional empresa do ramo.
                            Continuaremos crecendo juntos!
                        </div>


                        <div className="location">
                            <Map
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withStyles(styles)(Sobre);