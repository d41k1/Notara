import React from "react";
import Button from "@/components/md/button";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 from-0% via-teal-50 via-50% to-sky-300 to-100% w-full h-screen flex flex-col">
      <header className="h-16 p-4 flex flex-row justify-between items-center gap-2">
        <Link href="/">
          <div className="flex flex-row gap-2 items-center">
            <Image src="/icon.svg" alt="Icon" width={24} height={24} />
            <div className="text-center font-display text-2xl font-medium">
              Notara
            </div>
          </div>
        </Link>
        <div className="flex flex-row gap-4 justify-start font-medium">
          <Link href="/login">
            <Button
              label="Login"
              textColor="text-white"
              bgColor="bg-gray-800"
              hoverBgColor="hover:bg-gray-700"
            />
          </Link>
          <Link href="/signup">
            <Button label="Get Started" />
          </Link>
        </div>
      </header>
      <div className="text-center mx-auto h-[90vh] max-w-5xl flex flex-col items-center justify-center gap-6">
        <div className="text-5xl font-bold">Welcome to Notara!</div>
        <div className="text-2xl">
          Organize your ideas and tasks effortlessly, and turn them into
          actionable steps with ease.
        </div>
        <div className="flex flex-row gap-4 justify-start font-medium">
          <Link href="/login">
            <Button
              label="Login"
              textColor="text-white"
              bgColor="bg-gray-800"
              hoverBgColor="hover:bg-gray-700"
            />
          </Link>
          <Link href="/signup">
            <Button label="Get Started" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
