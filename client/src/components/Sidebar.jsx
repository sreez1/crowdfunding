import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { favicon, sun } from "../assets";
import { navlinks } from "../constants";
import { useDisconnect } from "@thirdweb-dev/react";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] 
    ${isActive && isActive === name && "bg-[#7E5EA1]"} flex justify-center
    items-center ${!disabled && "cursor-pointer"} ${styles} hover:shadow-secondary hover:scale-105 transition-transform duration-200`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2
         ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const disconnect = useDisconnect();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#3E2A67] p-4 shadow-md flex justify-around items-center z-50">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#7E5EA1]" imgUrl={favicon} />
      </Link>
      {navlinks.map((link) => (
        <Icon
          key={link.name}
          {...link}
          isActive={isActive}
          handleClick={() => {
            if (!link.disabled) {
              if (link.name === "logout") {
                disconnect();
              } else {
                setIsActive(link.name);
                navigate(link.link);
              }
            }
          }}
        />
      ))}
      <Icon styles="bg-[#3E2A67]" imgUrl={sun} />
    </div>
  );
};

export default Sidebar;
