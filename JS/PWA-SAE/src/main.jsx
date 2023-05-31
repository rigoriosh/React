import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

import App from './App'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';

import './styles/index.css'
if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location)) {
  registerSW();
}
const updateSW = registerSW({
  onNeedRefresh() {
    console.log("onNeedRefresh");
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
},
  onOfflineReady() {
    console.log("OFLINNE ??");
    alert("OFLINNE ??");
  },
})

// if (typeof window !== 'undefined') import('./pwa')
document.addEventListener("DOMContentLoaded", function () {
  updateOnlineStatus();
  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

function updateOnlineStatus(){
  console.log(`Your network status is ${navigator.onLine ? "Online" : "Offline"} `);
}


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
    <CssBaseline/>
    <App />
  </>
  /* </React.StrictMode> */,
)
