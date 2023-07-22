import React from "react";

const Footer = () => {
    return (
        <div className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12">
            <div className="flex flex-col items-center justify-center">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-500 text-3xl font-bold">BIGBAZAAR</p>
                <div className="flex flex-wrap sm:gap-10 gap-8 items-center justify-center mt-8">
                    <p className="hover:text-gray-500 text-base cursor-pointer leading-4 text-gray-800">About</p>
                    <p className="hover:text-gray-500 text-base cursor-pointer leading-4 text-gray-800">Contact us</p>
                </div>
                <div className="flex items-center mt-6">
                    <p className="text-base leading-4 text-gray-800">
                        2023 <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-500">BIGBAZAAR</span>
                    </p>
                    <div className="border-l border-gray-800 pl-2 ml-2">
                        <p className="text-base leading-4 text-gray-800">Inc. All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
