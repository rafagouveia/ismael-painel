import React from "react";
import {
    Button,
    FormControl,
    FormControlLabel,
    Grid, Input, InputBase,
    Paper,
    Switch,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import {AddBox, Edit, Add} from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Fab from "@material-ui/core/Fab";

import api from "./../../../services/api";


const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 4,
    },
    card: {
        position: 'relative',
        maxWidth: 345,
    },
    buttonSelectPhoto: {
        position: 'absolute',
        bottom: 3,
        right: 5
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    iconButton: {
        marginRight: theme.spacing.unit,
    },
    button: {
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .30)',
        '&:hover': {
            backgroundColor: '#2E7D32'
        }
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 300,
    },
});

class AddProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productCode: '',
            productDescription: '',
            productImage: false,
            productFileNameImage: 'Nenhuma Imagem Selecionada',
            productActive: false,
            buttonRegister: false
        };
        this.fileUpload = React.createRef();
    }

    handleChange = name => event => {
        if (name === "productActive") {
            console.log(event.target.checked);
            return this.setState({
                [name]: event.target.checked,
            });

        }
        return this.setState({
            [name]: event.target.value,
        });
    };
    createImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({productImage: e.target.result, productFileNameImage: this.fileUpload.current.files[0].name})
        };
        reader.readAsDataURL(file);
    };
    handleFileChange = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0])
    };
    _handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('productName', this.state.productName);
        formData.append('productCode', this.state.productCode);
        formData.append('productDescription', this.state.productDescription);
        formData.append('productActive', this.state.productActive);
        formData.append('productImage', this.fileUpload.current.files[0]);
        api.post('/product', formData,
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('SESSION')).token}`
                }
            }
        )
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })

    };

    render() {
        const {classes} = this.props;
        return (
            <>
                <form onSubmit={this._handleSubmit}>
                    <Paper className={classes.root}>
                        <Grid container spacing={24}>
                            <Grid item md={10}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            className={classes.media}
                                            height="140"
                                            image={this.state.productImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Flag_of_None.svg/1280px-Flag_of_None.svg.png"}
                                            title={this.state.productName}
                                        />
                                    </CardActionArea>
                                    <Fab onClick={() => this.fileUpload.current.click()}
                                         color="primary"
                                         aria-label="Edit"
                                         className={classes.buttonSelectPhoto}>
                                        <Edit/>
                                    </Fab>
                                </Card>
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="standard-name"
                                        label="Nome do Produto"
                                        name="productName"
                                        className={classes.textField}
                                        value={this.state.productName}
                                        margin="normal"
                                        onChange={this.handleChange('productName')}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="standard-name"
                                        label="Código do Produto"
                                        className={classes.textField}
                                        value={this.state.productCode}
                                        onChange={this.handleChange('productCode')}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <FormControl fullWidth>
                                    <input
                                        accept="image/png, image/jpeg"
                                        ref={this.fileUpload}
                                        onChange={this.handleFileChange}
                                        type="file"
                                        style={{display: 'none'}}
                                    />
                                    {console.log(this.fileUpload)}
                                    <TextField
                                        id="standard-read-only-input"
                                        label="Imagem do Produto"
                                        onClick={() => this.fileUpload.current.click()}
                                        value={this.state.productFileNameImage}
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Descrição do Produto"
                                        multiline
                                        rowsMax="20"
                                        value={this.state.productDescription}
                                        className={classes.textField}
                                        onChange={this.handleChange('productDescription')}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <FormControl fullWidth>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="primary"
                                                checked={this.state.productActive}
                                                value="productActive"
                                                onChange={this.handleChange('productActive')}
                                            />
                                        }
                                        label={this.state.productActive ? "Produto Ativo" : "Produto Desativado"}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <Fab
                                    type='submit'
                                    color="primary"
                                    disabled={this.state.buttonRegister}
                                    variant="extended" aria-label="Add" className={classes.button}>
                                    <AddBox className={classes.iconButton}/>
                                    CADASTRAR
                                </Fab>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </>
        );
    }
}

export default withStyles(styles)(AddProducts);