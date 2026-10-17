import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './styles/layout.css'
import './styles/navigation.css'
import './styles/controls.css'
import './styles/detail-popup.css'
import './styles/dialogue.css'
import './styles/hud.css'
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)