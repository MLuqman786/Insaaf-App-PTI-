import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className=" bg-stone-900 flex justify-around">
        <span className="text-stone-200 flex align-items-center h-60 pl-5">
          <ul className="list-disc">
            <li className="mb-2 mt-5">
              <Link>News</Link>
            </li>
            <li className="mb-2 mt-5">
              <Link>Social Activity</Link>
            </li>
            <li className="mb-2 mt-5">
              <Link>About Party</Link>
            </li>
            <li className="mb-2 mt-5">
              <Link>Struggle for our Vision</Link>
            </li>
            <li className="mb-2 mt-5">
              <Link>History</Link>
            </li>
            <li className="mb-2 mt-5">
              <Link>What we do</Link>
            </li>
          </ul>
        </span>
        <span className="text-stone-200 flex align-items-center h-80 pl-5">
          <ul className="list-disc">
            <li className="mb-2 mt-5">
              <Link>News</Link>
            </li>
            <li className="mb-2 mt-5">
              <Link>Social Activity</Link>
            </li>
            <li className="mb-2 mt-5">
              <Link>About Party</Link>
            </li>
            <li className="mb-2 mt-5">
              <Link>Struggle for our Vision</Link>
            </li>
            <li className="mb-2 mt-5">
              <Link>History</Link>
            </li>
            <li className="mb-2 mt-5">
              <Link>What we do</Link>
            </li>
          </ul>
        </span>
      </footer>
      <hr className="bg-white"/>
      <div className="bg-stone-900 text-stone-200 font-medium flex justify-center items-center h-10 ">
        <p>© Copyright Pakistan Tehreek-e-Insaf 2023&nbsp;All Rights Reserved</p>
      </div>
    </>
  );
};

export default Footer;