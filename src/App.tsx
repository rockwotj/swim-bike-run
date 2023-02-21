import {Redirect, Route, Switch} from "wouter";
import {Completed} from "./components/screens/Completed";
import {Home} from "./components/screens/Home";
import {Settings} from "./components/screens/Settings";
import {SportWorkout} from "./components/screens/Sport";
import {Sport} from "./lib/sport";

export function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/sport/:type">
        {
          ({type}) => {
            const sport = Sport.forType(type);
            return sport ? <SportWorkout sport={sport} /> : <Redirect to="/" />
          }
        }
      </Route>
      <Route path="/settings" >
        <Settings />
      </Route>
      <Route path="/completed" >
        <Completed />
      </Route>
      <Route path="/" >
        <Home />
      </Route>
      <Route><Redirect to="/" /></Route>
    </Switch>
  );
}
