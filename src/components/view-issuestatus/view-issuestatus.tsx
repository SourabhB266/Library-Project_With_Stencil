import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'view-issuestatus',
  styleUrl: '../view-books/view-books.css',
})
export class ViewIssuestatus {
  uid = sessionStorage.getItem('uid');

  componentDidRender() {
    this.displaying();
  }
  async displaying() {
    let count = 0;
    let dispStatus = document.getElementById('disp');
    let resp = await fetch('http://localhost:8080/getAllIssueBook');
    let issuebooks = await resp.json();

    for (let book of issuebooks) {
      console.log(book);
      if (this.uid == book.uid && book.issuestatus == 'true') {
        console.log("inside");
        let row = document.createElement('tr');
        let slno = document.createElement('td');
        slno.innerText = String(++count);
        row.appendChild(slno);
        let bookId = document.createElement('td');
        bookId.innerText = book.bookId;
        row.appendChild(bookId);
        let bookTitle = document.createElement('td');
        bookTitle.innerText = book.bookTitle;
        row.appendChild(bookTitle);
        let issuestatus = document.createElement('td');
        issuestatus.innerText = 'Approved';
        row.appendChild(issuestatus);
        let issuedate = document.createElement('td');
        issuedate.innerText = book.issuedate;
        row.appendChild(issuedate);
        let actualreturndate = document.createElement('td');
        actualreturndate.innerText = book.actualreturndate;
        row.appendChild(actualreturndate);

        let ret = document.createElement('td');
        let button = document.createElement('button');
        button.setAttribute('value', 'Return');
        button.innerText = 'Return';
        button.addEventListener('click', () => {
          this.retn(book.bookId, book.issueId, this.uid, book.actualreturndate, new Date().toISOString().substring(0, 10));
        });
        ret.appendChild(button);
        row.appendChild(ret);
     
        let fine = document.createElement('td');
        fine.setAttribute('id', 'fine');
        row.appendChild(fine);
        dispStatus.appendChild(row);
      }
    }

    let resp1 = await fetch('http://localhost:8080/getAllRequest');
    let requests = await resp1.json();
    for (let r of requests) {
      if (this.uid == r.uid) {
        let row = document.createElement('tr');
        let slno = document.createElement('td');
        slno.innerText = String(++count);
        row.appendChild(slno);
        let bookId = document.createElement('td');
        bookId.innerText = r.bookId;
        row.appendChild(bookId);
        let bookTitle = document.createElement('td');
        bookTitle.innerText = r.bookTitle;
        row.appendChild(bookTitle);
        let issuestatus = document.createElement('td');
        issuestatus.innerText = 'Pending';
        row.appendChild(issuestatus);
        let issuedate = document.createElement('td');
        issuedate.innerText = '--------';
        row.appendChild(issuedate);
        let actualreturndate = document.createElement('td');
        actualreturndate.innerText = '--------';
        row.appendChild(actualreturndate);
        let re = document.createElement('td');
        re.innerText = '--------';
        row.appendChild(re);
        let fine = document.createElement('td');
        fine.setAttribute('id', 'fine');
        row.appendChild(fine);
        dispStatus.appendChild(row);
      }
    }
  }

  async retn(bookId: Number, issueId: number, uid: String, actualreturndate: any, returndate: any) {
    let fine = 10;
    if (new Date(actualreturndate) < new Date(returndate)) {
      let diff = (Number(new Date(returndate)) - Number(new Date(actualreturndate))) / (1000 * 60 * 60 * 24);
      fine = fine * diff;
      document.getElementById('fine').innerHTML = String(fine);
      document.querySelector('.msg').innerHTML = `Late Submission You Need To Pay ${fine} Rupees Fine..!`;
    } else {
      document.querySelector('#fine').innerHTML = String(0);
      document.querySelector('.msg').innerHTML = 'Book Returned Successfully..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 2000);

      this.deleteIssueBook(issueId, bookId, uid);
    }
  }

  async deleteIssueBook(issueId, bookId, uid) {
    await fetch('http://localhost:8080/deleteIssueBook?id=' + issueId, {
      method: 'DELETE',
    });
    this.userDetailsUpdate(uid, bookId);
  }

  async userDetailsUpdate(uid: Number, bookId: Number) {
    console.log('user details');
    let res1 = await fetch('http://localhost:8080/getById?id=' + uid);
    let user = await res1.json();
    let res2 = await fetch('http://localhost:8080/getBookById?id=' + bookId);
    let book = await res2.json();

    if (uid == user.uid) {
      console.log(user.no_of_books_taken + 'user');
      user.no_of_books_taken = --user.no_of_books_taken;
      console.log(user.no_of_books_taken + 'user');
      let url2 = 'http://localhost:8080/save';
      let par2 = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };
      await fetch(url2, par2);
    }

    if (bookId == book.bookId) {
      console.log(book.no_of_books + 'books');
      book.no_of_books = ++book.no_of_books;
      console.log(book.no_of_books + 'books');
      let url = 'http://localhost:8080/saveBook';
      let par = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      };
      await fetch(url, par);
    }
    location.reload();
  }

  render() {
    return (
      <Host>
        <p id="e" style={{ color: 'White', textAlign: 'center', fontSize: 'x-large' }} class="msg"></p>
        <div class="homeButton">
          <a href="/userhome">Back</a>
        </div>
        <table id="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Book ID</th>
              <th>Book Title</th>
              <th>Issue Status</th>
              <th>Issued Date</th>
              <th>Actual Return Date</th>
              <th>Return</th>
              <th>Fine</th>
            </tr>
          </thead>
          <tbody id="disp" class="displ"></tbody>
        </table>
      </Host>
    );
  }
}
