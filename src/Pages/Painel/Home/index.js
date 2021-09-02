import React, {Component} from "react";
import {withStyles} from "@material-ui/core"
import Cards from "./Widgets/Card";
import ReIcon from "../../../ReIcon";

import api from "./../../../services/api"

const styles = () => ({
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
    }
});

class PainelHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: {}
        }
    }

    componentDidMount(): void {
        api.get('/widgets')
            .then(response => {
                this.setState({widgets: response.data})
            });
    }

    render() {
        const {classes} = this.props;
        const {widgets} = this.state;
        return (
            <div className={classes.grid}>
                {widgets.length > 0 &&
                widgets.map((item, index) => (
                    <Cards key={index} title={item.name} value={item.value} media={
                        <ReIcon variant="outlined" size={58}>{item.media}</ReIcon>
                    }/>
                ))
                }
            </div>
        )
    }
}

export default withStyles(styles)(PainelHome);