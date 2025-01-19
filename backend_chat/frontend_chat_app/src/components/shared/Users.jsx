import User from './User';
import UserGetAllUsers from '../../context/UserGetAllUsers.jsx';

const Users = () => {
  const [allUsers, loading] = UserGetAllUsers();
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle case where no users are available
  const users = allUsers?.filteredUser || [];

  return (
    <div className="h-[calc(100vh-22vh)] overflow-y-scroll no-scrollbar">
      {users.length > 0 ? (
        users.map((user) => {
          if (!user) {
            console.warn("Invalid user data:", user);
            return <p key={`invalid-user-${Math.random()}`}>Invalid user data</p>;
          }

          // Ensure `user.id` exists, fallback to `index` if not available
          return <User key={user.id || `user-${Math.random()}`} user={user} />;
        })
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default Users;
