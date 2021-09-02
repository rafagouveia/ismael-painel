import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Button, Grid, Grow, Toolbar, Typography, CssBaseline} from "@material-ui/core";

import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import Logo from "../../assets/logo-color.png";
import LogoWhite from "../../assets/logo-white1.png";

import PortalProductList from "./listProducts";
import PortalProducts from "./products"
import Contato from "./Contato";
import Local from "./Local";
import Sobre from "./Sobre";
import {Link, Route} from "react-router-dom";
import api from "./../../services/api";
import ReIcon from "../../ReIcon";


const menulist = [
    {
        name: "INICIO",
        link: "/"
    },
    {
        name: "CONTATO",
        link: "/contato"
    },
    {
        name: "SOBRE",
        link: "/sobre"
    },
];
const footers = [
    {
        title: 'Contato',
        description: ['(83) 99884-8888', 'ismael@gmail.com', 'Barão de Mamaguape - Torre', 'João Pessoa - PB'],
    },
];
const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    appBar: {},
    logoImage: {
        width: '200px'
    },
    layout: {
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 10}px ${theme.spacing.unit * 6}px ${theme.spacing.unit * 10}px`,
    },
    growPadding: {
        flexGrow: 1,
        padding: 76,
        paddingTop: 200
    },
    logoBar: {
        display: 'flex',
        backgroundColor: 'white',
        color: 'black',
        alignItems: "center",
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: 40,
        paddingRight: 40,
        justifyContent: "space-around"
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: '',
    },
    search: {
        position: 'relative',
        display: 'flex',
        color: '#828282',
        borderRadius: 38,
        boxShadow: '0 0 3px 0px #0000002e',
        backgroundColor: fade(theme.palette.common.black, 0.08),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.12),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainFeaturedPost: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4,
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    loginButton: {
        backgroundColor: '#3f51b5',
        color: 'white',
        boxShadow: '#0000004d 0px 0px 5px',
        transition: 'all .3s',
        '&:hover': {
            backgroundColor: 'hsl(231, 74%, 54%)',
            transform: 'translateY(-2px)'
        }
    },
    logoFooter: {
        display: "flex",
        paddingLeft: 50,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center",
        width: 150,

    },
    footerBar: {
        backgroundColor: "#1d1d1d",
    }
});

class Portal extends Component {
    constructor(props) {
        super(props);
        this.state = {products: [], loaded: false}
    }

    componentDidMount() {
        api.post('')
            .then((response) => {
                console.log(response.data);
                this.setState({products: response.data, loaded: true});

            })
            .catch((error) => {
                console.log(error)
            });
    }
    toggleMenu = (e) => {
       let button = document.getElementsByClassName('ul-menu')[0];
       let backdrop = document.getElementsByClassName('backdrop')[0];
       button.classList.toggle('open');
       backdrop.classList.toggle('active');
    }
    dropClick = (e) => {
        let button = document.getElementsByClassName('ul-menu')[0];
        let backdrop = document.getElementsByClassName('backdrop')[0];
        button.classList.toggle('open');
        backdrop.classList.toggle('active');
    }
    render() {
        const {classes, match} = this.props;
        const switchPage = (match) => {
            switch (match.path) {
                case "/produto/:id":
                    return <Route component={(props) => <PortalProducts {...props} response={this.state}/>}/>;
                case "/contato":
                    return <Route component={Contato}/>;
                case "/sobre":
                    return <Route component={Sobre}/>;
                default:
                    return <Route component={() => <PortalProductList response={this.state}/>}/>;
            }
        };
        return (
            <div className={classes.root}>
                <header className="menu-bar">
                    <div className="nav-logo">
                        <img className={classes.logoImage} src={Logo} alt=""/>
                        <div id="menu-toggle" onClick={this.toggleMenu}>
                            <ReIcon size={23}>menu</ReIcon>
                        </div>

                    </div>

                    <nav>

                        <ul className="ul-menu">
                            {menulist.map((item, index) =>
                                <Button component={Link} to={item.link}
                                        color="inherit">
                                    <li><span>{item.name}</span></li>
                                </Button>
                            )}
                        </ul>
                    </nav>
                </header>
                <main>
                    {switchPage(match)}
                </main>
                <footer className="page-footer">

                    <Grid className={classes.footerBar}>
                        <img className={classes.logoFooter} src={LogoWhite} alt=""/>
                    </Grid>

                    <Grid className={classes.layout} container justify="space-evenly">
                        {footers.map(footer => (
                            <Grid item xs key={footer.title}>
                                <Typography variant="h6" color="inherit" gutterBottom>
                                    {footer.title}
                                </Typography>
                                {footer.description.map(item => (
                                    <Typography key={item} variant="subtitle1" color="inherit">
                                        {item}
                                    </Typography>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                    <Grid className="footer-credits">
                        <Typography variant="overline" color="inherit">
                            copyright 2018
                        </Typography>
                        <Typography variant="inherit" color="inherit">
                            Desenvolvido por
                            <a href="https://www.rafaelgomes.ga" target="_blank" rel="noopener noreferrer"> Rafael
                                Gomes </a>
                        </Typography>
                    </Grid>
                </footer>
                <div onClick={this.dropClick} className="backdrop"></div>
            </div>

        )
    }
}

Portal.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Portal)