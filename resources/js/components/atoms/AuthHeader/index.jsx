import { Link } from "@inertiajs/react";
import React from "react";

const AuthHeader = () => {
  return (
    <div className="text-center mb-4">
      <Link href="/login" className="text-dark text-decoration-none">
        {/* <img src="/images/cash-machine.png" width={70} /> */}
        <h4 className="mt-2 font-weight-bold">TAKJIL RAMADHAN</h4>
      </Link>
    </div>
  );
};

export default AuthHeader;
