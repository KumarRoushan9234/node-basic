import React, { useEffect, useState } from "react";

const UserDetails = () => {
  const [user, setUser] = useState({ fname: "", lname: "", email: "" });

  const Logout = ()=>{
    // window.localStorage.removeItem("token"); //for only token
    window.localStorage.clear(); //clears all value
    window.location.href="./login" 
  }

  useEffect (() => {
    const fetchUserData = async ()=>{
    try {
      const response = await fetch("http://localhost:5000/userData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
      });

      if(!response.success === true){
        console.log("Error: Network response was not ok")
      }
      const data = await response.json();
      
      if(data.success){
        const fg = data.data
        console.log(fg)
        setUser(data.data);
        alert(fg.message+" "+fg.fname+" "+fg.lname)

        
      }
      else if(data.message==="token expired"){
        alert(data.message)
        window.clear()
        window.location.href("./login")
      }
      else{
        alert("Error: "+ data.message)
      }
    }
    catch (error) {
      alert("Error Recived: "+error.message)
      console.log("Error Recived: "+error.message)
    }
    }
    fetchUserData();
  },[]);
  
  
   

  return (
    <div>
      <h2>User Details</h2>
      <h5>
        User-Name: {user.fname} {user.lname}
      </h5>
      <h5>Email: {user.email}</h5>
      <br />
      <button onClick={Logout}>Logout</button>
    </div>
  );
};

export default UserDetails;
