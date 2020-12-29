import React from "react";
import { Form, Input, Button } from "semantic-ui-react";
import styled from "styled-components";
import Axios from "axios";
import * as Yup from "yup";
import { useFormik, FormikValues } from "formik";
import { Card } from "./Card";
import { useRouter } from "next/router";
import { FadeIn } from "./FadeIn";
import { UserRole } from "../types/UserRole";
import ErrorMessage from "./ErrorMessage";

const H2 = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const P = styled.p`
  text-align: center;
  margin: 10px 0px 0px 0px;
`;

const A = styled.a`
  cursor: pointer;
  text-decoration: underline;
`;

const StyledCard = styled(Card)`
  max-width: 400px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Valid email is required")
    .required("Email is required"),
  username: Yup.string().required("Name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password should be at least 5 characters long"),
});

interface ISignupProps {
  userType?: UserRole;
  isSigninLinkDisabled?: boolean;
}
const Signup = ({ isSigninLinkDisabled }: ISignupProps) => {
  const router = useRouter();

  const onSubmit = async (values: FormikValues) => {
    try {
      const res = await Axios.post("/api/users/signup", {
        name: values.username,
        password: values.password,
        email: values.email,
      });
      console.log("resposne: ", res);

      router.push("/dashboard");
    } catch (error) {
      if (error === "ZERO_RESULTS") {
        return alert("Unable to identify address");
      }
      alert(error);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    submitForm,
  } = useFormik({
    validationSchema,
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <FadeIn>
      <StyledCard>
        <H2>Sign Up</H2>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Field>
          {touched.email && errors.email && (
            <ErrorMessage message={errors.email} />
          )}

          <Form.Field>
            <Input
              placeholder="Name"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Field>
          {touched.username && errors.username && (
            <ErrorMessage message={errors.username} />
          )}

          <Form.Field>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Field>
          {touched.password && errors.password && (
            <ErrorMessage message={errors.password} />
          )}
          <ButtonWrapper>
            <Button
              color="blue"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                e.preventDefault();
                submitForm();
              }}
              variant="primary"
              style={{ marginBottom: "10px" }}
            >
              Submit
            </Button>
          </ButtonWrapper>
          {!isSigninLinkDisabled && (
            <P>
              Already have an account? Click{" "}
              <A
                className="text-primary"
                onClick={() => {
                  router.push("/signin");
                }}
              >
                here
              </A>{" "}
              to sign in
            </P>
          )}
        </Form>
      </StyledCard>
    </FadeIn>
  );
};

export default Signup;
