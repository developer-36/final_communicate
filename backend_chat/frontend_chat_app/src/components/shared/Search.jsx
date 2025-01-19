import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import UserGetAllUsers from "../../context/UserGetAllUsers";
import useConversation from "../../statemanager/useConversation";
import toast from "react-hot-toast";
const Search = () => {
const [search, setSearch] = useState("");
const [allUsers] = UserGetAllUsers();
const { setSelectedConversation } = useConversation();
 
const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    console.log("what happened",search);
    console.log("what happened",allUsers.filteredUser);
    const allUser = allUsers.filteredUser;

      console.log("what happened");
    // Find the conversation with a matching name
    const conversation = allUser.find((user) => 
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
        // If a conversation is found
        setSelectedConversation(conversation);
        setSearch("");
    } else {
        // If no conversation is found
        toast.error("User not found");
    }
};


    return (
        <div className="px-6 py-4">
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-3">
                <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-[80%] p-3">
                    <input type="text" className="grow outline-none bg-slate-900" placeholder="Search"
                value={search} onChange={(e) => setSearch(e.target.value)} />
                </label>
                <button>

                    <IoSearch  className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300"/>
                </button>
                </div>
            </form>
        </div>
    )
}

export default Search