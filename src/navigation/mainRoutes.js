import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ListView from 'views/List';
import DetailView from 'views/Detail';

export default ({ privilege }) => (
  <Router>
    <Route exact path="/" component={ListView} />
    <Route exact path="/user-details/" component={DetailView} />
  </Router>
);
