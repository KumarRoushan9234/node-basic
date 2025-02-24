import React,{ useState} from 'react'
import { Link } from 'react-router-dom'
import styles from "../../styles/Login.module.css"

const Login = () =>{
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(email,password)

    fetch("http://localhost:5000/login-user",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        email:email,
        password:password
      })
    })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data,"registered");
        if(data.success === true){
          alert("login successful")
          window.localStorage.setItem("token",data.data) 
          // for logout handling
          window.localStorage.setItem("loggedIn","true") 
          window.location.href = "./userDetail"; 
        }
        else{
          // console.log(``)
          alert("login failed : "+ data.message)
        }
      })
      .catch((error)=>{
        console.log("Error Occured during login"+error.message)
        alert("Login Failed")
      })

  }


  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} >
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className={styles.link}>
        Don't have an account? <Link to="/signup"
         className={styles.Link}>Signup</Link> here.
      </p>
      <hr/>
      <p className={styles.link}>
        Forgot Password? <Link to="/reset" className={styles.Link}>Reset Password</Link> here.

      </p>
    </div>
  )
}

export default Login;