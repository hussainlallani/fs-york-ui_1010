import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "../../helpers/authHelper";

const AdminRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!isAdmin() ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default AdminRoute;
