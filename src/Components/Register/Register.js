import React,{ useState } from "react";

const Register=({handleRoute,loadUser})=>{

  const [name, setName] = useState("");
  const [email, setSignInEmail] = useState("");
  const [password, setSignInPassword] = useState("");


const onEmailChange=(event)=>{
  setSignInEmail(event.target.value);
}

const onPasswordChange=(event)=>{
  setSignInPassword(event.target.value);
}

const onNameChange=(event)=>{
  setName(event.target.value)
}

const onSignInSubmit=()=>{
  fetch('http://localhost:3000/register',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      email:email,
      password:password,
      name:name
    })
  })
  .then(res=>res.json()
  .then(user=>{
    if(user.id){
      loadUser(user);
      handleRoute('home');
    }else{
      window.alert('unable to register');
    }
  })
    .catch(err=>{
      res.status(400).send('unable to register');
    }));
  
}


    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  onChange={onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  onChange={onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  onChange={onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={onSignInSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    )
}

export default Register;