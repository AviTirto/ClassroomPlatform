import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Notebook from './pages/Notebook';
import { NBChunksProvider } from './services/NBChunksProvider';
import { NBMetadataProvider } from './services/NBMetadataProvider';
import { NBTimestampProvider } from './services/NBTimestampProvider';

function App() {
  return (
    <NBChunksProvider>
      <NBMetadataProvider>
        <NBTimestampProvider>
          <Router>
            <Routes>
              <Route path='/' />
              <Route path='/notebook' Component={Notebook} />
            </Routes>
          </Router>
        </NBTimestampProvider>
      </NBMetadataProvider>
    </NBChunksProvider>
  );
}

export default App;