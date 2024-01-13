import { BsSendCheck } from "react-icons/bs";
import { LuBadgePlus } from "react-icons/lu";
import { FaPhone } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";

const Dashboard = () => {
  const image =
    "https://i.postimg.cc/W31nybCs/image3.png";

  const users = [
    {
      name: "Rakib",
      status: "Active",
      img: image,
    },
    {
      name: "Shakib",
      status: "Active",
      img: image,
    },
    {
      name: "Rayhan",
      status: "Active",
      img: image,
    },
    {
      name: "Sumaiya",
      status: "Active",
      img: image,
    },
    {
      name: "Ritu",
      status: "Active",
      img: image,
    },
    {
      name: "Hafsa",
      status: "Active",
      img: image,
    },
  ];

  return (
    <div className="w-full flex justify-center bg-gray-100">
      {/* users area */}
      <div className="w-[25%] h-screen bg-[#cbe6f9]">
        <div className="m-2">
          {/* logged in user profile */}
          <div className="flex  items-center  p-4 border-b-2">
            <div className="avatar mr-4">
              <div className="w-14 border border-black rounded-full">
                <img src={image} alt="profile image" />
              </div>
            </div>
            <div>
              <h2>Shafikul islam</h2>
              <h2>logged in User</h2>
            </div>
          </div>
          <input
            placeholder="Search"
            className="w-full  flex items-center justify-center rounded-lg p-1.5"
          />

          {users.map(({ name, status, img }) => {
            return (
              <>
                <div className="flex  items-center p-4 ">
                  <div className="avatar mr-4">
                    <div className="w-12 border border-black rounded-full">
                      <img src={img} alt="profile image" />
                    </div>
                  </div>
                  <div>
                    <h2>{name}</h2>
                    <p className="text-sm">{status}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      {/* chatting area */}
      <div className="w-[75%] border-2 h-screen ">
        {/* heading */}
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
            <div className=" w-[40%] bg-gray-200 rounded-b-2xl mb-6 rounded-tr-2xl p-4">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati sed error 
			</div>
            <div className="w-[40%] ml-auto bg-blue-400 text-white mb-6 rounded-b-2xl rounded-tl-2xl p-4">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati sed error 
			</div>
            <div className=" w-[40%] bg-gray-200 rounded-b-2xl mb-6 rounded-tr-2xl p-4">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati sed error 
			</div>
            <div className="w-[40%] ml-auto bg-blue-400 text-white mb-6 rounded-b-2xl rounded-tl-2xl p-4">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati sed error 
			</div>
            <div className=" w-[40%] bg-gray-200 rounded-b-2xl mb-6 rounded-tr-2xl p-4">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati sed error 
			</div>
            <div className="w-[40%] ml-auto bg-blue-400 text-white mb-6 rounded-b-2xl rounded-tl-2xl p-4">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati sed error 
			</div>
            <div className=" w-[40%] bg-gray-200 rounded-b-2xl mb-6 rounded-tr-2xl p-4">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati sed error 
			</div>
            <div className="w-[40%] ml-auto bg-blue-400 text-white mb-6 rounded-b-2xl rounded-tl-2xl p-4">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati sed error 
			</div>

          </div>
        </div>

		{/* message input area */}
		<div className="mx-2 mt-6 flex items-center justify-center">
		<LuBadgePlus size={30} className="text-blue-500 mr-4 cursor-pointer"/>

			<input type="text" placeholder="Type Message" className="w-[60%] p-2 rounded-md outline-none shadow-sm relative"/>

			<BsSendCheck size={30} className="-ml-12 z-10 cursor-pointer text-blue-500"/>
		</div>
      </div>
    </div>
  );
};

export default Dashboard;
