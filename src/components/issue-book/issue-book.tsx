import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'issue-book',
  styleUrl: 'issue-book.css',
  // shadow: true,
})
export class IssueBook {

 componentDidRender(){
  this.displaying();
 }

async displaying() {
  let dispRequest = document.getElementById("disp-requests");
  console.log(dispRequest);
    let count = 0;
    let res = await fetch("http://localhost:8080/getAllRequest");
    let requests = await res.json();
    for (let r of requests) {
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
      let uid = document.createElement('td');
      uid.innerText = r.uid;
      row.appendChild(uid);
      let uname = document.createElement('td');
      uname.innerText = r.uname;
      row.appendChild(uname);
      let td = document.createElement('td');
      td.innerText = r.td;
      row.appendChild(td);
  
      let apprv = document.createElement('td');
      let button = document.createElement('button');
      button.setAttribute("value","Approve");
      button.innerText="Approve";
      button.addEventListener('click', () => {
        this.approve(r.bookId,r.uid,r.id);
      });
      apprv.appendChild(button);
      row.appendChild(apprv);
      dispRequest.appendChild(row);
    }
}

 dt = new Date().toISOString().substring(0, 10);
 rt = this.addWeeks(2);
 issuestatus = false;
 returnbook;

async approve(bookId:Number, uid:Number, rid:Number) {
    console.log("approved");
    let res = await fetch("http://localhost:8080/getAllRequest");
    let requests = await res.json();
    if (true) {
        for (let r of requests) {
            if (uid == r.uid && r.bookId == bookId) {
                let issuebooks = {
                    bookId: r.bookId,
                    bookTitle: r.bookTitle,
                    uid: r.uid,
                    uname: r.uname,
                    issuedate: this.dt,
                    actualreturndate: this.rt,
                    issuestatus: true,
                }
                let url = "http://localhost:8080/saveIssueBook";
                let par = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(issuebooks)
                }
                await fetch(url, par);
                await this.userDetailsUpdate(uid, bookId);
                document.querySelector(".msg").innerHTML = "Book Issued Successfully..!";
                setTimeout(() => document.querySelector(".msg").innerHTML = "", 2000);
                await this.requestDelete(rid);
                location.reload();
                break;
            }

        }
    }
}

async requestDelete(rid:Number) {
    console.log("delete" + rid);
    await fetch("http://localhost:8080/deleteRequest?id=" + rid, {
        method: "DELETE"
    }).then(() => location.reload());
}

async userDetailsUpdate(uid:Number, bookId:Number) {
    console.log("user details");
    let res1 = await fetch("http://localhost:8080/getById?id="+uid);
    let user = await res1.json();
    let res2 = await fetch("http://localhost:8080/getBookById?id="+bookId);
    let book = await res2.json();

    if (uid == user.uid) {
        console.log(user.no_of_books_taken + "user");
        user.no_of_books_taken = ++user.no_of_books_taken;
        console.log(user.no_of_books_taken + "user");
        let url2 = 'http://localhost:8080/save';
        let par2 = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        await fetch(url2, par2);
    }

    if (bookId == book.bookId) {
        console.log(book.no_of_books + "books");
        book.no_of_books = --book.no_of_books;
        console.log(book.no_of_books + "books");
        let url = "http://localhost:8080/saveBook";
        let par = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        }
        await fetch(url, par);

    }

}

addWeeks(numOfWeeks, date = new Date()) {
    date.setDate(date.getDate() + numOfWeeks * 7);
    return date.toISOString().substring(0, 10);
}

  render() {
    return (
      <Host>
        <div class="homeButton">
          <a href="/adminhome">Back</a>
        </div>
        <p id="e" style={{ color: 'red', textAlign: 'center' }} class="msg"></p>
        <div class={'column'}>
          <table id="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Book ID</th>
                <th>Book Title</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Requested Date</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody id="disp-requests"></tbody>
          </table>
        </div>
      </Host>
    );
  }
}
