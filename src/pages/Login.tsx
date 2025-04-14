
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-bookBeige-light">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
