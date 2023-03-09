import React from 'react';
import logo from './logo.svg';
import './App.css';
import QRPage from './components/QRPage';
import { DocumentManager } from './DocumentManager';
import AutoPage from './components/AutoPage';
import Footer from './components/Footer';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import TelePage from './components/TelePage';
import DrivingPage from './components/DrivingPage';
import TeamPage from './components/TeamPage';
import NotesPage from './components/NotesPage';

function App() {
  const documentManager = new DocumentManager();
  const DocumentManagerContext = React.createContext<DocumentManager>(documentManager);
  

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
    <DocumentManagerContext.Provider value={documentManager}>
    <div className="App" style={{
                
                height:'100vh',
                width:'100vw',
                display:'flex',
                flexDirection:'column',
                position: 'absolute',
                bottom:0,
                background: 'var(--background)'
            }}>
      <Footer></Footer>
      <div style={{flexGrow:1, marginTop:"20px"}}>
      <TeamPage></TeamPage>
      <AutoPage></AutoPage>
      <TelePage></TelePage>
      <DrivingPage></DrivingPage>
      <NotesPage></NotesPage>
      <QRPage></QRPage>
      </div>
      
      {/*  */}
      
    </div>
    </DocumentManagerContext.Provider>
    </ThemeProvider>
  );
}

export default App;
