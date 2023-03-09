import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: 'lada1234@gmail.com',
      password: '12345'
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if(!data.payload){
      alert('Failed to login')
    }
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
      console.log(data.payload.token)
    }
  }

  if(isAuth){
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required: 'Set email'})}
          fullWidth
        />
        <TextField className={styles.field} 
          {...register('password', {required: 'Set password'})}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          label="Пароль" fullWidth />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
