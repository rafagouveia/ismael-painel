import React, {Component} from "react";
import {Grid, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";
import Zoom from "@material-ui/core/es/Zoom/Zoom";

const styles = theme => ({
    root: {
        margin: 0
    },
    img: {
        borderRadius: 5,
        margin: 50,
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);"
    },
    title: {
        margin: 50
    }
});

class PortalProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {products: props.response.products}
    }

    render() {

        const {match, classes, location} = this.props;
        const {products} = this.state;
        const product = location.state.product;
        return (
            <>
                <Zoom in>
                    <div className="product-page">
                        <div className="product">
                            <div className="product-image">
                                <img src={product.productImage} alt={product.productName}/>
                            </div>
                            <div className="product-content">
                               <div className="product-information">
                                   <span className="product-title"> {product.productName}</span>
                                   <span className="product-description"> {product.productDescription}</span>
                               </div>
                            </div>
                        </div>
                    </div>
                </Zoom>
            </>
        );
    }
}

export default withStyles(styles)(PortalProducts)