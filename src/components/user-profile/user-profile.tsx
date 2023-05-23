import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'user-profile',
  styleUrl: 'user-profile.css',
  // shadow: true,
})
export class UserProfile {
  @State() fname: HTMLInputElement;
  @State() lname: HTMLInputElement;
  @State() gender: HTMLSelectElement;
  @State() dob: HTMLInputElement;
  @State() mbnumber: HTMLInputElement;
  @State() email: HTMLInputElement;
  @State() uid2: HTMLInputElement;
  @State() oldPass: HTMLInputElement;

  @State() uid1: HTMLInputElement;
  @State() psd: HTMLInputElement;
  @State() newpsd: HTMLInputElement;
  @State() newcpsd: HTMLInputElement;

  handleChangePassword(event: Event) {
    event.preventDefault();
    this.change();
  }
  handleUpdate(event: Event) {
    event.preventDefault();
    this.upd();
  }
  componentDidRender() {
    this.profile1();
  }
  uid = sessionStorage.getItem('uid');
  passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  phoneno = /^[6-9]\d{9}$/;
  emailPattern = /^([a-zA-z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,3})$/;
  async profile1() {
    let resp = await fetch('http://localhost:8080/getById?id=' + this.uid);
    let user = await resp.json();
    let tbl = document.querySelector('.profile');
    let data = '';
    data += ` <table>
        <tbody>
            <tr>
                <th>Reg No</th>
                <td>${user.uid}</td>
            </tr>
            <tr>
                <th>Full Name</th>
                <td>${user.fname + ' ' + user.lname}</td>
            </tr>
            <tr>
                <th>Email Adress</th>
                <td>${user.email}</td>
            </tr>
            <tr>
                <th>Gender</th>
                <td>${user.gender}</td>
            </tr>
            <tr>
                <th>DOB</th>
                <td>${user.dob}</td>
            </tr>
            <tr>
                <th>Mobile Number</th>
                <td>${user.mobilenumber}</td>
            </tr>
            <tr>
            <th>No.of books taken</th>
            <td>${user.no_of_books_taken}</td>
            </tr>
          </tbody>
       </table>`;

    tbl.innerHTML = data;
  }
  update() {
    let tbl: HTMLDivElement = document.querySelector('.profile');
    let container: HTMLDivElement = document.querySelector('.container');
    let container1: HTMLDivElement = document.querySelector('.container1');
    tbl.style.display = 'none';
    container.style.display = 'none';
    container1.style.display = 'block';
  }

  async upd() {
    if (this.validation1()) {
      let resp = await fetch('http://localhost:8080/getById?id=' + this.uid);
      let user = await resp.json();

      (user.uid = this.uid),
        (user.fname = this.fname.value),
        (user.lname = this.lname.value),
        (user.gender = this.gender.value),
        (user.dob = this.dob.value),
        (user.mobilenumber = this.mbnumber.value),
        (user.email = this.email.value);

      let url = 'http://localhost:8080/save';
      let par = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };
      await fetch(url, par);

      document.querySelector('.msg').innerHTML = 'Profile is updated successfully..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 2000);
      location.reload();
    }
  }

  validation1() {
    if (this.uid2.value != this.uid) {
      document.querySelector('.msg').innerHTML = 'Invalid user Id..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 2000);
      return false;
    } else if (!this.mbnumber.value.match(this.phoneno)) {
      document.querySelector('.msg').innerHTML = 'Please enter valid mobile number..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 2000);
      return false;
    } else if (!this.email.value.match(this.emailPattern)) {
      document.querySelector('.msg').innerHTML = 'Please enter valid email address..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 2000);
      return false;
    } else {
      return true;
    }
  }

  changePassword() {
    let tbl: HTMLDivElement = document.querySelector('.profile');
    let container: HTMLDivElement = document.querySelector('.container');
    let container1: HTMLDivElement = document.querySelector('.container1');
    tbl.style.display = 'none';
    container1.style.display = 'none';
    container.style.display = 'block';
  }

  async change() {
    if (this.validation()) {
      let resp = await fetch('http://localhost:8080/getById?id=' + this.uid);
      let user = await resp.json();

      (user.uid = this.uid), (user.password = this.newpsd.value), (user.con_password = this.newcpsd.value);
      let url = 'http://localhost:8080/save';
      let par = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };
      await fetch(url, par);
      document.querySelector('.msg').innerHTML = 'Password is changed successfully..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 3000);
      location.reload();
    }
  }

  async validation() {
    let resp = await fetch('http://localhost:8080/getById?id=' + this.uid);
    let user = await resp.json();
    if (this.uid1.value !== this.uid) {
      document.querySelector('.msg').innerHTML = 'Invalid user Id..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 2000);
      return false;
    } else if (!(this.oldPass.value == user.password)) {
      document.querySelector('.msg').innerHTML = 'Invalid Old password..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 2000);
      return false;
    } else if (this.oldPass.value.length < 8) {
      document.querySelector('.msg').innerHTML = 'Password should be atleast 8 characters long..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 2000);
      return false;
    } else if (!this.oldPass.value.match(this.passPattern)) {
      document.querySelector('.msg').innerHTML = 'password should be strong..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 2000);
      return false;
    } else if (!(this.newpsd.value == this.newcpsd.value)) {
      document.querySelector('.msg').innerHTML = 'Password should be matched..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 2000);
      return false;
    } else if (this.newcpsd.value == user.password) {
      document.querySelector('.msg').innerHTML = 'You should not use previous last 3 passwords as new password..!';
      setTimeout(() => (document.querySelector('.msg').innerHTML = ''), 2000);
      return false;
    } else {
      return true;
    }
  }

  cancel() {
    let tbl: HTMLDivElement = document.querySelector('.profile');
    let container: HTMLDivElement = document.querySelector('.container');
    let container1: HTMLDivElement = document.querySelector('.container1');
    tbl.style.display = 'block';
    container1.style.display = 'none';
    container.style.display = 'none';
  }

  render() {
    return (
      <Host>
        <div class="homeButton">
          <a href="/userhome">Back</a>
        </div>
        <div class="prf">
          <p class="dt">Profile</p>
          <p id="edt" onClick={() => this.update()}>
            Edit
          </p>
          <p class="cp" onClick={() => this.changePassword()}>
            Change Password
          </p>
          <p id="e" style={{ color: 'white', textAlign: 'center' }} class="msg"></p>
          <div class="profile"></div>
          <div class="container" style={{ display: 'none' }}>
            <form class="form" id="changepassword" name="form2" onSubmit={this.handleChangePassword.bind(this)}>
              <h1 class="form-title">Change Password</h1>
              <input type="text" class="form-input" name="uid" id="uid" autofocus placeholder="Reg No" required ref={e1 => (this.uid1 = e1 as HTMLInputElement)} />
              <input
                type="password"
                class="form-input"
                name="password"
                id="password"
                autofocus
                placeholder="Old Password"
                required
                ref={e1 => (this.oldPass = e1 as HTMLInputElement)}
              />
              <input
                type="password"
                class="form-input"
                name="password"
                id="password1"
                autofocus
                placeholder="New Password"
                required
                ref={e1 => (this.newpsd = e1 as HTMLInputElement)}
              />
              <input
                type="password"
                class="form-input "
                name="confirm_password"
                id="conpassword1"
                autofocus
                placeholder="Confirm New Password"
                required
                ref={e1 => (this.newcpsd = e1 as HTMLInputElement)}
              />
              <br />
              <br />
              <input type="submit" class="form-button" value="Change" id="change" />
              <br />
              <br />
              <input type="button" class="form-button" value="cancel" onClick={() => this.cancel() } />
            </form>
          </div>
          <div class="container1" style={{ display: 'none' }}>
            <form class="form" id="updateprofile" name="form3" onSubmit={this.handleUpdate.bind(this)}>
              <h1 class="form-title">Update Profile</h1>
              <input type="text" class="frm1" name="uid" id="uid1" autofocus placeholder="Reg No" required ref={e1 => (this.uid2 = e1 as HTMLInputElement)} />
              <input type="text" class="frm1" name="fname" id="fname" autofocus placeholder="First Name" required ref={e1 => (this.fname = e1 as HTMLInputElement)} />
              <input type="text" class="frm1" name="lname" id="lname" autofocus placeholder="Last Name" required ref={e1 => (this.lname = e1 as HTMLInputElement)} />
              <select class="frm1" id="gender" ref={e1 => (this.gender = e1 as HTMLSelectElement)}>
                <option class="choose">Male</option>
                <option class="choose">Female</option>
                <option class="choose">Other</option>
              </select>
              <input type="date" class="frm1" id="dob" required ref={e1 => (this.dob = e1 as HTMLInputElement)} />
              <input
                type="text"
                class="frm1"
                name="mobilenumber"
                id="mbnumber"
                autofocus
                placeholder="Contact Number"
                required
                ref={e1 => (this.mbnumber = e1 as HTMLInputElement)}
              />
              <input type="email" class="frm1" name="email" id="email" autofocus placeholder="Email Address" required ref={e1 => (this.email = e1 as HTMLInputElement)} />
              <input type="submit" class="frm-btn" value="Update" id="upd" />
              <br />
              <input type="button" class="frm-btn" value="Cancel" onClick={()=> this.cancel()}/>
            </form>
          </div>
        </div>
      </Host>
    );
  }
}
