import React, {Component} from "react";

import {
    CircularProgress,
    Grid,
    Grow,
    withStyles
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {ShoppingCart} from "@material-ui/icons";


const styles = theme => ({
    root: {
        color: "black"
    },
    card: {
        maxWidth: 210,
        minWidth: 181
    },
    image: {

    },
    boxProducts: {
        display: 'flex',
        flexGrow: 1
    }
});

class PortalListProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {products: props.response.products, loaded: props.response.loaded};
    }
    _ajustDescription = (value) => {
       if(value != null){
           return value.slice(0, 80) + "...";
       }
       return "Sem Descrição Para Mostrar!";
    };
    render() {
        const {classes} = this.props;
        const {products} = this.state;
        const renderCards = products.map((item, index) =>
            <Grow key={index} in={this.state.loaded}>
            <Link style={{textDecoration: 'none'}}
            to={{pathname: `/produto/${item.id}`, state: {product: item}}}>
                <div className="card-products">
                    <div
                        style={{backgroundImage: `url(${item.productImage})`}}
                        className="card-media">
                    </div>

                    <div className="card-content">
                        <span className="card-title">{item.productName}</span>
                        <span className="card-subtitle">{this._ajustDescription(item.productDescription)}</span>
                    </div>
                    <div className="card-footer">
                    </div>
                </div>
                </Link>
            </Grow>
        );
        if (products.length < 1 && this.state.loaded === false) {
            return (
                <>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: 72,
                        paddingTop: 72,
                        placeItems: "center",
                        opacity: 0.3
                    }}>
                        <span style={{paddingRight: 20}}> <ShoppingCart style={{fontSize: 53}}/></span>
                        Nenhum produto encontrado.
                    </div>
                </>
            )
        }
        if (this.state.loaded === false) {
            return (
                <Grow in>
                    <Grid container justify="center">
                        <CircularProgress color="primary"/>
                    </Grid>
                </Grow>
            );
        }

        return (
            <>
                <Grid container>
                    <div className="box-cards">
                        {this.state.loaded && renderCards}
                    </div>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(PortalListProducts)