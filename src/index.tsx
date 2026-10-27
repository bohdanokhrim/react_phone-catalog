import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.scss';
import { App } from './App';

import { ShopProvider } from './context/ShopContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ShopProvider>
      <App />
    </ShopProvider>
  </BrowserRouter>,
);
