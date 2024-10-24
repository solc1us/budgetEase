import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import {useSelector} from "react-redux";

const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {
  const {navStyle, themeType} = useSelector(({settings}) => settings);
  const pathname = useSelector(({common}) => common.pathname);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
      <div className="gx-sidebar-content">
        {/* <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile/>
        </div> */}
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            className="gx-mt-3"
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <Menu.Item key="dashboard">
              <Link to="/dashboard"><i className="icon icon-widgets"/>
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="cashflow">
              <Link to="/cashflow"><i className="icon icon-widgets"/>
                <span>Cashflow</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="report">
              <Link to="/report"><i className="icon icon-widgets"/>
                <span>Laporan Tahunan</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="todolist">
              <Link to="/todolist"><i className="icon icon-widgets"/>
                <span>To-do List</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="investment">
              <Link to="/investment"><i className="icon icon-widgets"/>
                <span>Kalkulator Investasi</span>
              </Link>
            </Menu.Item>

          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

