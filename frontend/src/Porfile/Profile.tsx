import React, { useEffect } from "react";

const Profile = (props:any) => {
  

  useEffect(() =>{
        console.log("hI")
  },[])
  
  return(
  
  <div>
    <h1 className="title is-1">This is the About Page</h1>
    <p>
      Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
      inceptos himenaeos. Vestibulum ante ipsum primis in faucibus orci luctus
      et ultrices posuere cubilia curae; Duis consequat nulla ac ex consequat,
      in efficitur arcu congue. Nam fermentum commodo egestas.
    </p>
  </div>
)};

export default Profile;