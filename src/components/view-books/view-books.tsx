import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'view-books',
  styleUrl: 'view-books.css',
  // shadow: true,
})
export class ViewBooks {
  async componentDidRender() {
    let resp = await fetch('http://localhost:8080/getAllBooks');
    let books = await resp.json();
    let dispbooks = document.querySelector('#disp-books');
    let count = 0;
    
    dispbooks.innerHTML = '';
    for (let book of books) {
      let row = document.createElement('tr');
      let slno = document.createElement('td');
      slno.innerText = String(++count);
      row.appendChild(slno);
      let catagory = document.createElement('td');
      catagory.innerText = book.catagory;
      row.appendChild(catagory);
      let bookId = document.createElement('td');
      bookId.innerText = book.bookId;
      row.appendChild(bookId);
      let bookTitle = document.createElement('td');
      bookTitle.innerText = book.bookTitle;
      row.appendChild(bookTitle);
      let author = document.createElement('td');
      author.innerText = book.author;
      row.appendChild(author);
      let edition = document.createElement('td');
      edition.innerText = book.edition;
      row.appendChild(edition);
      let no_of_books = document.createElement('td');
      no_of_books.innerText = book.no_of_books;
      row.appendChild(no_of_books);

      let edit = document.createElement('td');
      let image = document.createElement('img');
      image.setAttribute('src', '../../assets/edit.png');
      image.addEventListener('click', () => {
        this.editBook(book.bookId);
      });
      edit.appendChild(image);
      row.appendChild(edit);
      dispbooks.appendChild(row);

      let del = document.createElement('td');
      let image1 = document.createElement('img');
      image1.setAttribute('src', '../../assets/delete.jpg');
      image1.addEventListener('click', () => {
        this.deleteBooks(book.bookId);
      });
      del.appendChild(image1);
      row.appendChild(del);
      dispbooks.appendChild(row);
    }
  }

  editBook(bookId: Number) {
    console.log(bookId + 'Book edit');
    localStorage.setItem('bid', String(bookId));
    location.href = '/editbook';
  }

  async deleteBooks(bookId: number) {
    console.log(bookId, 'delete');
     await fetch('http://localhost:8080/deleteBook?id=' + bookId, {
      method: 'DELETE',
    });
    location.reload();
  }

  render() {
    return (
      <Host>
        <p class="dt">Books</p>
        <div class="homeButton">
          <a href="/adminhome">Back</a>
        </div>
        <table id="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Category</th>
              <th>Book ID</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Edition</th>
              <th>No.of books Available</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="disp-books"></tbody>
        </table>
      </Host>
    );
  }
}
