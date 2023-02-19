import React from 'react';
import "./Loginscreen.css";
import { useState } from 'react';
import SignUpScreen from './SignUpScreen';

function Loginscreen() {
  const [signIn, setSignIn] = useState(false);
  return <div className="loginscreen">
    <div className="loginscreen_background">
      <img className="loginscreen_logo" src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt=""/>
      <button onClick={() => setSignIn(true)} 
      className="loginscreen_button">Sign In</button>
      <div className='loginscreen_gradient'></div>
      <div className="loginscreen_body">
        {signIn ? (
          <SignUpScreen/>
        ):(
          <>
          <h1>Unlimited films, TV programmes and more</h1>
          <h2>Watch anywhere. Cancel at any time.</h2>
          <h3>Ready to watch? Enter your email to create or restart your membership</h3>

          <div className='loginscreen_input'>
            <form>
              <input type="email" placeholder="Email Address" />
              <button onClick={() => setSignIn(true)} 
              className='loginscreen_getStarted'>GET STARTED</button>
            </form>
          </div>
        </>
        )}
      </div>
    </div>
  </div>
}

export default Loginscreen