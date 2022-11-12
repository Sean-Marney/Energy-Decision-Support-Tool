import Image from 'next/image'

import ClientLogo from '../res/img/cardiff_uni_logo.png'

export default function HeaderBar({children}) {
  return (
    <>
      { /* Header bar */ }
      <div>
        <div className="flex justify-start items-center gap-x-10 py-4 px-8 bg-white shadow-2xl">
          <Image src={ClientLogo} width={100} height={100} />
          <h1 className="text-4xl">Energy DSS</h1>
        </div>
      </div>
      {children}
    </>
  );
}
