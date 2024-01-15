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
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  console.log(26, conversations);
  console.log(messages?.receiver?.receiverId);
  console.log("all user", users);
  console.log(loggedInUser?._id);

  const image = "https://i.postimg.cc/mkphFd7b/IMG-20200811-141534.jpg";

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await axiosLocal.get(
        `/api/conversations/${loggedInUser?._id}`
      );
      setConversations(res?.data);
    };
    fetchConversations();
  }, [loggedInUser?._id]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosLocal.get(`/api/users`);
      setUsers(res?.data);
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (conversationId, user) => {
    const res = await axiosLocal.get(`/api/message/${conversationId}`);
    const resData = res?.data;
    setMessages({ messages: resData, receiver: user, conversationId });
    console.log("fetchMessages", resData);
  };

  const userSendMessage = {
    conversationId: messages?.conversationId,
    senderId: loggedInUser?._id,
    message,
    receiverId: messages?.receiver?.receiverId,
  };

  const sendMessage = async () => {
    await axiosLocal.post("/api/message", userSendMessage).then((res) => {
      if (res.status === 200) {
        console.log(res);
        setMessage("");
      }
    });
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
            <div className="text-blue-500">Messages </div>
            {conversations.length > 0 ? (
              conversations?.map(({ conversationId, user }) => {
                return (
                  <>
                    <div
                      className="cursor-pointer flex "
                      onClick={() => fetchMessages(conversationId, user)}
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
              <div className="text-center text-lg font-semibold my-12">
                No Conversation
              </div>
            )}
          </div>

          {/* all users list */}
        </div>
      </div>

      {/* chatting area */}
      <div className="w-[50%] border-2 h-screen ">
        {/* chatting heading */}
        {messages?.receiver?.fullName && (
          <div className="flex justify-between items-center shadow-md bg-[#cbe6f9]">
            <div className="flex  items-center  p-4 ">
              <div className="avatar mr-4">
                <div className="w-10 border border-black rounded-full cursor-pointer">
                  <img src={image} alt="profile image" />
                </div>
              </div>
              <div>
                <h2>{messages?.receiver?.fullName}</h2>
                <p className="text-sm">{messages?.receiver?.email}</p>
              </div>
            </div>
            <div className="flex gap-8  mr-4 ">
              <FaPhone size={22} className="cursor-pointer" />
              <IoVideocam size={28} className="cursor-pointer" />
            </div>
          </div>
        )}

        {/* message body */}
        <div className="h-[75%] border w-full overflow-scroll border-b">
          <div className=" px-4 py-6">
            {messages?.messages?.length > 0 ? (
              messages?.messages?.map(({ message, user: { id } = {} }) => {
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
        {messages?.receiver?.fullName && (
          <div className="mx-2 mt-6 flex items-center justify-center">
            <LuBadgePlus
              size={30}
              className="text-blue-500 mr-4 cursor-pointer"
            />

            <input
              type="text"
              placeholder="Type Message"
              className="w-[60%] p-2 rounded-md outline-none shadow-sm relative"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <BsSendCheck
              onClick={() => sendMessage()}
              size={30}
              className={`-ml-12 z-10 cursor-pointer text-blue-500 ${
                !message && "pointer-events-none"
              }`}
            />
          </div>
        )}
      </div>

      <div className="w-[25%] border-2  m-1 h-screen ">
        <div className="text-blue-500 p-2">All People </div>
        {users?.length > 0 ? (
          users?.map(({ receiverId, user }) => {
            return (
              <>
                <div
                  className="cursor-pointer flex "
                  onClick={() => fetchMessages(receiverId, user)}
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
          <div className="text-center text-lg font-semibold my-12">
            No Conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
