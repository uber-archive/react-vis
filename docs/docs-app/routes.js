import React from 'react';
import {
  Router,
  Route,
  // IndexRoute,
  Redirect,
  IndexRedirect,
  useRouterHistory
} from 'react-router';
import {createHashHistory} from 'history';

import App from './components/app.js';
import Home from './components/app.js';
import Layout from './components/layout.js';
import ExamplePage from './components/example-page.js';
import DocumentationPage from './components/documentation-page';

import {
  examplePages,
  docPages
} from './constants/pages';

const pageType = {
  example: ExamplePage,
  documentation: DocumentationPage
};

const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

export default () => (
  <Router history={appHistory}>
    <Route path="/" component={App} />
    { renderRouteGroup('documentation', docPages) }
    { renderRouteGroup('examples', examplePages) }
    <Redirect from="/" to="/documentation/overview/getting" />
    <Route path="*" component={Home} />
  </Router>
);
// <IndexRoute component={Home} />

function renderRoute(page, i) {
  const {children, path, content} = page;
  if (children) {
    return (
      <Route key={i} path={path} >
        <IndexRedirect to={ getDefaultPath(children) } />
        { children.map(renderRoute) }
      </Route>
    );
  }
  const component = pageType[content.pageType];
  return (<Route key={i} path={path} component={component} content={content} />);
}

function renderRouteGroup(path, pages) {
  return (
    <Route path={path} component={Layout} pages={pages}>
      <IndexRedirect to={ getDefaultPath(pages) } />
      { pages.map(renderRoute) }
    </Route>
  );
}

function getDefaultPath(pages) {
  const path = [];
  let page;
  while (pages) {
    page = pages[0];
    pages = page.children;
    path.push(page.path);
  }
  return path.join('/');
}
