import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../components/upload';
// utils
import { fData } from '../../utils/formatNumber';
//
import { useSelector, useDispatch } from 'react-redux';
import { saveDetail } from '../../actions/auth';
// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector(state => state.auth.user);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      avatar: user?.avatar
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        dispatch(saveDetail({ ...values, avatar: values.avatar.file }, enqueueSnackbar));
        // enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      // console.log(acceptedFiles);
      if (file) {
        setFieldValue('avatar', {
          file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <UploadAvatar
                accept="image/*"
                file={values.avatar}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.avatar && errors.avatar)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.avatar && errors.avatar}
              </FormHelperText>

            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Name" {...getFieldProps('name')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Email Address" {...getFieldProps('email')} />
                  <TextField fullWidth label="Phone Number" {...getFieldProps('phone')} />
                </Stack>
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
