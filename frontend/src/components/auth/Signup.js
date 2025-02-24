 import React,{useState} from "react";
import { Link } from "react-router-dom";
import app from "./FirebaseConfig";
import styles from "../../styles/Signup.module.css"


import { getAuth,RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(app);

const Signup = ()=>{
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState("");
  const [phone,setPhone] = useState("");
  const [verifyButton,setVerifyButton] = useState(false);
  const [verifyOtp,setVerifyOtp] = useState(false);
  const [otp,setOtp] = useState("");
  const [verify,setVerify] = useState(false);
  const [userType,setUserType] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(verify===true){
      console.log(fname,lname,email,password,phone);

      fetch("http://localhost:5000/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          fname:fname,
          lname:lname,
          email:email,
          password:password,
          phone:phone,
        })
      })
        .then((res)=>res.json())
        .then((data)=>{
          alert("Login Sucessful!")
          console.log(data,data.message,data.success);
          window.location.href = "./login";
        })
    }
    else{
      alert("Please Verify!")
    }
    
  }

  const onCaptchVerify = () =>{
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        onSignSubmit()
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      // 'expired-callback': () => {
      //   // Response expired. Ask user to solve reCAPTCHA again.
      //   // ...
      // }
    },
    auth
  )};

  const onSignSubmit = () =>{

    onCaptchVerify();

    const phoneNumber = "+91"+phone;
    const appVerifier = window.recaptchaVerifier;
  
    // Global variable to check if verified or not 
  
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("OTP Sent!")
        setVerifyOtp(true);
        // ...
      }).catch((error) => {
        alert("OTP not Sent! : "+error.message)
        // Error; SMS not sent
        // ...
      });
  }

  const verifyCode = ()=>{

    // we made confirmationResult global using verifyCode

    window.confirmationResult
    .confirm(otp)
    .then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user);
      alert("Verification Successful" + user);
      setVerify(true);
      setVerifyOtp(false);
      // ...
    })
    .catch((error) => {
      alert("Invalid Otp! :"+error.message);
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
  


  const changeMobile = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    if (newPhone.length === 10) {
      setVerifyButton(true);
    }
    else{
      setVerifyButton(false);
    }
  }
  

  return(
    <div className={styles.formContainer}>
      <h2>Signup</h2>
      <div id='recaptcha-container'>
          'recaptcha-container'
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="radio"
            name="UserType"
            value="User"
            onChange={(e)=>setUserType(e.target.value)}  
          />{" "}
          user
          <input
            type="radio"
            name="UserType"
            value="Admin"
            onChange={(e)=>setUserType(e.target.value)}
          />{" "}
          Admin
        </div>
        <div className={styles.formGroup}>
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Enter First Name"
            value={fname}
            onChange={(e)=>setFname(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            value={lname}
            onChange={(e)=>setLname(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Phone:</label>
          <input
              type="tel"
              placeholder="Enter Mobile"
              value={phone}
              onChange={changeMobile}
              required
          />
          {verifyButton && ( 
            <input 
              type="button" 
              value={verify?"Verified":"Verify"}
              className={styles.verify}
              onClick={onSignSubmit}
            />
          )}
        </div>
        
        { verifyOtp? (
          <div className={styles.formGroup}>
            <label>OTP:</label>
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                required
            />
            <input 
              type="button" 
              value="OTP" 
              onClick={verifyCode}
              className={styles.verify}
            />
          </div>):null
        }
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e)=>setPassword(e.target.value)}
              required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <p className={styles.link}>
        Already have an account? <Link to="/login" className={styles.Link}>Login</Link>
      </p>
    </div>
  )
}

export default Signup;