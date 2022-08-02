import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/UI/Navigation";

const Resizer = React.lazy(() => import("./pages/Resizer"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const Project = React.lazy(() => import("./pages/Project"));
const Explorer = React.lazy(() => import("./pages/Explorer"));
const Image = React.lazy(() => import("./pages/Image"));

const FallBack = () => <div className="text-center text-primary text-gradient display-4 my-5">Loading...</div>;

const Routes = () => {
   return (
      <Router>
         <Navigation />
         <Suspense fallback={<FallBack />}>
            <Switch>
               <Route exact path="/" component={Resizer} />
               <Route exact path="/gallery" component={Gallery} />
               <Route exact path="/image/:id" component={Image} />
               <Route exact path="/project" component={Project} />
               <Route exact path="/explorer" component={Explorer} />
            </Switch>
         </Suspense>
      </Router>
   );
};

export default Routes;
