import Image from 'next/image'
import Link from 'next/link'
import Button from '../button/Button'

import rc_logo from '../../assets/images/rc_logo.png'
import { auditButtons } from './../../pages/index'
import { Setter } from '../../types/Setter'

interface FooterProps {
  showResult: boolean
}

const Footer: React.FC<FooterProps> = ({ showResult }) => {
  const styles = {
    quizpage_footer: 'flex flex-col items-center justify-center',
    quizpage_footer1: `quizpage_footer1 h-96 grid place-content-center container max-w-full mx-auto relative ${
      showResult ? '-bottom-12' : '-bottom-8'
    }  z-30`,
    quizpage_footer2: `quizpage_footer2 py_24 flex flex-col justify-center gap-12 container max-w-full mx-auto z-40 ${
      showResult ? 'h-96' : 'h-48'
    }`,
    share_input: 'bg-white/50 px-2 py-1 rounded w-80',
  }

  return (
    <footer className={styles.quizpage_footer}>
      <div className={styles.quizpage_footer1}>
        <svg
          width="30"
          height="25"
          viewBox="0 0 40 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-4"
        >
          <path
            d="M36.6406 20.8123L22.9375 34.7732C22.1563 35.5701 21.1172 36.0076 20 36.0076C18.8906 36.0076 17.8438 35.5623 17.0625 34.7654L3.35939 20.8044C-0.828113 16.531 -1.68749 8.46851 4.18751 3.5232C8.70314 -0.281494 15.6797 0.296636 20 4.69508C24.3203 0.296636 31.2969 -0.273674 35.8125 3.5232C41.6953 8.47632 40.8203 16.5388 36.6406 20.8123ZM33.3985 6.39039C30.375 3.84352 25.6875 4.2107 22.7344 7.21851L20 10.0076L17.2656 7.21851C14.3281 4.22632 9.64064 3.84351 6.60158 6.3982C2.60158 9.76539 3.1797 15.2654 6.03127 18.1716L19.7344 32.1326C19.9219 32.3201 20.0781 32.3201 20.2656 32.1326L33.9688 18.1716C36.7969 15.2888 37.3906 9.75757 33.3985 6.39039Z"
            fill="#CD1C6C"
          />
        </svg>
        <p className="text-center">
          Know someone who could do with a free CRO audit? <br /> Enter their
          email below to share this tool with them
        </p>
        <div className="flex items-center justify-center gap-2">
          <input
            id="share_input"
            name="share_input"
            className={styles.share_input}
          />
          <Button text="Share" className="py-1" />
        </div>
      </div>
      <div className={styles.quizpage_footer2}>
        {showResult && (
          <div className="mt-12 text-center">
            <h1 className="text-2xl text-white">
              Choose Your Next Free Rocket CRO Audit
            </h1>
            <div className="mx-auto grid w-[80%] grid-cols-2 place-content-center gap-4 pt-10">
              {auditButtons.map((btn) => (
                  <a key={btn.id} href={`/${btn.slug}`}>
                    <button className="px-auto w-full whitespace-nowrap rounded bg-rc_green py-2 text-white">
                      {btn.text}
                    </button>
                  </a>
              ))}
            </div>
          </div>
        )}
        <div className="text-center">
          <Image
            height={30}
            width={102}
            src={rc_logo}
            className="object-cover"
          />
        </div>
      </div>
    </footer>
  )
}
export default Footer
