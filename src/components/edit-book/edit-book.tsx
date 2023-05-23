import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'edit-book',
  styleUrl: '../add-books/add-books.css',
})
export class EditBook {
  bid = localStorage.getItem('bid');

  @State() bookId: HTMLInputElement;
  @State() bookTitle: HTMLInputElement;
  @State() author: HTMLInputElement;
  @State() edition: HTMLInputElement;
  @State() no_of_books: HTMLInputElement;
  @State() category: HTMLSelectElement;

  async componentDidRender() {
    let resp = await fetch('http://localhost:8080/getBookById?id=' + this.bid);
    let book = await resp.json();
    this.category.value = book.catagory;
    this.bookId.value = book.bookId;
    this.bookTitle.value = book.bookTitle;
    this.author.value = book.author;
    this.edition.value = book.edition;
    this.no_of_books.value = book.no_of_books;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.upd();
  }

  async upd() {
    let books = {
      bookId: this.bookId.value,
      catagory: this.category.value,
      bookTitle: this.bookTitle.value,
      author: this.author.value,
      edition: this.edition.value,
      no_of_books: this.no_of_books.value,
    };
    let url = 'http://localhost:8080/saveBook';
    let par = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(books),
    };
    await fetch(url, par);
    document.querySelector('.msg').innerHTML = 'Book Updated Successfully..!';
    setTimeout(() => document.querySelector('.msg'), 2000);
    location.href = '/viewBooks';
    return;
  }
  render() {
    return (
      <Host>
        <p id="e" style={{ color: 'rgb(16, 82, 23)', textAlign: 'center' }} class="msg"></p>
        <div class="container">
          <form id="form1 " name="form1" onSubmit={this.handleSubmit.bind(this)}>
            <h1 class="form-title">Update books here</h1>
            <select name="Category" id="category" class="form-input" ref={e1 => (this.category = e1 as HTMLSelectElement)}>
              <option>-Select-</option>
              <option value="news">news</option>
              <option value="HigherEducation">HigherEducation</option>
              <option value="ProfessionalCourses">ProfessionalCourses</option>
              <option value="Competitions">Competitions</option>
              <option value="Journals">Journals</option>
              <option value="School">School</option>
              <option value="Comics">Comics</option>
              <option value="General">General</option>
              <option value="Story Books">Story Books</option>
            </select>
            <input type="text" id="bookId" class="form-input" name="bookid" autofocus placeholder="Book-ID" required readonly ref={e1 => (this.bookId = e1 as HTMLInputElement)} />
            <input
              type="text"
              id="bookTitle"
              class="form-input"
              name="booktitle"
              autofocus
              placeholder="Book Title"
              required
              ref={e1 => (this.bookTitle = e1 as HTMLInputElement)}
            />
            <input type="text" id="author" class="form-input" name="author" autofocus placeholder="Author" required ref={e1 => (this.author = e1 as HTMLInputElement)} />
            <input
              type="text"
              id="edition"
              class="form-input"
              name="edition"
              autofocus
              placeholder="Edition ex:1 or 2"
              required
              ref={e1 => (this.edition = e1 as HTMLInputElement)}
            />
            <input
              type="text"
              id="no_of_books"
              class="form-input"
              name="no_of_books"
              autofocus
              placeholder="No.of books available"
              required
              ref={e1 => (this.no_of_books = e1 as HTMLInputElement)}
            />
            <input type="submit" class="form-button" value="Update" />
          </form>
        </div>
      </Host>
    );
  }
}
