import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const HomePage = () => {

    const { googleSignin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const handleGoogleSignin = () => {
        googleSignin()
          .then(result => {
            console.log(result.user);
            const userInfo = {
              email: result.user?.email,
              name: result.user?.displayName,
              photoURL: result.user?.photoURL,
            };
    
            // Send user data to the backend
            axiosPublic.post('/users', userInfo)
              .then(res => {
                  console.log(res.data);
                  navigate('/dashboard'); // Navigate to the dashboard after successful login
              })
              .catch(err => {
                console.error('Error creating user:', err);
                alert('Error logging in! Please try again.');
              });
          })
          .catch(err => {
            console.error('Google Sign-In Error:', err);
            alert('Google Sign-In failed! Please try again.');
          });
      };
    
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Task No Jujutsu</h1>
          <p className="py-6">
            Organize, track, and complete your tasks effortlessly.  
            Drag and drop tasks between categories, keep everything in sync,  
            and stay productive with real-time updates.
          </p>
          <button onClick={handleGoogleSignin} className="btn btn-primary">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;