"use client";

import React from "react";
import TopNavbar from "@/app/components/TopNavbar";

const FormSubmit = ({ params: { title } }: { params: { title: string } }) => {
  return (
    <div>
      <TopNavbar />
    </div>
  );
};

export default FormSubmit;
