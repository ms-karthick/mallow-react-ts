import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUserMutation, useUpdateUserMutation } from "./Api";
import { UserType } from "./Dashboard";

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  editingUser?: UserType | null;
}

const schema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .nonempty("First name is required"),

  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .nonempty("Last name is required"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters")
    .nonempty("Email is required"),

  avatar: z.string().url("Please enter a valid URL").optional(),
});

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ open, onClose, editingUser }) => {
  type FormType = {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  };

  const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  };

  const { control, formState, handleSubmit, reset } = useForm<FormType>({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });

  const { isValid, isSubmitting, errors, touchedFields } = formState;

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (editingUser) {
      reset(editingUser);
    } else {
      reset(defaultValues);
    }
  }, [editingUser, reset]);

  const onSubmit = (data: FormType) => {
    if (editingUser) {
      updateUser({ id: editingUser.id, data: data })
        .unwrap()
        .then((response: any) => {
          console.log("User updated:", response);
          onClose();
          reset(defaultValues);
        })
        .catch((error) => console.error("Update error:", error));
    } else {
      createUser(data)
        .unwrap()
        .then((response: any) => {
          console.log("User created:", response);
          onClose();
          reset(defaultValues);
        })
        .catch((error) => console.error("Create error:", error));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editingUser ? "Edit User" : "Create New User"} </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="first_name"
                autoFocus
                error={!!errors.first_name}
                helperText={errors.first_name ? errors.first_name.message : ""}
              />
            )}
          />

          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="last_name"
                autoFocus
                error={!!errors.last_name}
                helperText={errors.last_name ? errors.last_name.message : ""}
              />
            )}
          />

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
            name="avatar"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product URL"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="off"
                error={!!errors.avatar}
                helperText={errors.avatar ? errors.avatar.message : ""}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid || isSubmitting}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateUserDialog;
