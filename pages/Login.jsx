import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import "./global.css";

import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/component/Navbar";

const Login =()=>{
    const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);
    console.log(`Username :${inputUsername}, Password :${inputPassword}`);
    if (inputUsername !== "admin" || inputPassword !== "admin") {
      setShow(true);
    }
    setLoading(false);
  };

  const handlePassword = () => {};

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return (

    <>
<Navbar />
    
        
        <div className="wrapper">
          
            
        
          {/* Form */}
          <Form className="logincontainer" onSubmit={handleSubmit}>
            {/* Header */}
            <div className="logocontainer">
            <img src="/Logof.png" width={210} height={120} />
            </div>
            <div className="logintext">Sign In</div>
            
            
            {/* ALert */}
            {show ? (
              <Alert
                
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                Incorrect username or password.
              </Alert>
            ) : (
              <div />
            )}
            <div className="formdetails">
            <Form.Group  controlId="username">
              
              <Form.Control
                type="text"
                value={inputUsername}
                placeholder="Username"
                onChange={(e) => setInputUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              
              <Form.Control
                type="password"
                value={inputPassword}
                placeholder="Password"
                onChange={(e) => setInputPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className="formdetailsbtn">
                {!loading ? (
                <Button variant="link"  type="submit">
                    Log In
                </Button>
                ) : (
                <Button variant="link" type="submit" disabled>
                    Logging In...
                </Button>
                )}
                <div className="d-grid justify-content-end">
                <Button
                    className="text-muted px-0"
                    variant="link"
                    onClick={handlePassword}
                >
                    Forgot password?
                </Button>
                </div>
                </div>
            </div>
            
            
          </Form>
          <div className="slidshow"></div>
        </div>
        </>
      );
    };

export default Login;