import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createTheme, MantineProvider} from '@mantine/core';
import './index.css'
import App from './App.jsx'
import '@mantine/core/styles.css';

const customTheme = createTheme({
        fontFamily: 'Work Sans, sans-serif',
    }
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MantineProvider theme={customTheme} defaultColorScheme="dark">
            <App/>
        </MantineProvider>
    </StrictMode>,
)
