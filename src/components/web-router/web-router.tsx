import { Component, Host, h } from '@stencil/core';
import { createRouter, Route } from 'stencil-router-v2';
const Router = createRouter();
@Component({
  tag: 'lib-router',
})
export class LibeRouter {
  render() {
    return (
        <Host>
        <Router.Switch>
          <Route path="/">
            <home-page />
          </Route>
          <Route path="/usersignup">
            <user-signup />
          </Route>
           <Route path="/userlogin">
            <user-login />
          </Route>
          <Route path="/adminlogin">
            <admin-login />
          </Route> 
           <Route path="/adminhome">
            <admin-home />
          </Route>
          <Route path="/addbooks">
            <add-books />
          </Route>
          <Route path="/viewusers">
            <view-users />
          </Route>
          <Route path="/userhome">
            <user-home />
          </Route>
          <Route path="/viewbooks">
            <view-books />
          </Route>
          <Route path="/userviewbooks">
            <user-viewbooks />
          </Route>
          <Route path="/issuebook">
            <issue-book/>
          </Route>
         <Route path="/viewissuebooks">
            <view-issuebooks />
          </Route>
           <Route path="/viewissuestatus">
            <view-issuestatus />
          </Route>
           <Route path="/userprofile">
            <user-profile />
          </Route>
          <Route path="/editbook"> 
            <edit-book/>
          </Route>
          
        </Router.Switch>
      </Host>
    );
  }
}
