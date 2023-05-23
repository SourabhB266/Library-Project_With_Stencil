import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'add-books',
  styleUrl: 'add-books.css',
  // shadow: true,
})
export class AddBooks {

  @State() category :HTMLSelectElement;
  @State() bookId :HTMLInputElement;
  @State() bookTitle :HTMLInputElement;
  @State() author :HTMLInputElement;
  @State() edition :HTMLInputElement;
  @State() no_of_books :HTMLInputElement;
  
  handleSubmit(event :Event){
    event.preventDefault();
    this.add();
  }
  
  async add() {
    let flag = true;
    let resp = await fetch("http://localhost:8080/getBookById?id=" + this.bookId.value);
    if (resp.status == 200) {
        let book = await resp.json();
        if (book.bookId == this.bookId.value) {
            document.querySelector('#msg').innerHTML = "Book Id Already Exist..";
            setTimeout(() => document.querySelector("#msg").innerHTML = "", 2000);
            setTimeout(() => location.reload(), 2000);
            flag = false;
        }
    }

    if (flag) {
        let books =
        {
            catagory: this.category.value,
            bookId: this.bookId.value,
            bookTitle: this.bookTitle.value,
            author: this.author.value,
            edition: this.edition.value,
            no_of_books: this.no_of_books.value,
        }
        let url = "http://localhost:8080/saveBook";
        let par = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(books)
        }
        await fetch(url, par);
        document.querySelector('#msg').innerHTML = "Book Added Successfully..";
        setTimeout(() => document.querySelector("#msg").innerHTML = "", 2000);
        setTimeout(() => location.reload(), 2000);
    }

}

  render() {
    return (
      <Host>
        <div class="homeButton">
          <a href="/adminhome">Back</a>
        </div>
        <div class="column">
          <div class="container">
            <span id="msg" style={{ color: 'darkorange', fontSize: 'large', fontWeight: 'bold', margin: 'auto', textAlign: 'center' }}></span>
            <form id="form1 " name="form1" onSubmit={this.handleSubmit.bind(this)} >
              <h1 class="form-title">Add Books Here</h1>
              <select name="Category" id="category" class="form-input" ref={e1 => this.category= e1 as HTMLSelectElement}>
                <option>-Select-</option>
                <option value="news">Magazines</option>
                <option value="HigherEducation">HigherEducation</option>
                <option value="ProfessionalCourses">ProfessionalCourses</option>
                <option value="Competitions">Competitions</option>
                <option value="Journals">Journals</option>
                <option value="School">School</option>
                <option value="Comics">Comics</option>
                <option value="General">General</option>
                <option value="Story Books">Story Books</option>
              </select>
              <input type="text" id="bookid" class="form-input" name="bookid" autofocus placeholder="Book-ID" required ref={e1 => this.bookId= e1 as HTMLInputElement}/>
              <input type="text" id="booktitle" class="form-input" name="booktitle" autofocus placeholder="Book Title" required ref={e1 => this.bookTitle= e1 as HTMLInputElement}/>
              <input type="text" id="author" class="form-input" name="author" autofocus placeholder="Author" required ref={e1 => this.author= e1 as HTMLInputElement}/>
              <input type="text" id="edition" class="form-input" name="edition" autofocus placeholder="Edition ex:1 or 2" required ref={e1 => this.edition= e1 as HTMLInputElement}/>
              <input type="text" id="no_of_books" class="form-input" name="no_of_books" autofocus placeholder="No.of books available" required ref={e1 => this.no_of_books= e1 as HTMLInputElement}/>
              <input type="submit" class="form-button" value="Add" />
            </form>
          </div>
        </div>
      </Host>
    );
  }
}
