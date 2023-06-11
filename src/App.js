import './App.css';
import MiniDrawer from './ui-component/drawer/component_drawer_mini';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocaleStore } from './store/locale';
import { useMemo } from 'react';

function App() {

  // Get locale
  const localeState = useLocaleStore((state) => state);
  const { currentLocale, localesList } = localeState;
  const currentLocalesList = localesList[currentLocale];

  const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    }
  );

  const themeWithLocale = useMemo(
    () => createTheme(theme, currentLocalesList),
    // eslint-disable-next-line
    [currentLocale, theme],
  );

  return (
    <ThemeProvider theme={themeWithLocale}>
      <MiniDrawer />
    </ThemeProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;