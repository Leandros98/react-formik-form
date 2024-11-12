import { Formik,Form,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import './App.css';
function formSubmission(formData)
{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve("User registred !")
    },2000)
  })
}
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Le nom est obligatoire'),
  email: Yup.string().email('L\'adresse E-mail est invalide').required('L\'adresse E-mail est obligatoire'),
  password: Yup.string().required('Le mot de passe est obligatoire')
                .min(6,"Le mot de pass doit avoir au moins 6 caracteres"),
  confirmPassword: Yup.string()
                       .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
                        .required('Confirmation du mot de passe est obligatoire'),
  acceptTerms: Yup.boolean().oneOf([true], 'Vous devez accepter les termes'),
});
async function createUser(formValues,onSubmittingProps){
  try{
    await formSubmission(formValues);
    onSubmittingProps.resetForm();
  }catch(error){
    console.log(error);
  }
}


function App() {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };
  return (
    <Container maxWidth="sm">
       <Typography variant="h4" sx={{ textAlign: 'center' }} gutterBottom>
             Inscription 
        </Typography>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={createUser}
        >
        {
            (formik)=>(
              <Form>
              <Grid container spacing={2}>
                 <Grid item xs={12}>
                      <TextField
                          label="Nom"
                          variant="filled"
                          fullWidth
                          name="name"
                          type='text'
                          id='name'
                          {...formik.getFieldProps('name')}
                      />
                      <ErrorMessage name='name'style={{ color: 'red' }} component="span"/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          label="E-mail"
                          variant="filled"
                          fullWidth
                          name="email"
                          type='email'
                          id='email'
                          {...formik.getFieldProps('email')}
                      />
                      <ErrorMessage name='email' style={{ color: 'red' }} component="span"/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          label="Password"
                          variant="filled"
                          fullWidth
                          name="password"
                          type='password'
                          id='password'
                          {...formik.getFieldProps('password')}
                      />
                      <ErrorMessage name='password'style={{ color: 'red' }} component="span"/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          label="Password confirmation"
                          variant="filled"
                          fullWidth
                          name="confirmPassword"
                          type='password'
                          id='confirmPassword'
                          {...formik.getFieldProps('confirmPassword')}
                      />
                      <ErrorMessage name='confirmPassword'style={{ color: 'red' }} component="span"/>
                  </Grid>
                  <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit" fullWidth  >
                            S'inscrire
                      </Button>
                  </Grid>
               </Grid>
              </Form>
            )
        }
        </Formik>
    </Container>
  );
}

export default App;
