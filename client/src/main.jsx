import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createTheme, MantineProvider} from '@mantine/core';
import './index.css'
import App from './App.jsx'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {Notifications} from "@mantine/notifications";

const customTheme = createTheme({
        fontFamily: 'Work Sans, sans-serif',
    }
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MantineProvider theme={customTheme} defaultColorScheme="dark">
            <Notifications/>
            <App/>
        </MantineProvider>
    </StrictMode>,
)
