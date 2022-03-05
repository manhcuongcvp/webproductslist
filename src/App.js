import { Component } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import routes from './routers';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';

class App extends Component {

    showContentMenus = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route key={index} path={route.path} exact={route.exact} component={route.main} />
                )
            })
        }
        return <Switch>{result}</Switch>
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Menu />
                    <div className="container">
                        <div className="row">
                            {this.showContentMenus(routes)}
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
