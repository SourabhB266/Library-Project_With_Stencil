import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'user-home',
  styleUrl: 'user-home.css',
})
export class UserHome {
  render() {
    return (
      <Host>
        <h1 id="welcome">Welcome User...</h1>
        <div class="box">
          <table>
            <tr>
              <td class="td">
                <a href="/">Home</a>
              </td>
            </tr>
            <tr>
              <td class="td">
                <a href="/userprofile">Profile</a>
              </td>
            </tr>
            <tr>
              <td class="td">
                <a href="/userviewbooks">View Books</a>
              </td>
            </tr>
            <tr>
              <td class="td">
                <a href="/viewissuestatus">View Issue Status</a>
              </td>
            </tr>
            <tr>
              <td class="td">
                <a href="home.html">
                  Log Out
                </a>
              </td>
            </tr>
          </table>
        </div>
      </Host>
    );
  }
}
