import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './home/Home';
import History from './history/History';

const App = () => {
  return (
    <Router>
      <div className="App bg-white text-dark">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <a className="navbar-brand" href="#">
              Tic Tac Toe
          </a>
          <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/history">
                  History
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/history' exact component={History} />
        </Switch>
      </div>
    </Router>
  )
}

export default App