// ROUTER
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

// ALL COMPONENTS GOES HERE
import { AppNav } from './components/AppNav'
import { NoteDetails } from './components/NoteDetails'
import { About } from './pages/About'
import { Tasks } from './pages/Tasks'

function App() {
  return (
    <Router>
      <div className='App'>
        <section>
          <AppNav />
          <Switch>
            {/* <Route path='/abut' component={component name} /> */}

            <Route path='/about' component={About} />
            <Route path='/' component={Tasks} />
          </Switch>
        </section>
      </div>
    </Router>
  )
}

export default App
