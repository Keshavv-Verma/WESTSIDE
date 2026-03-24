'use client'
import { TypeAnimation } from 'react-type-animation';
import { CiMenuBurger } from "react-icons/ci";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import Popup from 'reactjs-popup';
import LoadingBar from "react-top-loading-bar";
import 'reactjs-popup/dist/index.css';
import Image from "next/image";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faCartShopping, faCheck, faHeart, faL, faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactSearchBox from "react-search-box";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { redirect, usePathname, useRouter } from 'next/navigation';
import PopNav from './PopNav';
import westlogo from './westlogo.png'
import Search from './components/search/search';
const Navbar = (outlet) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [menuShow, setMenuShow] = useState(false)

  const [typeDis, settypeDis] = useState(false)
  const [search, setsearch] = useState("")

  const handleSearch = (e) => {
    // console.log("handleSearch is Running");
    // console.log(e.target.value);
    settypeDis(true)
    setsearch(e.target.value)
    if (e.target.value = "") {
      // console.log("If Condtion Satisfied");
      if (e.target.value = "") {
        settypeDis(true)
        settypeDis(false)
      }


    }
  }
  const router = useRouter();
  const pathname = usePathname()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // console.log("My Router PathName is my Router PathName is:::::",pathname);
  let prop = (outlet['outlet'])
  let getState = "Login"
  if (prop['success']) {
    getState = (prop['data'])['name']
  }

  const [status, setstatus] = useState("Login")
  var delete_cookie = function (name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
  };
  const [progress, setprogress] = useState(13)

  // Force refresh the page

  const [input, setInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className={`z-50 sticky top-0 ${pathname == '/' ? 'bg-transparent' : 'bg-white'} w-[100vw]`}>


      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Welcome To Our Website</ModalHeader>
              <ModalBody>
                Westside is your ultimate destination for fashion-forward clothing and accessories.
                We offer a wide range of styles curated to suit every taste, from casual wear to
                formal attire. Our mission is to provide high-quality products that make you look
                and feel confident in every occasion.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={
                  () => {
                    delete_cookie('token');
                    router.push('/')
                    router.refresh();
                    onClose()
                  }
                }>
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className=" h-32 flex  justify-around  items-center shadow-xl bg-transparent
   ">
        {/* // Left Protion */}
        <Image src={westlogo} height={68} alt="Westside Logo" priority className="  max-sm:h-10 max-sm:m-auto" />
        {/* <img src={require('./westlogo.png')} ></img> */}
        {/* Center Protion */}
        <div >

          <div className="outerClass flex  justify-start px-6 items-center p-1 border-[1.5px] border-black rounded-3xl my-2 h-14 max-sm:hidden">


            <div className='max-sm:hidden' hidden={typeDis} onClick={() => {
              settypeDis(true)
            }}>

              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Search For SweatShirts',
                  1000,
                  'Search For Casuals',
                  1000,
                  'Search For Western Wears',
                  1000,
                  'Search For Ethnic Wears,Casuals ',
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '1em' }}
                repeat={Infinity}
              />

            </div>
            <div hidden={!typeDis} onMouseLeave={() => {
              // console.log("leaving My Mouse");
              setTimeout(() => {

                setShowPopup(false)
                settypeDis(false)
              }, 300);

            }} className="automate-search-box my-8 bg-black ">

              {/* <input onChange={handleSearch} value={search}  type="text" placeholder='' /> */}


              <Search

                value={input}
                popup={showPopup}
                mytype={settypeDis}
                onChange={(e) => {
                  setInput(e.target.value)

                  setsearch(e.target.value)
                  if (e.target.value = "") {
                    // console.log("If Condtion Satisfied");
                    if (e.target.value = "") {
                      settypeDis(true)
                      settypeDis(false)
                    }
                  }



                }}
                setPopup={() => {
                  setShowPopup(true);
                }}
                closePopup={() => {
                  setShowPopup(false);
                }}
              />

            </div>
          </div>
          {/* Center Lowest Portion */}
          <div>
            <CiMenuBurger onClick={() => {
              setMenuShow(!menuShow)
            }} className='lg:hidden xl:hidden  2xl:hidden md:hidden max-sm:text-2xl max-sm:visible max-sm:mr-5' />
            <ul className={`flex gap-5 text-xl  max-sm:flex-col   max-sm:w-full   max-sm:absolute max-sm:left-0 max-sm:top-32 max-sm:bg-white max-sm:text-xl max-sm:opacity-95 max-sm:rounded-md duration-200  max-sm:${menuShow ? 'visible' : 'hidden'}`}>
              <li onClick={() => {
                setMenuShow(false)
              }} className=" cursor-pointer text-red-400 font-semibold">Sale</li>
              <li onClick={() => {
                setMenuShow(false)
              }} className=" cursor-pointer hover:ext-gray-300"><Link href={'/'}>Home</Link></li>
              <li onClick={() => {
                setMenuShow(false)
              }} className=" cursor-pointer hover:text-gray-300"><Link href={'/products/men'}>Men</Link></li>
              <li onClick={() => {
                setMenuShow(false)
              }} className=" cursor-pointer hover:text-gray-300"><Link href={'/products/women'}>Women</Link></li>
              <li onClick={() => {
                setMenuShow(false)
              }} className=" cursor-pointer hover:text-gray-300"><Link href={'/products/kids'}>Kids</Link></li>
              <li onClick={() => {
                setMenuShow(false)
              }} className=" cursor-pointer hover:text-gray-300"><Link href={'/products/beauty'}>Beauty</Link></li>
              <li onClick={() => {
                setMenuShow(false)
              }} className=" cursor-pointer hover:text-gray-300"><Link href={'/products/brand'}>Brand</Link></li>
              <li onClick={() => {
                setMenuShow(false)
              }} className=" cursor-pointer hover:text-gray-300">W-Style</li>
              <li onClick={() => {
                setMenuShow(false)
              }} className=" cursor-pointer hover:text-gray-300">View More</li>
            </ul>
          </div>
        </div>
        {/* Right Portion */}
        <div className=" w-fit h-fit flex gap-7  justify-center items-center font-medium text-2xl font-medium max-sm:hidden">
          <Link className='cursor-pointer' href={'/wishlist'}>
            <img width="30" height="30" className='' src="https://img.icons8.com/ios/50/like--v1.png" alt="like--v1" />
          </Link>
          <Link className='cursor-pointer' href={'/cart'}>
            <img width="30" height="30" src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="shopping-cart--v1" />
          </Link>
          <div className='flex flex-col'>

            {/* <Link href={'/Login'}>
<button className="button bg-black text-white text-md px-3 rounded-md">{getState}</button>
</Link> */}
            {getState == "Login" && <Link href={'/Login'}>
              <button className="cursor-pointer button  text-black text-md px-3 rounded-md font-light">{getState}</button>
            </Link>}
            {getState != "Login" && <div>
              <Button className='bg-transparent text-2xl' onPress={onOpen}>{getState}</Button>
            </div>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar