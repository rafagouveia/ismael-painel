import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Button,
    Checkbox,
    CssBaseline,
    FormControl,
    FormControlLabel,
    LinearProgress,
    Paper,
    TextField,
    Typography,
    FormHelperText,
    withStyles
} from "@material-ui/core";
import LockIcon from '@material-ui/icons/LockOutlined';
import {connect} from "react-redux";
import * as actions from "../../Redux/actions";
import {Redirect} from "react-router-dom";

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    barProgress: {
        marginTop: 20
    },
    mainScreenLogin: {

        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: false,
                password: false,
                remember: false
            },
            error: false
        };

    }


    handleLoginButton = () => {
        const init = {
            url: '/login',
            data: this.state.form
        };
        this.props.checkAll(init.url, init.data);
    };
    handleInputs = (ev) => {
        const {form} = this.state;
        form[ev.target.name] = ev.target.value;
    };
    render() {
        const {classes, returnLogin} = this.props;
        const session = JSON.parse(localStorage.getItem('SESSION'));
        if(returnLogin.logged){
            return (
                <Redirect to="/painel" />
            )
        }
        return (
            <>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper} elevation={5}>
                        {this.props.returnLogin.loading &&
                        <LinearProgress className={classes.barProgress}/>
                        }
                        <div className={classes.mainScreenLogin}>
                            <Avatar className={classes.avatar}>
                                <LockIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h4">
                                Entrar no Painel
                            </Typography>
                            <FormControl required fullWidth>
                                <TextField
                                    onChange={this.handleInputs}
                                    id="username"
                                    label="Nome de Usuario"
                                    name="username"
                                    required
                                    error={returnLogin.status === "error"}
                                    disabled={returnLogin.loading}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    onChange={this.handleInputs}
                                    id="password"
                                    label="Senha"
                                    required
                                    name="password"
                                    error={returnLogin.status === "error"}
                                    disabled={returnLogin.loading}
                                    className={classes.textField}
                                    type="password"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox disabled={returnLogin.loading} value="remember"
                                                   color="primary"/>}
                                label="Lembrar da senha"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                disabled={this.props.returnLogin.loading}
                                onClick={this.handleLoginButton}
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Entrar
                            </Button>
                        </div>
                    </Paper>
                </main>
            </>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    returnLogin: state.checkLogin,
});

export default connect(mapStateToProps, actions)(withStyles(styles)(Login))
