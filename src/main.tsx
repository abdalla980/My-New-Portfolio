import { StrictMode, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Switch } from 'wouter';
import { Layout } from './app/layout';
import HomePage from './app/page';
import ProjectsPage from './app/projects/page';
import { Preloader } from './components/Preloader/Preloader';
import './styles/globals.css';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(
    () => sessionStorage.getItem('preloaderShown') === 'true',
  );

  const handlePreloaderComplete = useCallback(() => {
    sessionStorage.setItem('preloaderShown', 'true');
    setPreloaderDone(true);
    window.dispatchEvent(new CustomEvent('preloader-complete'));
  }, []);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <Layout>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route>
            <HomePage />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
