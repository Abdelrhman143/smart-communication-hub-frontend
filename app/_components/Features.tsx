"use client";
import { useEffect } from "react";
import Feature from "./Feature";
import "aos/dist/aos.css";
import AOS from "aos";
export default function Features() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: "phone", // Disable animations on small screens
    });
  }, []);
  return (
    <section className="my-15">
      <div>
        <h2 className="text-center text-4xl font-bold">
          Everything You Need for Smart Communication
        </h2>
        <p className="text-gray-500 mt-4 mb-10 text-lg text-center max-w-2xl mx-auto">
          Powerful features designed to make your conversations more productive
          and insightful
        </p>
      </div>
      <div className="container">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 "
          data-aos="fade-up"
        >
          <Feature />
          <Feature />
          <Feature />
          <Feature />
        </div>
      </div>
    </section>
  );
}
