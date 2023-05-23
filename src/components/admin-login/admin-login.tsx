import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'admin-login',
  styleUrl: 'admin-login.css',
})
export class AdminLogin {

  @State() username :HTMLInputElement;
  @State() password :HTMLInputElement;

  handleSubmit(event:Event){
    event.preventDefault();
    this.login();
  }

  async login() {
    let condition = false;

    let resp = await fetch("http://localhost:8080/getAdminByName?name=" + this.username.value)
    if (resp.status == 200) {
        let admin = await resp.json();
        if (this.password.value === admin.password) {
            condition = true;
            sessionStorage.setItem("username", this.username.value);
            sessionStorage.setItem("password", this.password.value);
        }
        if (condition) {
            document.querySelector(".success").innerHTML = "Logged In Successfully..!";
            setTimeout(() => document.querySelector(".success").innerHTML = "", 2000);
            setTimeout(() => location.href = "/adminhome", 2000);
        }
        else {
            document.querySelector(".error").innerHTML = "Please Enter Valid Credential ..!";
            setTimeout(() => document.querySelector(".error").innerHTML = "", 2000);
            document.querySelector(".form-input").innerHTML = "";
            setTimeout(() => location.href = "/adminlogin", 2000);
            return false;
        }
    }
}

  render() {
    return (
      <Host>
        <div class="container">
            <form class="form1 " name="form1" onSubmit={this.handleSubmit.bind(this)} >
                <h1 class="form-title">Admin Login</h1>
                <p id="e" style= {{color: 'red',}} class="error"></p>
                <input type="text" id="username" class="form-input" name="username1" autofocus placeholder="Username"
                    required ref={e1 => this.username= e1 as HTMLInputElement}/>
                <input type="password" id="password" class="form-input" name="password1" autofocus
                    placeholder="Password" required  ref={e1 => this.password= e1 as HTMLInputElement}/>
                <div class="wrong"></div>
                <input type="submit" class="form-button" value="Log In"/>
                <p class="success" style= {{color: 'white'}}></p>
            </form>
        </div>
      </Host>
    );
  }
}
