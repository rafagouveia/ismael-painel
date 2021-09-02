import React, {Component} from "react";
import {Provider} from "react-redux";
import store from "./Redux/store";
import Routes from "./routes";
import {createMuiTheme, MuiThemeProvider, CssBaseline} from "@material-ui/core"

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    overrides: {
        MuiButton: {
            textPrimary: {
                background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)"
            },
            raisedPrimary: {
                background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)"
            }
        },
        MuiAppBar: {
            colorPrimary: {
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)'
            }
        },
        MuiFab: {
            primary: {
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)'
            }
        }
    }
});


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes/>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;