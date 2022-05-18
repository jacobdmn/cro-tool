import { useState, useRef, useEffect } from 'react'
import Button from '../button/Button'
import { Setter } from '../../types/Setter'
import { submitAnswer } from './../../services/quiz'
import Autopilot from 'autopilot-api'

import { AUTOPILOT_KEY, HOME_DIR } from './../../env'
interface ResultFormProps {
  setShowResultPage: Setter<boolean>
  setSlug: Setter<string>
  answers: any
  score: number
  title: string
  setEnteringEmailStage: Setter<boolean>
}

const styles = {
  formContainer:
    'bg-white rounded-lg shadow-lg shadow-black/10 w-full flex flex-col items-center py-10 mt-8 text-black justify-between',
  form_input: 'bg-quizpage_bg px-2 py-2 rounded w-80',
}

const ResultForm: React.FC<ResultFormProps> = ({
  setShowResultPage,
  answers,
  setSlug,
  score,
  title,
  setEnteringEmailStage,
}) => {
  const form: any = useRef()
  const slugInputHidden: any = useRef()

  const [load, setLoad] = useState(false)
  const [email, setEmail] = useState('')
  const [tempSlug, setTempSlug] = useState('')

  useEffect(() => {
    const slug = Math.random().toString(36).slice(2)
    setSlug(slug)
    setTempSlug(slug)
    setEnteringEmailStage(true)
  }, [])

  const answersJson = JSON.stringify(answers)
  const answerObj = {
    answers: answersJson,
    email,
    slug: tempSlug,
    score,
    title,
  }

  const sendEmail = async (e: any) => {
    e.preventDefault()
    if (load || form.current.email.value === '') return
    setLoad(true)

    const autopilot = new Autopilot(AUTOPILOT_KEY)
    const email = form.current.email.value
    const fullName = email
      .split('@')[0]
      .replace(/[0-9]/g, '')
      .replace('.', ' ')
      .split(' ')
      .map((word: string) => word[0].toUpperCase() + word.slice(1))

    const contact = {
      FirstName: fullName[0],
      LastName: fullName[1],
      Email: email,
      Status: `${HOME_DIR}/result/${tempSlug}`,
    }

    // execute the autopilot journey
    try {
      await autopilot.contacts.upsert(contact)
      await autopilot.journeys.add('0002', email)
      setShowResultPage(true)
      setEnteringEmailStage(false)
      setLoad(false)
      console.log('success')
    } catch (error) {
      console.error(error)
      alert(error)
    }
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
    <div className={styles.formContainer + ` mx-auto w-full md:w-fit md:px-16`}>
      <h1 className=" md mb-4 px-2 px-2 text-center text-2xl font-semibold">
        Enter Your Email Below To Get
      </h1>
      <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
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
        className="mt-8 flex flex-col items-center gap-4 md:flex-row"
        ref={form}
        onSubmit={sendEmail}
      >
        <input
          type="email"
          name="email"
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
          className="py-2 text-white"
          disabled={load ? true : false}
        />
      </form>
    </div>
  )
}
export default ResultForm
