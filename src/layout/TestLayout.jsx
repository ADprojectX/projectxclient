import { useState } from "react";
import {  Outlet } from "react-router-dom";


const TestLayout = () => {
    const [title, setTitle] = useState("kiki");
  
    return (
      <>
        <h1>Title: {title}</h1>
        <Outlet context={ { title } } />
      </>
    );
  };

export default TestLayout;