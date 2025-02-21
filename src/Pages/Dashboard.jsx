import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    
    const {loading, user, logOut } = useAuth()

    const handleLogout = () => {
        logOut()
          .then(() => console.log("Logged out successfully"))
          .catch((error) => console.error("Error logging out:", error));
      };

      if(loading){
        return <div>loading...</div>
      }

    return (
        <>
        <h2>Dashboard hello {user.displayName}</h2>
        <button className="btn btn-soft" onClick={handleLogout}>Log out</button>
        </>
    );
};

export default Dashboard;