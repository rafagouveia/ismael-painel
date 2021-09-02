import React from "react";
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, withStyles, Grid} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import {SyncLoader} from "react-spinners"
import api from "./../../../services/api"

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 100,
    },
    active: {
        borderRadius: 5,
        backgroundColor: 'green',
        padding: 5
    },
    disabled: {
        borderRadius: 5,
        backgroundColor: 'red',
        padding: 5
    }
});

class ListProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            listProducts: []
        }
    }

    componentDidMount() {
        api.get('/product', {
            onUploadProgress: () => {
                this.setState({loading: true})
            },
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('SESSION')).token}`
            }
        })
            .then(response => {
                this.setState({listProducts: response.data})
            })
            .catch((error) => {
                if (error.status === 401) {
                    console.log(this.props)
                }
            })
            .finally(() => {
                this.setState({loading: false})
            });
    }

    render() {
        const {listProducts} = this.state;
        const {classes} = this.props;
        return (
            <>
                <Typography variant="h4" gutterBottom component="h2">
                    Lista de Produtos
                </Typography>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nº</TableCell>
                                <TableCell>Nome do Produto</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Disponivel</TableCell>
                            </TableRow>
                        </TableHead>

                        {listProducts.length > 0 &&

                        listProducts.map((item, index) =>
                            <TableBody key={index}>
                                <TableRow>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.productName}</TableCell>
                                    <TableCell>{item['created_at']}</TableCell>
                                    <TableCell>{item.productActive === 1 ?
                                        <div className={classes.active}>Ativado</div> :
                                        <div className={classes.disabled}>Desativado</div>}</TableCell>
                                </TableRow>
                            </TableBody>
                        )
                        }
                    </Table>


                    {listProducts.length <= 0 ?
                        <Grid container justify="center">
                            <>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingBottom: 72,
                                    paddingTop: 72,
                                    placeItems: "center",
                                    opacity: 0.3
                                }}>
                                    {this.state.loading ? <SyncLoader/> : <>
                                        <span style={{paddingRight: 20}}> <ShoppingCart style={{fontSize: 53}}/></span>
                                        Nenhum produto encontrado.</>}
                                </div>
                            </>
                        </Grid> : ''
                    }
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(ListProducts)