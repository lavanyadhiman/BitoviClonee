import { useState } from "react";

function Navbar({ setShowContactForm }) {
  const items = [
    "SERVICES", "CLIENT WORK", "ABOUT US", "OPEN SOURCE", "BLOG", "ACADEMY", "JOBS"
  ];
  const [buttonText, setButtonText] = useState("Contact");

  const handleClick = () => {
    // Toggle the button text and form visibility
    if (buttonText === "Contact") {
      setButtonText("Close");
      setShowContactForm(true);
    } else {
      setButtonText("Contact");
      setShowContactForm(false);
    }
  };

  return (
    <nav className="bitovi-nav mx-auto grid grid-cols-2 sm:grid-cols-[auto_1fr_auto] gap-3 py-[8px] px-6 ml-[140px]">
      <div className="justify-self-start row-start-1">
        <img
          src="https://www.bitovi.com/hubfs/limbo-generated/imgs/logos/bitovi-logo-23.svg"
          alt="Bitovi Home Page"
          className="min-w-[108px]"
        />
      </div>

      <ul className="flex gap-x-[24px]  md-[4px] list-none sm:grid sm:row-start-1 sm:col-span-1
          sm:grid-cols-[repeat(4,_auto)] lg:grid-cols-[repeat(8,_auto)] gap-y-1 justify-self-center items-center text-center
          text-gray-400 text-xs font-bold">
        {items.map((item, index) => (
          <li key={index} className="inline-block px-[10px] sm:px-0">
            <a href="#" className="navigation-labels">{item}</a>
          </li>
        ))}
      </ul>

      <button onClick={handleClick} className="text-white text-base font-bold rounded-md bg-red-600 px-4 py-2 mr-[150px]
    hover:bg-red-700 transform hover:scale-105 transition duration-200 cursor-pointer">
        {buttonText}
      </button>
    </nav>
  );
}

export default Navbar;
