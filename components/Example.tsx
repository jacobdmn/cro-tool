import { useState } from 'react'
import { VscAdd, VscClose } from 'react-icons/vsc'

interface ExampleProps {
  title: string; 
  content?: string 
  isResult: boolean
  type?: 'yes' | 'no'
}


const Example: React.FC<ExampleProps> = ({ title,content ,isResult,type}) => {
    const [showExample, setShowExample] = useState(false)

    const styles = {
      formContainer:
        'relative rounded-lg shadow-lg bg-white shadow-black/10 w-full py-5 px-12 text-black transition duration-1000 ease-in-out',
      formNumber:
        'w-8 h-8 grid place-content-center rounded-full border border-btn_color text-rc_green text-lg p-2',
      formText: `font-semibold whitespace-wrap ${isResult ?"w-[90%]":"w-[70%]"} flex-none mb-0`,
    }

  return (
    <div className={`${styles.formContainer}`}>
      <div className="flex items-center justify-between">
        {!isResult&&
        <span className={styles.formNumber}>?</span>}
        <p className={styles.formText}>{title}</p>
        {type==="no"&&
            <button onClick={() => setShowExample((p) => !p)}>
            {!showExample ? (
                <VscAdd className="text-btn_color" size={24} />
            ) : (
                <VscClose className="text-btn_color" size={24} />
            )}
            </button>
        }
      </div>
      {type==="no"&&
        <div
            className={` px-10 translate-0 overflow-hidden transition duration-1000 ease-in-out  ${
            showExample ? ' max-h-full my-6' : ' max-h-0'
            }`}
        >
            {content}
        </div>
        }
    </div>
  )
}
export default Example
