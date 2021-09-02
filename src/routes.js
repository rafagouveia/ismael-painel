import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Login, Painel, Portal} from "./Pages";
import {connect} from "react-redux"
import * as actions from "./Redux/actions";

class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: true};
    }

    render() {
        const {returnLogin} = this.props
        const PrivateRoute = ({component: Component, ...rest}) => {
            return (

                <Route
                    {...rest}
                    render={props =>
                        returnLogin.logged ?
                            <Component {...props} />
                            :
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: {from: props.location}
                                }}
                            />
                    }/>
            )
        };
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Portal}/>
                    <Route exact path="/contato" component={Portal}/>
                    <Route exact path="/sobre" component={Portal}/>
                    <Route exact path="/localizacao" component={Portal}/>
                    <Route exact path="/produto/:id" component={Portal}/>
                    <PrivateRoute path="/painel" component={Painel}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    returnLogin: state.checkLogin,
});

export default connect(mapStateToProps, actions)(Routes)
