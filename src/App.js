// ROUTER
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

// ALL COMPONENTS GOES HERE
import { AppNav } from './components/AppNav'
import { NoteDetails } from './components/NoteDetails'
import { Tasks } from './pages/Tasks'


function App() {
 


  return (
    <Router>
      <div className='App'>
        <section>
          <AppNav />
          <Switch>
            {/* <Route path='/abut' component={component name} /> */}
            {/* <Route path='/task/edit/:id?' component={component name} /> */}
            <Route path='/note/:_id' component={NoteDetails} />
            <Route path='/' component={Tasks} />
          </Switch>
        </section>
      </div>
    </Router>
  )
}

export default App
