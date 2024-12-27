// import { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// // material-ui
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import InputAdornment from '@mui/material/InputAdornment';
// import IconButton from '@mui/material/IconButton';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';

// // project import
// import AnimateButton from 'components/@extended/AnimateButton';
// import { strengthColor, strengthIndicator } from 'utils/password-strength';

// // assets
// import EyeOutlined from '@ant-design/icons/EyeOutlined';
// import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// // ============================|| JWT - REGISTER ||============================ //

// export default function AuthRegister() {
//   const [level, setLevel] = useState();
//   const [showPassword, setShowPassword] = useState(false);
//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const changePassword = (value) => {
//     const temp = strengthIndicator(value);
//     setLevel(strengthColor(temp));
//   };

//   useEffect(() => {
//     changePassword('');
//   }, []);

//   return (
//     <>
//       <Formik
//         initialValues={{
//           firstname: '',
//           lastname: '',
//           email: '',
//           company: '',
//           password: '',
//           submit: null
//         }}
//         validationSchema={Yup.object().shape({
//           firstname: Yup.string().max(255).required('First Name is required'),
//           lastname: Yup.string().max(255).required('Last Name is required'),
//           email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//           password: Yup.string().max(255).required('Password is required')
//         })}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="firstname-signup">Full Name*</InputLabel>
//                   <OutlinedInput
//                   fullWidth
//                     id="firstname-login"
//                     type="firstname"
//                     value={values.firstname}
//                     name="firstname"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="John"
//                     error={Boolean(touched.firstname && errors.firstname)}
//                   />
//                 </Stack>
//                 {touched.firstname && errors.firstname && (
//                   <FormHelperText error id="helper-text-firstname-signup">
//                     {errors.firstname}
//                   </FormHelperText>
//                 )}
//               </Grid>
             
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="company-signup">Hospital Name</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.company && errors.company)}
//                     id="company-signup"
//                     value={values.company}
//                     name="company"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Demo Inc."
//                     inputProps={{}}
//                   />
//                 </Stack>
//                 {touched.company && errors.company && (
//                   <FormHelperText error id="helper-text-company-signup">
//                     {errors.company}
//                   </FormHelperText>
//                 )}
//               </Grid>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.email && errors.email)}
//                     id="email-login"
//                     type="email"
//                     value={values.email}
//                     name="email"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="demo@company.com"
//                     inputProps={{}}
//                   />
//                 </Stack>
//                 {touched.email && errors.email && (
//                   <FormHelperText error id="helper-text-email-signup">
//                     {errors.email}
//                   </FormHelperText>
//                 )}
//               </Grid>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="password-signup">Password</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.password && errors.password)}
//                     id="password-signup"
//                     type={showPassword ? 'text' : 'password'}
//                     value={values.password}
//                     name="password"
//                     onBlur={handleBlur}
//                     onChange={(e) => {
//                       handleChange(e);
//                       changePassword(e.target.value);
//                     }}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                           edge="end"
//                           color="secondary"
//                         >
//                           {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     placeholder="******"
//                     inputProps={{}}
//                   />
//                 </Stack>
//                 {touched.password && errors.password && (
//                   <FormHelperText error id="helper-text-password-signup">
//                     {errors.password}
//                   </FormHelperText>
//                 )}
//                 <FormControl fullWidth sx={{ mt: 2 }}>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item>
//                       <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
//                     </Grid>
//                     <Grid item>
//                       <Typography variant="subtitle1" fontSize="0.75rem">
//                         {level?.label}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="body2">
//                   By Signing up, you agree to our &nbsp;
//                   <Link variant="subtitle2" component={RouterLink} to="#">
//                     Terms of Service
//                   </Link>
//                   &nbsp; and &nbsp;
//                   <Link variant="subtitle2" component={RouterLink} to="#">
//                     Privacy Policy
//                   </Link>
//                 </Typography>
//               </Grid>
//               {errors.submit && (
//                 <Grid item xs={12}>
//                   <FormHelperText error>{errors.submit}</FormHelperText>
//                 </Grid>
//               )}
//               <Grid item xs={12}>
//                 <AnimateButton>
//                   <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
//                     Create Account
//                   </Button>
//                 </AnimateButton>
//               </Grid>
//             </Grid>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// }




import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import axiosInstance from 'utils/axiosInstance';

import toast, { Toaster } from "react-hot-toast";

export default function AuthRegister() {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const handleSignup = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const response = await axiosInstance.post("admin/signup", {
        fullName: values.firstname,
        hospitalName: values.company,
        email: values.email,
        password: values.password,
      });

      // Handle success response
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);

      toast.success("Login Successfully!");
      navigate("/dashboard");
      resetForm();
    } catch (error) {
      // Handle error
      if (error.response && error.response.data.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'Something went wrong. Please try again later.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          company: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('Full Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          company: Yup.string().max(255).required('Hospital Name is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={handleSignup}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">Full Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="firstname-login"
                    type="text"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Doe"
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                </Stack>
                {touched.firstname && errors.firstname && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.firstname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="company-signup">Hospital Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.company && errors.company)}
                    id="company-signup"
                    value={values.company}
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                  />
                </Stack>
                {touched.company && errors.company && (
                  <FormHelperText error id="helper-text-company-signup">
                    {errors.company}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
