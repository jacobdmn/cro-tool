import { useState } from 'react'
import ResultForm from './ResultForm'
import Button from './../button/Button'
import ProgressCircle from './../progress circle/ProgressCircle'
import { QuizType } from '../../types/QuizType'
import ResultContainer from './ResultContainer'

const AnswerTypeHeader: React.FC<{ answerType: string }> = ({ answerType }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-black">
      {answerType === 'yes' ? (
        <>
          <svg
            className="my-6"
            width="60"
            height="60"
            viewBox="0 0 76 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M75.2801 38.2516C75.1662 59.3772 58.268 76.5953 37.5368 76.7091C16.8057 76.823 0.0920481 59.7896 0.205922 38.664C0.319796 17.5383 17.218 0.320285 37.9492 0.206411C58.6804 0.0925371 75.394 17.1259 75.2801 38.2516ZM7.71334 38.6227C7.62224 55.5232 20.9931 69.15 37.5781 69.0589C54.163 68.9678 67.6816 55.1933 67.7727 38.2928C67.8638 21.3923 54.4929 7.76558 37.908 7.85668C21.323 7.94778 7.80444 21.7222 7.71334 38.6227Z"
              fill="#32CCA7"
            />
            <path
              d="M52.5901 28.2007L32.9532 48.0173L22.8652 37.837"
              stroke="#32CCA7"
              strokeWidth="4"
              strokeMiterlimit="10"
            />
          </svg>
          <p>HERE ARE THE THINGS YOU ARE DOING WELL</p>
          <span className="mt-2 h-0.5 w-full bg-rc_green" />
        </>
      ) : (
        <>
          <svg
            className="my-6"
            width="60"
            height="60"
            viewBox="0 0 76 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M75.2801 38.2516C75.1662 59.3772 58.268 76.5953 37.5368 76.7091C16.8057 76.823 0.0920481 59.7896 0.205922 38.664C0.319796 17.5383 17.218 0.320285 37.9492 0.206411C58.6804 0.0925371 75.394 17.1259 75.2801 38.2516ZM7.71334 38.6227C7.62224 55.5232 20.9931 69.15 37.5781 69.0589C54.163 68.9678 67.6816 55.1933 67.7727 38.2928C67.8638 21.3923 54.4929 7.76558 37.908 7.85668C21.323 7.94778 7.80444 21.7222 7.71334 38.6227Z"
              fill="#EC4B4B"
            />
            <path
              d="M47.193 28.2007L27.5561 48.0173M27.4668 28.2905L47.2834 47.9274"
              stroke="#EC4B4B"
              strokeWidth="4"
              strokeMiterlimit="10"
            />
          </svg>
          <p>HERE ARE THE THINGS YOU ARE NOT DOING WELL</p>
          <span className="mt-2 h-0.5 w-full bg-[#EC4B4B]" />
        </>
      )}
    </div>
  )
}

interface ResultPageProps {
  score: number
  answers: {
    options: { answer: string; option: string }[]
    questionTitle: string
  }[]
}

const styles = {
  pageContainer:
    'flex w-[80%] flex-col items-center justify-center gap-20 py-10 mx-auto',
  resultCardsContainer: 'grid grid-cols-2 gap-6 w-full',
  cardContainer:
    'cardContainer py-8 px-6 flex justify-between rounded bg-main_color h-56',
  cardTitle: 'text-xl font-semibold text-white mb-0',
}

const ResultPage: React.FC<ResultPageProps> = ({  score, answers }) => {
  const [showResultPage, setShowResultPage] = useState<boolean>(false)


  return showResultPage ? (
    <div className={styles.pageContainer}>
      <div className={styles.resultCardsContainer}>
        <div className={styles.cardContainer}>
          <div className="flex flex-col justify-between">
            <h2 className={styles.cardTitle}>
              Download Your <br />
              Results as PDF
            </h2>
            <Button text="Download PDF" />
          </div>
          <div className="flex items-center justify-center">
            <ProgressCircle
              className="text-white"
              percent={Math.floor(score)}
            />
          </div>
        </div>
        <div className={styles.cardContainer}>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className={styles.cardTitle}>Share Your Results</h2>
              <a href="">
                https://rocket-conversions.com/conversion-rate-optimization-checklist/
              </a>
            </div>
            <Button text="Copy Link" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        {answers.map((answer, i) => (
          <div key={i}>
            <h1 className="mx-auto mb-0 w-[70%] text-center text-xl font-semibold">
              {answer.questionTitle}
            </h1>
            <div className="flex w-full justify-between gap-6">
              {answer.options.filter((option) => option.answer === 'yes')
                .length > 0 && (
                <div>
                  <AnswerTypeHeader answerType="yes" />
                  <div className="flex w-full flex-col items-center gap-4">
                    {answer.options
                      .filter((option) => option.answer === 'yes')
                      .map((answer, index) => (
                       <ResultContainer key={index} answer={answer} type="yes"/>
                      ))}
                  </div>
                </div>
              )}
              {answer.options.filter((option) => option.answer === 'no')
                .length > 0 && (
                <div>
                  <AnswerTypeHeader answerType="no" />
                  <div className="flex w-full flex-col items-center gap-4">
                    {answer.options
                      .filter((option) => option.answer === 'no')
                      .map((answer, index) => (
                        <ResultContainer key={index} answer={answer} type="no" />
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <ResultForm setShowResultPage={setShowResultPage} />
  )
}
export default ResultPage
