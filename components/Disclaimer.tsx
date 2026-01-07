"use client";

import { useState } from "react";

export default function Disclaimer() {

  const [isClosed, setIsClosed] = useState(false);

  return (
    <div 
    className={`fixed z-1000 bottom-0 right-0 max-w-175 m-4 p-4 flex flex-col sm:flex-row gap-4 border border-[#F9E796] rounded-xl bg-[#FFFBED] text-[#70391A] ${isClosed ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
    >
        <div className="w-full sm:w-fit flex justify-between items-center sm:items-start">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-6 h-6" fill="#CC7C2E"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480v-160q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v160q0 17 11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          <div className="block sm:hidden cursor-pointer" onClick={() => setIsClosed(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#CC7C2E" className="w-6 h-6"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
          </div>
        </div>
        <div className="text-sm">
          <b>Demo Site Notice:</b> This is not an official website. This site is made by Prismic for demonstration purposes only. For any data privacy concerns, please reach out to <a href="mailto:data-privacy@prismic.io" className="font-bold underline">data-privacy@prismic.io</a>
        </div>
        <div className="hidden sm:block cursor-pointer" onClick={() => setIsClosed(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#CC7C2E" className="w-6 h-6"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
        </div>
    </div>
  )
}
