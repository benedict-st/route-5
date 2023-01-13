import React from "react";

import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  useParams,
  NavLink,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/users" component={UsersLayout} />
          <Route path="/" exact component={MainPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function MainPage() {
  return (
    <>
      <h3>MainPage</h3>
      <NavLink to={"/users/"}>UserListPage</NavLink>
    </>
  );
}
function UsersLayout() {
  const { path } = useRouteMatch();

  return (
    <div>
      <h3>Users Layout</h3>
      <NavLink to="/">Main Page</NavLink>
      <Switch>
        <Route path={path + "/:userID/profile"} component={UsersProfilePage} />
        <Route path={path + "/:userID/edit"} component={EditUserPage} />
        <Route path={path} exact component={UserListPage} />
        <Redirect from={path + "/:userID"} to={path + "/:userID/profile"} />
      </Switch>
    </div>
  );
}
function UserListPage() {
  const { path } = useRouteMatch();

  return (
    <>
      <h3>UserList Page</h3>

      <ul>
        {new Array(5).fill("user").map((_, index) => (
          <li key={"user_" + index}>
            <NavLink to={`${path}/${index}`}>User {index} </NavLink>
          </li>
        ))}{" "}
      </ul>

      <NavLink to={"/"}> Main Page</NavLink>
    </>
  );
}

function UsersProfilePage() {
  const { userID } = useParams();

  return (
    <>
      <h3>UsersProfile page</h3>
      <div>userId : {userID}</div>
      <p>
        <NavLink to={"/users"}> Users List page</NavLink>
      </p>
      <p>
        <NavLink to={`/users/${userID}/edit`}> Edit Users List page</NavLink>
      </p>
    </>
  );
}

function EditUserPage() {
  const { userID } = useParams();
  return (
    <>
      <h3>EditUserPage page</h3>
      <div>userId : {userID}</div>
      <ul>
        <li>
          <NavLink to={"/users/" + userID}>User profile Page</NavLink>
        </li>
        <li>
          <NavLink to={"/users/" + (+userID + 1)}> Another User</NavLink>
        </li>
        <li>
          <NavLink to={"/users"}> Users List page</NavLink>
        </li>
      </ul>
    </>
  );
}

export default App;
