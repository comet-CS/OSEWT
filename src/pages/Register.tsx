
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
