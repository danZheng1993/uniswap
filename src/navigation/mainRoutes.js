import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ListView from 'views/List';

export default ({ privilege }) => (
  <Router>
    <Route exact path="/" component={ListView} />
    <Route exact path="/details/" component={ListView} />
  </Router>
);
