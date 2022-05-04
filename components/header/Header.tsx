import React from 'react'
import  Image  from 'next/image';

import rc_logo from '../../assets/images/rc_logo.png'

interface HeaderProps {
        showResult:boolean
        title:string
}

const styles = {
  quizpage_header:
    'quizpage_header pb-20 pt-8 flex flex-col gap-10 items-center justify-center h-96',
  header_title: ' text-center text-3xl font-semibold text-white mb-0',
}

const Header: React.FC<HeaderProps> = ({ showResult ,title}) => {
  return (
    <header className={styles.quizpage_header}>
      <Image height={50} width={172} src={rc_logo} className="object-cover" />
      <h1 className={styles.header_title}>
        {showResult
          ? 'Your ' + title + ' Audit Results '
          : 'Audit Your ' + title}
      </h1>
    </header>
  )
}
export default Header