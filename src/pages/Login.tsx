
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
