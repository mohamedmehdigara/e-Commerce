import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
const Context = React.createContext({
    login : async (email, password) => {
        const res = await axios.post(
          'http://localhost:3001/login',
          { email, password },
        ).catch((res) => {
          return { status: 401, message: 'Unauthorized' }
        })
      
        if(res.status === 200) {
          const { email } = jwt_decode(res.data.accessToken)
          const user = {
            email,
            token: res.data.accessToken,
            accessLevel: email === 'admin@example.com' ? 0 : 1
          }
      
          this.setState({ user });
          localStorage.setItem("user", JSON.stringify(user));
          return true;
        } else {
          return false;
        }
      },
      
      logout : e => {
        e.preventDefault();
        this.setState({ user: null });
        localStorage.removeItem("user");
      },
});
export default Context;