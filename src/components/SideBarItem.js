import Image from 'next/image'
import ClientLogo from '../res/img/cardiff_uni_logo.png'

import * as ReactIconsTb from 'react-icons/tb'
import * as ReactIconsFa from 'react-icons/fa'

import Link from 'next/link'

export default function SideBarItem({ name, icon, path }) {
    var IconRender

    if(icon.startsWith("Tb")) {
        IconRender = ReactIconsTb[icon];
    } else if(icon.startsWith("Fa")) {
        IconRender = ReactIconsFa[icon];
    }

  return (

    <div className="text-white text-2xl inline my-5"><Link href={ path }><section className="text-white text-2xl inline">
                    <span className="inline-block text-4xl align-middle mr-4">
                        <IconRender />
                    </span>
                    <span>
                        {name}
                    </span>
            </section></Link></div>

  );
}
