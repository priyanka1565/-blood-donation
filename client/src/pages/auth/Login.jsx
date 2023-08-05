import React from "react";
import InputType from "../../components/Shared/form/InputType";
import Form from "../../components/Shared/form/Form";

const Login = () => {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8 form-banner">
          <img src="./assets/images/banner1.jpg" alt="" />
        </div>
        <div className="col-md-4 from-container">
          <Form fromTitle={'Login Page'} submitBtn={'Login'} formType={"login"}/>
        </div>
      </div>
    </>
  );
};

export default Login;
