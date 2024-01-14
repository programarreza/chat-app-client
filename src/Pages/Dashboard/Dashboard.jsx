import { BsSendCheck } from "react-icons/bs";
import { LuBadgePlus } from "react-icons/lu";
import { FaPhone } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { useEffect, useState } from "react";
import { axiosLocal } from "../../hooks/useAxiosLocal";

const Dashboard = () => {
  const { user } = useAuth();
  const { loggedInUser } = useLoggedInUser();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});

  console.log(loggedInUser?._id);
  const image = "https://i.postimg.cc/W31nybCs/image3.png";

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await axiosLocal(`/api/conversations/${loggedInUser?._id}`);
      setConversations(res?.data);
    };
    fetchConversations();
  }, [loggedInUser?._id]);

  console.log(conversations);
  console.log(messages);

  const fetchMessage = async (conversationId, user) => {
    const res = await axiosLocal.get(`/api/message/${conversationId}`);
    setMessages({messages: res, receiver: user});
    console.log(res?.data);
  };
  return (
    <div className="w-full flex justify-center bg-gray-100">
      {/* users area */}
      <div className="w-[25%] h-screen bg-[#cbe6f9]">
        <div className="m-2">
          {/* logged in user profile */}
          <div className="flex  items-center  p-4 border-b-2">
            <div className="avatar mr-4">
              <div className="w-14 border border-black rounded-full">
                <img src={user?.photoURL} alt="profile image" />
              </div>
            </div>
            <div>
              <h2>{user?.displayName}</h2>
              <h2>{user?.email}</h2>
            </div>
          </div>

          {/* search by user name */}
          <input
            placeholder="Search"
            className="w-full  flex items-center justify-center rounded-lg p-1.5"
          />

          {/* already conversation user area */}
          <div className="border-b-2 border-gray-300">
            {conversations.length > 0 ? (
              conversations?.map(({ conversationId, user }) => {
                return (
                  <>
                    <div
                      className="cursor-pointer flex "
                      onClick={() => fetchMessage(conversationId, user)}
                    >
                      <div className="flex  items-center p-4 ">
                        <div className="avatar mr-4">
                          <div className="w-12 border border-black rounded-full">
                            <img src={image} alt="profile image" />
                          </div>
                        </div>
                        <div>
                          <h2>{user?.fullName}</h2>
                          <p className="text-sm">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Conversation
              </div>
            )}
          </div>

          {/* all users list */}
        </div>
      </div>

      {/* chatting area */}
      <div className="w-[75%] border-2 h-screen ">
        {/* chatting heading */}
        <div className="flex justify-between items-center shadow-md bg-[#cbe6f9]">
          <div className="flex  items-center  p-4 ">
            <div className="avatar mr-4">
              <div className="w-10 border border-black rounded-full cursor-pointer">
                <img src={image} alt="profile image" />
              </div>
            </div>
            <div>
              <h2>Shafikul islam</h2>
              <p className="text-sm">Active</p>
            </div>
          </div>
          <div className="flex gap-8  mr-4 ">
            <FaPhone size={22} className="cursor-pointer" />
            <IoVideocam size={28} className="cursor-pointer" />
          </div>
        </div>

        {/* message body */}
        <div className="h-[75%] border w-full overflow-scroll border-b">
          <div className=" px-4 py-6">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, user: { id } = {} }) => {
                return (
                  <div
                    key={id}
                    className={`w-[40%]  p-4  mb-6 ${
                      id === loggedInUser?._id
                        ? "bg-blue-400 ml-auto rounded-tl-2xl text-white"
                        : "bg-gray-200  rounded-tr-2xl "
                    } `}
                  >
                    {message}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Message
              </div>
            )}
          </div>
        </div>

        {/* message input area */}
        <div className="mx-2 mt-6 flex items-center justify-center">
          <LuBadgePlus
            size={30}
            className="text-blue-500 mr-4 cursor-pointer"
          />

          <input
            type="text"
            placeholder="Type Message"
            className="w-[60%] p-2 rounded-md outline-none shadow-sm relative"
          />

          <BsSendCheck
            size={30}
            className="-ml-12 z-10 cursor-pointer text-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
