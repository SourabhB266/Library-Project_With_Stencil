import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'user-login',
  styleUrl: 'user-login.css',
})
export class UserLogin {

  @State() uid:HTMLInputElement ;
  @State() password :HTMLInputElement;


  handleSubmit(event:Event){
    event.preventDefault();
    this.logIn();
  }

  async logIn() {
    let condition = false;
    localStorage.setItem("uid",String(this.uid));
    let resp = await fetch("http://localhost:8080/getById?id=" + this.uid.value)
    if (resp.status == 200) {
        let user = await resp.json();
        if (this.password.value === user.password) {
            sessionStorage.setItem("uid", this.uid.value);
            sessionStorage.setItem("password", this.password.value);
            condition = true;
        }
        if (condition) {
            document.querySelector(".success").innerHTML = "Logged In Successfully..!";
            setTimeout(() => document.querySelector(".success").innerHTML = "", 2000);
            setTimeout(() => location.href = "/userhome", 2000);
        } else {
            document.querySelector("#e").innerHTML = "Invalid User ..!";
            setTimeout(() => document.querySelector("#e").innerHTML = "", 2000);
            document.querySelector(".form-input").innerHTML = "";
            setTimeout(() => location.href = "/userlogin", 2000);
        }
    }
}

  render() {
    return (
      <Host>
        <div class="row">
        <div class="column">
            <div class="container">
                <form class="form1 " name="form1" onSubmit={this.handleSubmit.bind(this)}>
                    <h1 class="form-title">User Login</h1>
                    <p id="e" style= {{color: 'White', textAlign: 'center'}} class="error password-error"></p>
                    <input type="text" id="uid" class="form-input" name="uid" autofocus placeholder="User Id" required ref={(e1) => this.uid = e1 as HTMLInputElement} />
                    <input type="password" id="password" class="form-input" name="password1" autofocus
                        placeholder="Password" required ref={(e1) => this.password = e1 as HTMLInputElement} />
                    <input type="submit" class="form-button" value="Log In"/>
                    <p class="form-text">Don't have an Account?
                        <a class="form-link" href="/usersignup" id="linkLogin"> Sign Up</a>
                    </p>
                    <p class="success" style= {{color: 'white' }}></p>
                </form>
            </div>
        </div>

    </div>
      </Host>
    );
  }

}
