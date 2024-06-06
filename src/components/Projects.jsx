import React from 'react'
import { projects } from './data';
import { ArrowUpRight } from 'lucide-react';
import Social from '@/components/social';

export default function Projects({ setActiveMenu }) {
  return (
    <div className='relative mix-blend-difference z-10 text-white h-screen w-full'>
      <ul onMouseLeave={() => { setActiveMenu(null) }} className='border-b'>
        {
          projects.map((project, i) => {
            return (
              <a href={project.href} target='_blank' key={i}>
                <li onMouseOver={() => { setActiveMenu(i) }} className='text-[17px] lg:text-4xl px-5 py-5 tracking-wider lg:py-10 border-t cursor-pointer flex justify-between items-center group font-[400] lg:font-[500]'>
                  <p className='w-full'>{project.title}</p>
                  <p className='scale-0 group-hover:scale-100 w-full flex justify-end opacity-0 group-hover:opacity-100' style={{ transition: "all 0.3s" }}>
                    <span className='hidden lg:block'><ArrowUpRight size={40} /></span>
                  </p>
                  <p>
                    <span className='inline-block lg:hidden'><ArrowUpRight size={24} /></span>
                  </p>
                </li>
              </a>
            )
          })
        }
      </ul>
      <Social />
    </div>
  )
}
