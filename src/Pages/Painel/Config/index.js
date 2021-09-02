import React from "react";
import {
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    Paper,
    Switch,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";


const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 4,
    },
    iconButton: {
        marginRight: theme.spacing.unit,
    },
    button: {
        color: 'white',
        backgroundColor: '#4CAF50',
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

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productCode: '',
            productDescription: '',
            productImage: '',
            statusSite: true,
            siteCor: '',
            buttonRegister: false
        }
    }

    handleChange = name => event => {
        if (name === "statusSite") {
            return this.setState({
                [name]: event.target.checked,
            });
        }
        return this.setState({
            [name]: event.target.value,
        });
    };
    recordData = event => {
        fetch('http://localhost:8000/create', {
            method: 'POST',
            mode: 'cors'
        })
            .then(res => res.json())
            .then(
                (response) => {
                    // this.setState({response: response})
                    return response;
                }, (error) => {
                    return error;
                })
    };

    render() {
        const {classes} = this.props;
        return (
            <>
                <Typography variant="h4" gutterBottom component="h2">
                    Configurações do Site
                </Typography>
                <Paper className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item md={5} xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    id="standard-name"
                                    label="Nome do Produto"
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
                                <TextField
                                    id="standard-name"
                                    label="Imagem do Produto"
                                    className={classes.textField}
                                    value={this.state.productImage}
                                    onChange={this.handleChange('productImage')}
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
                                            checked={this.state.statusSite}
                                            value="statusSite"
                                            onChange={this.handleChange('statusSite')}
                                            color="primary"
                                        />
                                    }
                                    label={this.state.statusSite ? "Site Online" : "Site em Manutenção"}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Selecionar Cor"
                                    className={classes.textField}
                                    value={this.state.siteCor}
                                    onChange={this.handleChange('siteCor')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    helperText="Por favor selecione a cor!"
                                    margin="normal"
                                >
                                        <MenuItem value="red">
                                            Vermelho
                                        </MenuItem>
                                    <MenuItem value="green">
                                        Verde
                                    </MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <Button disabled={this.state.buttonRegister} onClick={this.recordData} variant="extendedFab"
                                    aria-label="Delete"
                                    className={classes.button}>
                                <AddBox className={classes.iconButton}/>
                                Alterar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(Settings);