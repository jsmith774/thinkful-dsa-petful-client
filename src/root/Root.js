import React from 'react';
import Header from '../header/Header';
import Landing from '../landing/Landing';
import AdoptionPage from '../adoptionPage/AdoptionPage'
import { Route, Switch } from 'react-router-dom';

function Root() {
 
  return <main className='main'>
    <Header/>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/adoption' component={AdoptionPage}/>
    </Switch>
  </main>
}

export default Root
