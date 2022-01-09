import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

const Home = React.lazy(() => import('./pages/Home'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Explorer = React.lazy(() => import('./pages/Explorer'));
const Project = React.lazy(() => import('./pages/Project'));

const Routes = () => {
  return (
    <Router>
      <Navigation />
      <Suspense
        fallback={
          <div className="text-center text-primary display-2">Loading...</div>
        }
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/project" component={Project} />
          <Route exact path="/explorer" component={Explorer} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
