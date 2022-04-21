import React from 'react'

const styles = {
  formContainer:
    'bg-white rounded shadow-lg shadow-black/10 flex items-center py-5 px-12 text-black justify-between',
  formNumber:
    'w-8 h-8 grid place-content-center rounded-full border border-btn_color text-rc_green text-lg p-2',
  formText: 'font-medium w-[60%] flex-none mb-0',
  radio_label: "text-xs text-gray-500"
}

interface QuizFormProps {}

const QuizForm: React.FC<QuizFormProps> = ({}) => {
  return (
    <div className={styles.formContainer}>
      <span className={styles.formNumber}>1</span>
      <p className={styles.formText}>
        Awareness - immediately & clearly show what problem you solve, or what
        your offer is.
      </p>
      <div className="flex items-center gap-6">
        <div className="grid place-content-center">
            <label htmlFor="yes" className={styles.radio_label}>YES</label>
            <input id="yes" name="radio_btn" type="radio" />
        </div>
        <div className="grid place-content-center">
            <label htmlFor="no" className={styles.radio_label}>NO</label>
            <input id="no" name="radio_btn" type="radio" />
        </div>
      </div>
    </div>
  )
}
export default QuizForm
