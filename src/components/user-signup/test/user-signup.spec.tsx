import { UserSignup } from "../user-signup";

describe('user-signup', () => {
  it('Expect value', async () => {
    const r = new UserSignup();
    let users = {
      'uid': 103,
      'fname': "Raj",
      'lname': "M"  
    }

    expect(await r.signUp()).toEqual("Saved");
    });  
  });

