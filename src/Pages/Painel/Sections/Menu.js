import React from "react";
import classes from "classnames";
import {Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import {
    AddBox,
    Dashboard as DashboardIcon,
    ExpandLess,
    ExpandMore,
    FormatListNumbered as ListIcon,
    Settings,
    ShoppingBasket
} from "@material-ui/icons";
import {Link} from "react-router-dom";

const Lists = [
    {
        Name: "Painel de Controle",
        Icon: DashboardIcon,
        Link: "/painel"
    },
    {
        Name: "Produtos",
        Icon: ShoppingBasket,
        dropdown: [
            {
                Name: "Lista de Produtos",
                Icon: ListIcon,
                Link: '/painel/produtos'
            },
            {
                Name: "Add Produto",
                Icon: AddBox,
                Link: "/painel/produtos/add"
            }
        ]
    },
    {
        Name: "Configurações",
        Icon: Settings,
        Link: "/painel/settings"
    }
];
const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    }
});

class MenuList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {MenuCollapseOpen: false}
    }

    handleClick = () => {
        this.setState(state => ({MenuCollapseOpen: !state.MenuCollapseOpen}));
    };

    render() {
        const listRender = Lists.map((list, index) =>
            <div key={index}>
                {Array.isArray(list.dropdown) &&
                <>
                    <Divider/>

                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <list.Icon/>
                        </ListItemIcon>
                        <ListItemText primary={list.Name}/>
                        {this.state.MenuCollapseOpen ? <ExpandMore/> : <ExpandLess/>}
                    </ListItem>

                    <Collapse in={this.state.MenuCollapseOpen} timeout="auto" unmountOnExit>
                        <Divider/>
                        <List component="div" disablePadding>

                            {list.dropdown.map((sublist, index) =>
                                <Link key={index} to={sublist.Link} style={{textDecoration: 'none'}}>
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <sublist.Icon/>
                                        </ListItemIcon>
                                        <ListItemText inset primary={sublist.Name}/>
                                    </ListItem>
                                </Link>
                            )}
                        </List>
                    </Collapse>
                </>
                }
                {!Array.isArray(list.dropdown) &&
                <>
                    <Divider/>
                    <Link to={list.Link} style={{textDecoration: 'none'}}>
                        <ListItem button>
                            <ListItemIcon>
                                <list.Icon/>
                            </ListItemIcon>

                            <ListItemText primary={list.Name}/>

                        </ListItem>
                    </Link>
                </>
                }
            </div>
        );
        return (
            <div>
                {listRender}
            </div>
        );
    }
}

export default withStyles(styles)(MenuList);