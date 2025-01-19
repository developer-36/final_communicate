import { IoSend } from "react-icons/io5";
import { useState } from "react";
import useSendMessage from "../../context/useSendMessage";
const Type = () => {
    const { loading, sendMessage } = useSendMessage();
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("this works", typeof (message));

        await sendMessage(message);
        setMessage("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="p-4 bg-slate-700 h-[10vh] flex justify-between items-center  space-x-3">
                <label className="border-[1px] border-gray-700 bg-gray-900 rounded-lg flex items-center gap-2 w-full p-3">
                    <input placeholder="Type a message" value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" className="grow outline-none bg-gray-900" />
                </label>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    <IoSend className="text-3xl" />
                </button>

            </div>
        </form>
    )
}

export default Type