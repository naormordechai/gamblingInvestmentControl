import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout/Layout';
import { GICContainer } from './containers/GICContainer/GICContainer';




function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={GICContainer} />
      </Switch>
    </Layout>
  );
}

export default App;
