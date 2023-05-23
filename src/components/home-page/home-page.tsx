import { Component, h, Host, Prop, State } from '@stencil/core';
@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css',
  shadow: true,
})
export class HomePage {
  @Prop({ mutable: true }) name1: string;
  @State() APIData: string;
  @Prop() type: string;

  signUp() { 
      location.href = '/usersignup'; 
  }

  componentWillUpdate() {
    console.log('Iam Updated');
  }

  loginType(event) {
    this.type = event.target.value;
    this.changeState();
  }
  changeState() {
    if (this.type === 'user') {
      location.href = '/userlogin';
    }
    if (this.type === 'admin') {
      location.href = '/adminlogin';
    }
  }

  render() {
    return (
      <Host>
        <nav>
          <ul>
            <li>
              <a class="active" href="#home">
                Home
              </a>
            </li>
            <li>
              <a href="#news">News</a>
            </li>
            <li>
              <a href="#HigherEducation">Higher Education</a>
            </li>
            <li>
              <a href="#ProfessionalCourses">Professional Courses</a>
            </li>
            <li>
              <a href="#Competitions">Competitions</a>
            </li>
            <li>
              <a href="#General">General</a>
            </li>
            <li>
              <a href="#School">School</a>
            </li>
            <li>
              <a href="#StoryBooks">Story Books</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <select name="forms" id="signselect" onInput={this.signUp}>
                <option value="signup">Sign Up</option>
                <option value="user" selected={this.type === 'user'}>
                  User Signup
                </option>
              </select>
            </li>

            <li>
              <select name="forms" id="logselect" onInput={e => this.loginType(e)}>
                <option value="login">Log In</option>
                <option value="admin" selected={this.type === 'admin'}>
                  Admin Login
                </option>
                <option value="user" selected={this.type === 'user'}>
                  User Login
                </option>
              </select>
            </li>
          </ul>
        </nav>
      </Host>
    );
  }
}
