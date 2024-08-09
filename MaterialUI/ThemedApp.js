import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
const theme = createTheme({
palette: {
primary: {
main: '#1976d2',
},
secondary: {
main: '#dc004e',
},
},

});
function ThemedApp() {
return (
<ThemeProvider theme={theme}>
<CssBaseline />
<App />
</ThemeProvider>
);
}
export default ThemedApp;