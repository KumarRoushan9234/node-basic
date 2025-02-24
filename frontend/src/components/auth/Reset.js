import react,{useState} from "react";
import { Form, Link } from 'react-router-dom';
import styles from "../../styles/Login.module.css";

const Reset = ()=>{
  const [email,setEmail] = useState("");
  const [error,setError] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    fetch("http://localhost:5000/forgot-password",{
      method: "POST",
      crossDomain: true,
      header: {         "Content-Type":"application/json",
      Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
  })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data.success,data.message);
      
    })
}

  return(
    <div className={styles.container}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange ={(e)=>{
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={styles.formGroup}>
          <button>Submit</button>
        </div>
        <p>
          <a href="/sign-up" className={styles.Link}>Sign Up</a>
        </p>
      </form>
    </div>
  )
}
export default Reset;