import { useState, useRef,useEffect } from 'react'
import Button from '../button/Button'
import { Setter } from '../../types/Setter'
import emailjs from '@emailjs/browser'
import { submitAnswer } from './../../services/quiz'

interface ResultFormProps {
  setShowResultPage: Setter<boolean>
  setSlug: Setter<string>
  answers: any
  score: number
  title:string
}

const styles = {
  formContainer:
    'bg-white rounded-lg shadow-lg shadow-black/10 w-full flex flex-col items-center py-10 px-16 mt-8 text-black justify-between',
  form_input: 'bg-quizpage_bg px-2 py-2 rounded w-80',
}

const ResultForm: React.FC<ResultFormProps> = ({
  setShowResultPage,
  answers,
  setSlug,
  score,
  title
}) => {
  const form: any = useRef()
  const [load, setLoad] = useState(false)
  const [email, setEmail] = useState('')
  const [tempSlug, setTempSlug] = useState('')

  const slug = Math.random().toString(36).slice(2)
  useEffect(()=>{
    setSlug(slug)
    setTempSlug(slug)
  },[])

  const answersJson = JSON.stringify(answers)
  const answerObj = { answers: answersJson, email, slug:tempSlug,score ,title}

  const sendEmail = (e: any) => {
    e.preventDefault()
    setLoad(true)

    emailjs
      .sendForm(
        'gmail_service',
        'gmail_template',
        form.current,
        'TAsmOiXnRKlUTL18a'
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
      .then(() => setShowResultPage(true))

    submitAnswer(answerObj).then((res) => {
      if (res.createAnswer) {
        answerObj.answers = ''
        answerObj.email = ''
        answerObj.slug = ''
        answerObj.score = 0
        answerObj.title = ''
      }
    })
  }

  console.log(answers)
  return (
    <div className={styles.formContainer}>
      <h1 className="mb-3 text-2xl font-semibold">
        Enter Your Email Below To Get
      </h1>
      <div className="flex items-center justify-center gap-12">
        {['Your Audit', 'List Of Action Items', 'Breakdown Of Results'].map(
          (item, index) => (
            <div key={index} className="flex items-center gap-2">
              <svg
                width="25"
                height="18"
                viewBox="0 0 45 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43 1.44922L15.9145 28.4492L2 14.5786"
                  stroke="#32CCA7"
                  strokeWidth="4"
                  strokeMiterlimit="10"
                />
              </svg>
              {item}
            </div>
          )
        )}
      </div>
      <form
        className="mt-8 flex items-center gap-4"
        ref={form}
        onSubmit={sendEmail}
      >
        <input
          type="email"
          name="to_email"
          className={styles.form_input}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          required
        />
        <Button
          type="submit"
          text={load ? ' Processing...' : 'Get my free audit'}
          className="py-2 py-2 text-white"
          disabled={load ? true : false}
        />
      </form>
    </div>
  )
}
export default ResultForm
