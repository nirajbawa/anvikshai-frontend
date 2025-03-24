import * as React from "react";
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
  BitcoinCircle,
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
    href: "#",
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
        src={`https://ui-avatars.com/api/?name=${userData?.role}?background=random`}
        alt="profile-picture"
        size="sm"
        className="border border-primary p-0.5 lg:ml-auto cursor-pointer"
      />
      <Menu.Content className="z-[200]">
        {/* <Menu.Item>
          <UserCircle className="mr-2 h-[18px] w-[18px]" /> My Profile
        </Menu.Item> */}
        <Menu.Item onClick={() => navigate("/")}>
          <Settings className="mr-2 h-[18px] w-[18px]" />
          Home
        </Menu.Item>
        <Menu.Item>
          <BitcoinCircle className="mr-2 h-[18px] w-[18px]" /> points :{" "}
          {userData?.review_points}
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

export default function ExpertNav() {
  const [openNav, setOpenNav] = React.useState(false);
  const { userData } = useUserStore();
  const { clearToken } = useAuthStore();

  React.useEffect(() => {
    console.log(userData);
  });

  return (
    <Navbar className="sticky top-0 w-full z-[100] rounded-none mx-0 px-5 bg-[#D2B0FD] border-none">
      <div className="flex items-center">
        <Link to="/expert/dashboard">
          <Typography
            as="h1"
            type="small"
            className="ml-2 mr-2 text-xl block py-1 font-bold"
          >
            Admin Dashboard
          </Typography>
        </Link>
        <IconButton
          size="sm"
          variant="ghost"
          color="secondary"
          onClick={() => setOpenNav(!openNav)}
          className="ml-auto mr-2 grid lg:hidden"
        >
          {openNav ? (
            <Xmark className="h-4 w-4" />
          ) : (
            <MenuIcon className="h-4 w-4" />
          )}
        </IconButton>
        <ProfileMenu userData={userData} />
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
