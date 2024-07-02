import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {CustomButton} from "./"
import {favicon, menu, search, user} from "../assets";
import {navlinks} from "../constants";
import { useStateContext } from '../context';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const {connect, address}  = useStateContext();
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#B3E5FC] rounded-[100px]">
      <input type="text" placeholder="Search for campaigns" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#607D8B] text-black bg-transparent outline-none" />
        <div className="w-[72px] h-full rounded-[20px] bg-[#00BCD4] flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-200">
        <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>


        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
      <CustomButton 
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-[#00BCD4] transition-transform duration-200 hover:scale-105' : 'bg-[#00BCD4] transition-transform duration-200 hover:scale-105'}
          handleClick={() => {
            if(address) navigate('create-campaign')
            else connect();
          }}
          scaleOnHover={true}
          // Set the scale factor when hovered
          hoverScaleFactor={105}
        />
        <Link to="/profile">
          <div className=" w-[52px] h-[52px] rounded-full bg-[#00BCD4] flex justify-center items-center cursor-pointer transition-transform duration-200 hover:scale-105">
            {/* <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" /> */}
            <img src={user} alt="user" className="object-contain" />
          </div>
        </Link>


      </div>
      {/* For small devices */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#00BCD4] flex justify-center items-center cursor-pointer">
            <img src={favicon} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>

          <img 
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />
          <div className={`absolute top-[60px] right-0 left-0 bg-[#B3E5FC] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && 'bg-[#00BCD4]'}`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img 
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  />
                  <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#00BCD4]' : 'text-[#00BCD4]'}`}>
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex mx-4">
            <CustomButton 
              btnType="button"
              title={address ? 'Create a campaign ' : 'Connect'}
              styles={address ? 'bg-[#00BCD4] transition-transform duration-200 hover:scale-105' : 'bg-[#00BCD4] transition-transform duration-200 hover:scale-105'}
              handleClick={() => {
                if(address) navigate('create-campaign')
                else connect();
              }}
            />
            </div>

          </div>
        
      </div>
    </div>
  )
}

export default Navbar
