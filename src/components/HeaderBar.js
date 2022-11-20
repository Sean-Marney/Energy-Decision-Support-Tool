import Image from 'next/image'

import ClientLogo from '../res/img/cardiff_uni_logo.png'

export default function HeaderBar({children}) {
  return (
    <>
      { /* Header bar */ }
      <div>
        <div className="flex justify-start items-center gap-x-10 py-4 px-8 bg-white shadow-2xl">
          <Image src={ClientLogo} width={100} height={100} />
          <h1 className="text-4xl min-w-fit">Energy DSS</h1>
          { /* Form elements */ }
          <div className="w-full">
            <div className="text-right">
              <select type="text" className="text-2xl border-2 bg-white px-2">
                <option>Cardiff University</option>
              </select>
              <select type="text" className="ml-4 text-2xl border-2 bg-white px-2">
                <option>Abacws Buildiing</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
