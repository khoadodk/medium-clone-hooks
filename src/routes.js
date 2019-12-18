import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GlobalFeed from './pages/globalFeed';
import YourFeed from './pages/yourFeed';
import TagFeed from './pages/tagFeed';
import Article from './pages/article';
import CreateArticle from './pages/createArticle';
import EditArticle from './pages/editArticle';
import Authentication from './pages/authentication';
import Settings from './pages/settings';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/feed" component={YourFeed} exact />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/articles/new" component={CreateArticle} />
      <Route path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/articles/:slug" component={Article} />
      <Route path="/register" component={Authentication} />
      <Route path="/login" component={Authentication} />
      <Route path="/settings" component={Settings} />
    </Switch>
  );
};
export default Routes;
