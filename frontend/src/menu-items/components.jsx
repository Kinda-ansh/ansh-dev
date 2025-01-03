// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  DollarOutlined,
  RocketOutlined,
  LoadingOutlined,
  ReadOutlined,
  KeyOutlined,
  GlobalOutlined,
  FileDoneOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

// icons
const icons = {
  RocketOutlined,
  DollarOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  ReadOutlined,
  KeyOutlined,
  GlobalOutlined,
  FileDoneOutlined,
  NotificationOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //
<FileDoneOutlined />;

const components = {
  id: "components",
  title: "Components",
  type: "group",
  children: [
   
    {
      id: "manage-patient",
      title: "Manage Patients",
      type: "item",
      url: "/manage-patient",
      icon: icons.RocketOutlined,
    },
    {
      id: "manage-doctors",
      title: "Manage Doctors",
      type: "item",
      url: "/manage-doctors",
      icon: icons.ReadOutlined,
    },
    {
      id: "payments",
      title: "Payments",
      type: "item",
      url: "/payments",
      icon: icons.DollarOutlined,
    },
    
    // {
    //   id: "home-page-carousel",
    //   title: "Home Page Carousel",
    //   type: "item",
    //   url: "/home-page-carousel",
    //   icon: icons.ReadOutlined,
    // },
    {
      id: "ai-support",
      title: "AI Support",
      type: "item",
      url: "/ai-support",
      icon: icons.GlobalOutlined,
    },
    // {
    //   id: "apply-leave",
    //   title: "Apply Leave",
    //   type: "item",
    //   url: "/apply-leave",
    //   icon: icons.KeyOutlined,
    // },

   


    // {
    //   id: "admincard",
    //   title: "Admit Card",
    //   type: "item",
    //   url: "/admincard",
    //   icon: icons.FileDoneOutlined,
    // },
    // {
    //   id: "contactUs",
    //   title: "Contact Us",
    //   type: "item",
    //   url: "/contact",
    //   icon: icons.FileDoneOutlined,
    // },

    // {
    //   id: "notification",
    //   title: "Notification",
    //   type: "item",
    //   url: "/notification",
    //   icon: icons.NotificationOutlined,
    // },
    // {
    //   id: "highlight",
    //   title: "Card Highlights ",
    //   type: "item",
    //   url: "/highlight",
    //   icon: icons.ReadOutlined,
    // },
    // {
    //   id: "banner",
    //   title: "Banners ",
    //   type: "item",
    //   url: "/banner",
    //   icon: icons.ReadOutlined,
    // },
    // {
    //   id: "faqs",
    //   title: "FAQs ",
    //   type: "item",
    //   url: "/faqs",
    //   icon: icons.ReadOutlined,
    // },
    // {
    //   id: "common",
    //   title: "common",
    //   type: "item",
    //   url: "/common",
    //   icon: icons.BarcodeOutlined,
    // },
  ],
};

export default components;
