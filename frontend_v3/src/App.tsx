import { NBChunksProvider } from "./services/NBChunksProvider"
import { NBMetadataProvider } from "./services/NBMetadataProvider"
import { NBTimestampProvider } from "./services/NBTimestampsProvider"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notebook from './pages/Notebook';

export default function App() {
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
  )
}
