import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'admin-home',
  styleUrl: 'admin-home.css',
  shadow: true,
})
export class AdminHome {
  render() {
    return (
      <Host>
        <h1 id="welcome">Welcome Admin...</h1>
        <div class= "box" >
          <table>
            <tr>
              <td class="td">
                <a href="/">Home</a>
              </td>
            </tr>
            <tr>
              <td class="td">
                <a href="/viewusers">View Users</a>
              </td>
            </tr>
            <tr>
              <td class="td">
                <a href="/addbooks">Add Books</a>
              </td>
            </tr>
            <tr>
              <td class="td">
                <a href="/viewbooks">View Books</a>
              </td>
            </tr>
            <tr>
              <td class="td">
                <a href="/issuebook">Issue Book</a>
              </td>
            </tr>
            <tr>
              <td class="td">
                <a href="/viewissuebooks">View Issued Books</a>
              </td>
            </tr>
            <tr>
              <td class="td">
                <a href="/">Log Out</a>
              </td>
            </tr>
          </table>
        </div>
      </Host>
    );
  }
}
