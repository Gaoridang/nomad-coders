import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <Link href={`/`}>Home</Link>
      <Link href={`/about`}>About</Link>
    </>
  );
};

export default Navbar;
