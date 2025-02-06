import React from "react";
import { TextField, Button, Box, Typography, Container, CssBaseline, Avatar } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSignInMutation } from "../../auth/AuthApi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../auth/AuthContext";

const schema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(4, "Password is too short - should be 4 chars minimum.")
    .nonempty("Password is required"),
});

type FormType = {
  email: string;
  password: string;
};

const defaultValues = {
  email: "",
  password: "",
};

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const { login } = useAuth();
  const { control, formState, handleSubmit } = useForm<FormType>({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });

  const { isValid, isSubmitting, errors, touchedFields } = formState;

  const onSubmit = (data: FormType) => {
    // console.log('data ', data);
    const { email, password } = data;
    signIn({ email, password })
      .unwrap()
      .then((response) => {
        console.log("response =>", response);

        login(response);

        navigate("/dashboard");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ mt: 1 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid || isSubmitting}
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SignInPage;
