import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AppShell} from "./components/AppShell/AppShell.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppShell>
          <App />
      </AppShell>
  </StrictMode>,
)
