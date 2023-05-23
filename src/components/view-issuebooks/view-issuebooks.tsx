import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'view-issuebooks',
  styleUrl: '../../components/issue-book/issue-book.css',
  // shadow: true,
})
export class ViewIssuebooks {
  componentDidRender() {
    this.displaying();
  }
  async displaying() {
    let dispissuebooks = document.getElementById('disp-issuebooks');
    let list = '';
    let count = 0;
    let resp = await fetch('http://localhost:8080/getAllIssueBook');
    let issuebooks = await resp.json();
    for (let i of issuebooks) {
      list += `<tr>
     <td>${++count}</td>
     <td>${i.bookId}</td>
     <td>${i.bookTitle}</td>
     <td>${i.uid}</td>
     <td>${i.uname}</td>
     <td>${i.issuedate}</td>
     <td>${i.actualreturndate}</td>
     </tr>`;
    }
    dispissuebooks.innerHTML = list;
  }
  render() {
    return (
      <Host>
        <div class="homeButton">
          <a href="/adminhome">Back</a>
        </div>
        <div class="column">
          <table id="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Book ID</th>
                <th>Book Title</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Issued Date</th>
                <th>Actual Return Date</th>
              </tr>
            </thead>
            <tbody id="disp-issuebooks"></tbody>
          </table>
        </div>
      </Host>
    );
  }
}
