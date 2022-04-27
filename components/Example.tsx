import { useState } from 'react'
import { VscAdd, VscClose } from 'react-icons/vsc'

interface ExampleProps {
  example: { title: string; content: string }
}

const styles = {
  formContainer:
    'relative rounded-lg shadow-lg bg-white shadow-black/10 w-full py-5 px-12 text-black transition duration-1000 ease-in-out',
  formNumber:
    'w-8 h-8 grid place-content-center rounded-full border border-btn_color text-rc_green text-lg p-2',
  formText: 'font-medium w-[60%] flex-none mb-0',
}

const Example: React.FC<ExampleProps> = ({ example }) => {
  const [showExample, setShowExample] = useState(false)
  return (
    <div className={`${styles.formContainer}`}>
      <div className="flex items-center justify-between">
        <span className={styles.formNumber}>?</span>
        <p className={styles.formText}>{example.title}</p>
        <button onClick={() => setShowExample((p) => !p)}>
          {!showExample ? (
            <VscAdd className="text-btn_color" size={24} />
          ) : (
            <VscClose className="text-btn_color" size={24} />
          )}
        </button>
      </div>
      <div
        className={` px-10 translate-0 overflow-hidden transition duration-1000 ease-in-out  ${
          showExample ? ' max-h-full my-6' : ' max-h-0'
        }`}
      >
        {example.content}
      </div>
    </div>
  )
}
export default Example
