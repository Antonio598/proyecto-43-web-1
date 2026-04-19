import React from 'react'

export default function Sidebar() {
  return (
    <aside className="w-full flex flex-col gap-6">
      {/* Search Widget */}
      <div className="bg-[#3399ff] p-6 text-center text-white flex flex-col gap-3 shadow-sm">
        <h3 className="font-serif italic text-2xl mb-1 mt-2">Search for an activity</h3>
        <p className="text-sm mb-2">Find things to do!</p>
        
        <div className="relative w-full">
          <input 
            type="text" 
            placeholder="Search Tour" 
            className="w-full bg-white text-gray-800 px-4 py-3 rounded-none outline-none text-sm placeholder:text-gray-400"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
        </div>
        
        <button className="w-full bg-[#ff3399] hover:bg-[#e62e8a] transition-colors text-white font-bold text-sm tracking-wide uppercase py-3 mt-1">
          Find Tours
        </button>
      </div>

      {/* Why Us Widget */}
      <div className="bg-white border border-gray-100 p-6 shadow-sm flex flex-col gap-4">
        <h3 className="text-[#333] font-bold uppercase tracking-wide border-b border-gray-100 pb-4 text-[15px]">
          Why TenerifeDreamsExcursion ?
        </h3>
        <div className="text-[#666] text-sm leading-relaxed">
          With more than 10 years of experience specializing in entertainment and excursions, we have carefully selected for you the most popular activities, tourist routes and points of interest in Tenerife. Our mission is that you have a great time, at the best prices.
        </div>
      </div>

      {/* Reviews Widget */}
      <div className="bg-white border border-gray-100 p-6 shadow-sm flex flex-col gap-4">
        <h3 className="text-[#333] font-bold uppercase tracking-wide border-b border-gray-100 pb-4 text-[15px] text-center relative">
          Last Reviews
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#3399ff]"></div>
        </h3>
        
        <div className="flex flex-col gap-6 mt-2">
          {/* Review 1 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-900 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Linda+H&background=random&color=fff" className="w-full h-full object-cover" alt="Linda H" />
                </div>
                <span className="text-[#333] text-sm font-semibold">Linda H</span>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-4 h-4" />
            </div>
            <div className="flex text-[#ffcc00] gap-0.5 mt-1">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              ))}
            </div>
            <p className="text-[#666] text-sm leading-relaxed">Excellent trip with an attentive and friendly guide, Captain Guy.</p>
          </div>
          
          {/* Review 2 */}
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Roger+M&background=random&color=fff" className="w-full h-full object-cover" alt="Roger M" />
                </div>
                <span className="text-[#333] text-sm font-semibold">Roger M</span>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-4 h-4" />
            </div>
            <div className="flex text-[#ffcc00] gap-0.5 mt-1">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              ))}
            </div>
            <p className="text-[#666] text-sm leading-relaxed">Brilliant boat trip</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
