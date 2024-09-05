import { RouterProvider } from 'react-router-dom';
import './App.css'
import router from './routes/route';
import { AppShell } from './components/AppShell/AppShell';

function App() {
  return (
    <AppShell>
      <RouterProvider router={router} fallbackElement={<p>Loading....</p>} />
    </AppShell>
  )
}

export default App
