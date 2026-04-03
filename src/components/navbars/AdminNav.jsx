import * as React from "react";
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  List,
  Avatar,
  Menu,
} from "@material-tailwind/react";
import {
  LogOut,
  Menu as MenuIcon,
  Settings,
  ProfileCircle,
  UserCircle,
  Xmark,
} from "iconoir-react";
import PropTypes from "prop-types";
import useUserStore from "../../store/useUserStore";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../../store/useAuthStore";

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
        src={`https://ui-avatars.com/api/?name=${userData?.role}&background=random`}
        alt="profile-picture"
        size="sm"
        className="border border-primary p-0.5 lg:ml-auto cursor-pointer"
      />

      <Menu.Content className="z-[200]">
        <Menu.Item>
          <UserCircle className="mr-2 h-[18px] w-[18px]" />
          My Profile
        </Menu.Item>

        <Menu.Item onClick={() => navigate("/")}>
          <Settings className="mr-2 h-[18px] w-[18px]" />
          Home
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

ProfileMenu.propTypes = {
  userData: PropTypes.object,
};

export default function AdminNav() {
  const [openNav, setOpenNav] = React.useState(false);
  const { userData } = useUserStore();
  const { clearToken } = useAuthStore();

  React.useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <Navbar className="sticky top-0 w-full z-[100] rounded-none mx-0 px-5 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="flex items-center">
        <Link to="/admin/dashboard">
          <Typography
            as="h1"
            type="small"
            className="ml-2 mr-2 text-xl block py-1 font-bold text-gray-900 dark:text-white transition-colors"
          >
            Admin Dashboard
          </Typography>
        </Link>

        <IconButton
          size="sm"
          variant="ghost"
          color="secondary"
          onClick={() => setOpenNav(!openNav)}
          className="ml-auto mr-2 grid lg:hidden text-gray-800 dark:text-white"
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