import * as React from "react";
import { BrainCog, Sun, Moon } from "lucide-react";
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  Card,
  List,
  Avatar,
  Menu,
  Tooltip,
  Accordion,
} from "@material-tailwind/react";
import {
  Archive,
  HeadsetHelp,
  LogOut,
  Menu as MenuIcon,
  MultiplePages,
  NavArrowDown,
  ProfileCircle,
  Rocket,
  SelectFace3d,
  Settings,
  UserCircle,
  Xmark,
} from "iconoir-react";
import PropTypes from "prop-types";
import useAxios from "../../hook/useAxios";
import useUserStore from "../../store/useUserStore";
import { Link } from "react-router";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router";

const LINKS = [
  {
    icon: ProfileCircle,
    title: "My Profile",
    href: "/dashboard/profile",
  },
  {
    icon: Settings,
    title: "Home",
    href: "/",
  },
];

function NavList() {
  return (
    <>
      {LINKS.map(({ icon: Icon, title, href }) => (
        <List.Item key={title} as="a" href={href}>
          <List.ItemStart className="mr-1.5">
            <Icon className="h-4 w-4" />
          </List.ItemStart>
          <Typography type="small">{title}</Typography>
        </List.Item>
      ))}
    </>
  );
}

function ProfileMenu({ userData }) {
  const { clearToken } = useAuthStore();
  const navigate = useNavigate();
  return (
    <Menu>
      <Menu.Trigger
        as={Avatar}
        src={`https://ui-avatars.com/api/?name=${userData?.first_name}+${userData?.last_name}?background=random`}
        alt="profile-picture"
        size="sm"
        className="border border-primary p-0.5 lg:ml-auto cursor-pointer"
      />
      <Menu.Content className="z-[200]">
        <Menu.Item onClick={() => navigate("/dashboard/profile")}>
          <UserCircle className="mr-2 h-[18px] w-[18px]" /> My Profile
        </Menu.Item>
        <Menu.Item onClick={() => navigate("/")}>
          <Settings className="mr-2 h-[18px] w-[18px]" />
          Home
        </Menu.Item>
        <Menu.Item>
          <HeadsetHelp className="mr-2 h-[18px] w-[18px]" /> Support
        </Menu.Item>
        <hr className="!my-1 -mx-1 border-surface" />
        <Menu.Item
          onClick={clearToken}
          className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error"
        >
          <LogOut className="mr-2 h-[18px] w-[18px]" />
          Logout
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

const MenuItem = ({ title, description, ...rest }, ref) => {
  return (
    <Menu.Item ref={ref} {...rest} className="flex-col items-start">
      <Typography color="default" className="font-semibold">
        {title}
      </Typography>
      <Typography type="small" className="text-foreground">
        {description}
      </Typography>
    </Menu.Item>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default function DashboardNav() {
  const { clearToken } = useAuthStore();
  const [openNav, setOpenNav] = React.useState(false);
  const { userData, setUserData } = useUserStore();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const setUser = async () => {
    const response = await axiosInstance.get("/auth/get-current-user");
    setUserData(response.data);
    if (response.data?.onboarding == false) {
      navigate("/details");
    }
  };

  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  React.useEffect(() => {
    setUser();
  }, []);

  return (
    <Navbar className="sticky top-0 w-full max-w-full z-[100] rounded-none mx-0 px-6 py-3 bg-white dark:bg-[#121212] shadow-sm transition-colors">
      <div className="flex items-center justify-between w-full">
        <Link to="/dashboard">
          <div className="flex items-center space-x-2">
            <BrainCog className="h-8 w-8 text-purple-700 dark:text-purple-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              AnvikshAI
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            title="Toggle Dark Mode"
          >
            {theme === "dark" ? <Sun className="h-[20px] w-[20px]" /> : <Moon className="h-[20px] w-[20px]" />}
          </button>
          
          <IconButton
            size="sm"
            variant="ghost"
            color="secondary"
            onClick={() => setOpenNav(!openNav)}
            className="grid lg:hidden dark:text-white"
          >
            {openNav ? (
              <Xmark className="h-4 w-4" />
            ) : (
              <MenuIcon className="h-4 w-4" />
            )}
          </IconButton>
          <div className="hidden lg:block ml-auto"></div>
          <ProfileMenu userData={userData} />
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <List.Item onClick={clearToken}>
          <List.ItemStart className="mr-1.5">
            <LogOut className="h-4 w-4" />
          </List.ItemStart>
          <Typography type="small">Logout</Typography>
        </List.Item>
      </Collapse>
    </Navbar>
  );
}
