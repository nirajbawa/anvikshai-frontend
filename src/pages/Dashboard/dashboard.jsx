import task from "./task.svg";
import { Link } from "react-router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState } from "react";
import useAxios from "../../hook/useAxios";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Button } from "@material-tailwind/react";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { clearToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const axiosInstance = useAxios();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/task/");
      console.log(response.data.data);
      setTasks(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <div className="flex h-screen">
        <div className="static top-0 w-64 h-full bg-[#F0E5FF] text-black p-4">
          <div className="flex justify-start items-center space-x-2 mt-8 ml-2 text-lg p-3  rounded-lg">
            <HomeOutlinedIcon />
            <Link>Home</Link>
          </div>
          <div className="flex justify-start items-center space-x-2 mt-4 ml-2 text-lg p-3 rounded-lg">
            <AccountCircleOutlinedIcon />
            <Link>Profile</Link>
          </div>
          <div className="flex justify-start items-center space-x-2 mt-4 ml-2 text-lg p-3 rounded-lg">
            <SubscriptionsOutlinedIcon />
            <Link>Subscriptions</Link>
          </div>
          <div className="flex justify-start items-center space-x-2 mt-4 ml-2 text-lg p-3  rounded-lg">
            <WorkspacePremiumOutlinedIcon />
            <Link>Certification</Link>
          </div>
          <div className="flex justify-start items-center space-x-2 mt-4 ml-2 text-lg p-3  rounded-lg">
            <SettingsOutlinedIcon />
            <Link>Settings</Link>
          </div>
          <div
            onClick={clearToken}
            className=" transition-transform duration-300 ease-in-out flex justify-start items-center mt-48 space-x-2 ml-2 text-lg p-2 text-black rounded-lg"
          >
            <LogoutOutlinedIcon />
            <Link>Sign out</Link>
          </div>
        </div>

        <div className="flex-1 h-screen overflow-y-auto pl-16 pt-5 bg-gray-100">
          <div className=" text-[30px] flex justify-start items-center space-x-2">
            <img className="h-12 w-12 text-black" src={task}></img>
            <h1>Your Tasks</h1>
          </div>
          <div className="">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="w-72 h-72 bg-[#EDEDED] shadow-sm rounded-xl flex justify-center gap-y-5 flex-col items-center">
                <div
                  className="text-8xl cursor-pointer"
                  onClick={() => navigate("/dashboard/create-task")}
                >
                  <AddCircleOutlinedIcon fontSize="inherit" />
                </div>
                <p className="font-bold text-xl">Add New Task</p>
              </div>
              {Array.isArray(tasks) &&
                tasks.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="w-72 h-72 bg-[#EDEDED] rounded-xl shadow-sm flex justify-center gap-y-5 flex-col items-center"
                    >
                      <h1 className="font-bold text-xl capitalize text-center">
                        {data.task_name}
                      </h1>

                      <Link to={`/dashboard/roadmap/${data.id}`}>
                        <Button>Start</Button>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
