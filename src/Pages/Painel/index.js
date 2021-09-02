import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    AppBar,
    Avatar,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    withStyles
} from "@material-ui/core";

import {ChevronLeft as ChevronLeftIcon, Menu as MenuIcon} from "@material-ui/icons";
import MenuList from "./Sections/Menu";
import {AddProducts, ListProducts} from "./Product";
import Home from "./Home";

import {Route} from "react-router-dom";
import Error404 from "./404"
import Settings from "./Config";
import {connect} from "react-redux";
import * as actions from "../../Redux/actions";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            anchorEl: null
        }
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };
    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    _logout = () => {
        console.log(this.props.loggedIn, this.props)
        this.props.logout()
        this.handleClose()
    };


    render() {
        const {classes, match, location} = this.props;
        const {anchorEl} = this.state;
        const switchPage = (match) => {
            switch (match.pathname) {
                case "/painel":
                    return <Route component={Home}/>;
                case "/painel/produtos":
                    return <Route component={ListProducts}/>;
                case "/painel/produtos/add":
                    return <Route component={AddProducts}/>;
                case "/painel/configurar":
                    return <Route component={Settings}/>;
                default:
                    return <Route component={Error404}/>;
            }
        };
        return (
            <React.Fragment>
                <CssBaseline/>
                <div className={classes.root}>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                    >
                        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                            >
                                Dashboard
                            </Typography>
                            <IconButton
                                color="inherit"
                                aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <Avatar
                                    alt="Adelle Charles"
                                    src="https://www.rafaelgomes.ga/profile.fw.png"
                                    className={classNames(classes.avatar, classes.bigAvatar)}
                                />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Ver Perfil</MenuItem>
                                <MenuItem onClick={this.handleClose}>Configurar Conta</MenuItem>
                                <MenuItem onClick={this._logout}>Sair da Conta</MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <MenuList/>
                        <Divider/>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer}/>
                        <div className={classes.tableContainer}>
                            {switchPage(this.props.location)}
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    loggedIn: state.loggedIn
});
export default connect(mapStateToProps, actions)(withStyles(styles)(Dashboard))