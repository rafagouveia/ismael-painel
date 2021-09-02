import React, {Component} from "react";
import {Paper, withStyles, TextField} from '@material-ui/core';
import ReIcon from "./../../ReIcon/";

const styles = ({
    paddingPage: {
        background: '#0539ff',
    },
    papers: {
        margin: 50,
        padding: 30
    }
});

class Contato extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            assunto: "",
            message: ""
        }
    }

    handleChange = name => event => {
        console.log(event.target);
        this.setState({
            [name]: event.target.value
        })
    };

    render() {
        const {classes} = this.props;
        return (
            <>
                <div className="page-content">
                    <div className="page-grid">
                        <div className="row infos">


                            <div className="mini-card">
                                <ReIcon size={23} variant="round">phone_in_talk</ReIcon>
                                <div className="media-body">
                                    <span>Telefone:</span>
                                    <span className="tel">
                                        (83) 99884-8888
                                    </span>
                                </div>
                            </div>
                            <div className="mini-card">
                                <ReIcon size={23} variant="round">map</ReIcon>
                                <div className="media-body">
                                    <span>Endereço:</span>
                                    <span className="tel">
                                        Av. Barão de Mamaguape - Torre - João Pessoa - PB
                                    </span>
                                </div>
                            </div>
                            <div className="mini-card">
                                <ReIcon size={23} variant="round">mail</ReIcon>
                                <div className="media-body">
                                    <span>E-mail:</span>
                                    <span className="tel">
                                       contato@ismaelpremoldados.com.br
                                    </span>
                                </div>
                            </div>
                            <div className="mini-card">
                                <ReIcon size={23}>alternate_email</ReIcon>
                                <div className="media-body">
                                    <span>Redes Sociais:</span>
                                    <span className="tel">
                                       Em Breve
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className="row contact-form">

                            <div className="page-header">
                                <div className="page-title">
                                    Contato
                                </div>
                                <div className="page-subtitle">
                                    Envie uma mensagem ou ligue para nosso telefone.
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-item">
                                    <TextField
                                        id="standard-name"
                                        label="Nome Completo"
                                        fullWidth
                                        className={classes.textField}
                                        value={this.state.name}
                                        onChange={this.handleChange('name')}
                                        margin="normal"
                                    />
                                </div>
                                <div className="form-item">
                                    <TextField
                                        id="standard-name"
                                        label="E-mail"
                                        fullWidth
                                        className={classes.textField}
                                        value={this.state.email}
                                        onChange={this.handleChange('email')}
                                        margin="normal"
                                    />
                                </div>
                                <div className="form-item">
                                    <TextField
                                        id="standard-name"
                                        label="Assunto"
                                        fullWidth
                                        className={classes.textField}
                                        value={this.state.assunto}
                                        onChange={this.handleChange('assunto')}
                                        margin="normal"
                                    />
                                </div>
                                <div className="form-item">
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Sua Mensagem"
                                        multiline
                                        fullWidth
                                        rows={2}
                                        className={classes.textField}
                                        value={this.state.message}
                                        onChange={this.handleChange('message')}
                                        margin="normal"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default withStyles(styles)(Contato);