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
        <div className="bg-base-300">
            <div className="w-11/12 mx-auto py-4 flex items-center justify-between">
            <button className="btn btn-soft" onClick={handleLogout}>Log out</button>
            <h2>Task No Jujutsu! Sorcerer: <b>{user.displayName}</b></h2>
            <input type="checkbox" value="light" className="toggle theme-controller" />
            </div>
        </div>
        </>
    );
};

export default Dashboard;