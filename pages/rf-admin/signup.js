// MUI IMPORTS
import Container from "@mui/material/Container";

// COMPONENTS IMPORTS
import SignUpForm from "../../components/admin/signup-form";

function SignUpPage() {
  return (
    <Container maxWidth="sm" sx={{ minHeight: '75vh', mt: 8 }}>
      <SignUpForm />
    </Container>
  )
}

export default SignUpPage
