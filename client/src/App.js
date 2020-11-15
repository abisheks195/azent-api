import './App.css';
import AddForm from './components/AddForm';
import Header from'./components/Header';
import Home from './components/Home';
import UpdateForm from './components/UpdateForm';
import Delete from './components/Delete';
import Success from './components/Success';

import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UniDetail from './components/UniDetail';
import { HelmetProvider } from 'react-helmet-async';


function App() {
  return (
    <div>
    {/* HelmetProvider prevents side effects from occuring because of async data */}
    <HelmetProvider>
      <BrowserRouter>
        <Header/>
        <Container className="my-5">
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/uni/add' exact component={AddForm}/>
            <Route path='/uni/update' exact component={UpdateForm}/>
            <Route path='/success' exact component={Success}/>
            <Route path='/uni/:name' exact component={UniDetail}/>
            <Route path='/uni/:id/update' exact component={UpdateForm} />
            <Route path='/uni/:id/delete' exact component={Delete} />
          </Switch>
        </Container>
      </BrowserRouter>
      </HelmetProvider>
    </div>
  );
}

export default App;
