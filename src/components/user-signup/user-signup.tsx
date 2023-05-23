import { Component, Host, h,State } from '@stencil/core';

@Component({
  tag: 'user-signup',
  styleUrl: 'user-signup.css',
})
export class UserSignup {
  @State() uid: HTMLInputElement;
  @State() fname: HTMLInputElement ;
  @State() lname: HTMLInputElement ;
  @State() gender:  HTMLSelectElement;
  @State() dob:  HTMLInputElement;
  @State() mbnumber:  HTMLInputElement;
  @State() email:  HTMLInputElement;
  @State() password:  HTMLInputElement;
  @State() conpassword:  HTMLInputElement;
  @State() phoneno = /^[6-9]\d{9}$/;
  @State() emailPattern =  /^([a-zA-z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,3})$/;
  @State() passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  @State() nbk =0;

  handleSubmit(event :Event){
    event.preventDefault();
    if (!this.mbnumber.value.match(this.phoneno)) {
      console.log(this.mbnumber.value)
      document.querySelector("#error").innerHTML = "Please enter valid mobile number..!";
      setTimeout(() => document.querySelector(".error-message").innerHTML = "", 2000);
    }
    else if (!this.email.value.match(this.emailPattern)) {
      document.querySelector(".error-message").innerHTML = "Please enter valid Email Address..!";
      setTimeout(() => document.querySelector(".error-message").innerHTML = "", 2000);
    } else if ((this.password.value).length < 8) {
      document.querySelector(".error-message").innerHTML = "Password should be atleast 8 characters long..!";
      setTimeout(() => document.querySelector(".error-message").innerHTML = "", 2000);
    } else if (!this.password.value.match(this.passPattern)) {
      document.querySelector(".error-message").innerHTML = "Password Should be Strong..!";
      setTimeout(() => document.querySelector(".error-message").innerHTML = "", 2000);
    } else if (!this.conpassword.value.match(this.password.value)) {
      document.querySelector("#error").innerHTML = "Password and Confirm Password Should Match..!";
      setTimeout(() => document.querySelector("#error").innerHTML = "", 2000);
      setTimeout(() => location.href = "/usersignup", 2000);
    }else{
      this.checkUser();
    }
  }

  async checkUser() {
    let url = "http://localhost:8080/getById?id=" + this.uid.value;
    let response = await fetch(url);
    if (response.status == 200) {
      document.querySelector(".error-message").innerHTML = "User Id Already Exist Please Login..!";
      setTimeout(() => document.querySelector(".error-message").innerHTML = "", 2000);
      location.href = ("/usersignup");
    }
    else {
      this.signUp();
    }
  }

  async signUp() {
    let users = {
      'uid': this.uid.value,
      'fname': this.fname.value,
      'lname': this.lname.value,
      'mobilenumber': this.mbnumber.value,
      'email': this.email.value,
      'dob': this.dob.value,
      'gender': this.gender.value,
      'password': this.password.value,
      'con_password': this.conpassword.value,
      'no_of_books_taken': this.nbk,
    }
  
    let url = 'http://localhost:8080/save';
    let par = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(users)
    }
  
    await fetch(url, par);
    document.querySelector(".error-message").innerHTML = "You've signed up successfully..!";
    setTimeout(() => document.querySelector(".error-message").innerHTML = "", 3000);
    location.href = ('/userlogin');
  }

  render() {
    return (
      <Host>
        <p class="error-message" id="error"> </p>
        <div class="container1" >
        <form  onSubmit={this.handleSubmit.bind(this)}  class="form" id="createAccount" name="form2" >
            <h1 class="form-title" >Sign Up</h1>
            <input type="text" class="frm1" name="uid" id="uid" autofocus placeholder="Reg No" required ref={(e1) => this.uid = e1 as HTMLInputElement} />
            <input type="text" class="frm1" name="fname" id="fname" autofocus placeholder="First Name" required ref={(e1) =>this.fname = e1 as HTMLInputElement} />
            <input type="text" class="frm1" name="lname" id="lname" autofocus placeholder="Last Name" required ref={(e1) =>this.lname= e1 as HTMLInputElement} />
            <select class="frm1" id="gender" ref={(e1) =>this.gender= e1 as HTMLSelectElement} >
                <option class="choose">Male</option>
                <option class="choose">Female</option>
                <option class="choose">Other</option>
            </select>
            <input type="date" class="frm1" id="dob" required ref={(e1) =>this.dob= e1 as HTMLInputElement} />
            <input type="text" class="frm1" name="mobilenumber" id="mbnumber" autofocus placeholder="Contact Number"
                required ref={(e1) =>this.mbnumber= e1 as HTMLInputElement} />
            <input type="email" class="frm1" name="email" id="email" autofocus placeholder="Email Address" required ref={(e1) =>this.email = e1 as HTMLInputElement} />
            <input type="password" class="frm1" name="password" id="password" autofocus placeholder="Password" required ref={(e1) =>this.password= e1 as HTMLInputElement} />
            <input type="password" class="frm1 " name="confirm_password" id="conpassword" autofocus
                placeholder="Confirm Password" required ref={(e1) =>this.conpassword= e1 as HTMLInputElement} /><br/><br/>
            <p id="e" > </p>
            <input type="submit" class="frm-btn" value="Sign Up" />
            <p class="form-text"  >Already have an Account?
                <a class="form-link" href='/userlogin' > Sign In</a>
            </p>
        </form>

    </div>
      </Host>
    );
  }

 

}
