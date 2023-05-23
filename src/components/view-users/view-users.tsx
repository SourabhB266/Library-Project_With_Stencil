import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'view-users',
  styleUrl: 'view-users.css',
})
export class ViewUsers {
  async componentDidRender() {
    console.log('dislpay');
    let resp = await fetch('http://localhost:8080/getall');
    let users = await resp.json();
    let list = '';
    let dispUsers = document.getElementById('disp-users');
    let count = 0;
    for (let user of users) {
      console.log(user.uid);
      list += `<tr>
        <td> ${++count} </td>
        <td> ${user.uid} </td>
        <td> ${user.fname + ' ' + user.lname} </td>
        <td> ${user.email} </td>
        <td> ${user.mobilenumber} </td>
        <td> ${user.no_of_books_taken} </td>
        </tr>`;
    }
    dispUsers.innerHTML = list;
  }

  render() {
    return (
      <Host>
        <div class="homeButton">
          <a href="/adminhome">Back</a>
        </div>
        <div class="column">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>User Id</th>
                <th>Username</th>
                <th>Email Address</th>
                <th>Mobile Number</th>
                <th>No.of books taken</th>
              </tr>
            </thead>
            <tbody id="disp-users"></tbody>
          </table>
        </div>
      </Host>
    );
  }
}
