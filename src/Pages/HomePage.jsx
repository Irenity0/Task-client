const HomePage = () => {

  const handleGoogleSignin = () => {
    
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