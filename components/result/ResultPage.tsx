import React, { useState } from 'react'
import ResultForm from './ResultForm'
import Example from '../Example'
import ShareResultCards from './ShareResultCards'
import { useRouter } from 'next/router'
import ProgressCircle from './../progress circle/ProgressCircle'

interface ResultPageProps {
  title: string
  score: number
  answers: {
    options: {
      answer: string
      option: string
    }[]
    questionTitle: string
    exampleText: string
    exampleImage: any
  }[]
  reff: any
  setEnteringEmailStage?: any
}

const styles = {
  pageContainer:
    'flex w-[90%] 2xl:w-[100%] flex-col items-center justify-center gap-20 pt-10 mx-auto max-w-[1000px]',
}

const ResultPage: React.FC<ResultPageProps> = React.forwardRef(
  ({ score, answers, title, reff, setEnteringEmailStage }, ref: any) => {
    const router = useRouter()

    const [showResultPage, setShowResultPage] = useState<boolean>(
      router.pathname.includes('result') ? true : false
    )
    const [slug, setSlug] = useState(
      router.pathname.includes('result') ? (router.query.slug as string) : ''
    )
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
      <div className="relative flex flex-col items-center justify-center pb-20">
        <ProgressCircle
          className="absolute -top-24 bg-quizpage_bg p-2 text-black"
          percent={Math.floor(score)}
          score={score}
        />
        <div className="mx-auto w-full py-10 ">
          {showResultPage ? (
            <div className={styles.pageContainer}>
              <ShareResultCards
                score={score}
                slug={slug}
                reff={reff}
                setIsExpanded={setIsExpanded}
              />
              <div className="flex w-full flex-col gap-4">
                {answers.map((answer, i) => (
                  <div key={i} className=" w-full">
                    <h1 className="mx-auto mb-4 w-[70%] text-center text-xl font-semibold text-black">
                      {answer.questionTitle}
                    </h1>
                    <div className="flex w-full flex-col justify-between gap-6 md:flex-row">
                      {answer.options.filter(
                        (option) => option.answer === 'yes'
                      ).length > 0 && (
                        <div className="w-[90vw] flex-1 md:w-[50%]">
                          <AnswerTypeHeader answerType="yes" />
                          <div className="flex flex-col items-center gap-4">
                            {answer.options
                              .filter((option) => option.answer === 'yes')
                              .map((option, index) => (
                                <Example
                                  key={index}
                                  isResult={true}
                                  title={option.option}
                                  exampleText={answer.exampleText}
                                  exampleImage={answer.exampleImage}
                                  type="yes"
                                  isExpanded={isExpanded}
                                  boxShadow="0px 0px 0.2rem 0.2rem rgba(42, 203, 149, 1)"
                                />
                              ))}
                          </div>
                        </div>
                      )}
                      {answer.options.filter((option) => option.answer === 'no')
                        .length > 0 && (
                        <div className="w-[90vw] flex-1 md:w-[50%]">
                          <AnswerTypeHeader answerType="no" />
                          <div className="flex flex-col items-center gap-4">
                            {answer.options
                              .filter((option) => option.answer === 'no')
                              .map((option, index) => (
                                <Example
                                  key={index}
                                  title={option.option}
                                  exampleText={answer.exampleText}
                                  exampleImage={answer.exampleImage}
                                  isResult={true}
                                  type="no"
                                  isExpanded={isExpanded}
                                  boxShadow="0px 0px 0.2rem 0.2rem rgba(230, 20, 20, 0.35)"
                                />
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="my-16 block h-2 w-full bg-gray-300 "></span>
                  </div>
                ))}
              </div>
              <h1 className="text-3xl font-semibold text-black">
                Thanks for using the Rocket CRO tool
              </h1>
              <ShareResultCards
                score={score}
                slug={slug}
                reff={reff}
                setIsExpanded={setIsExpanded}
              />
            </div>
          ) : (
            <ResultForm
              setShowResultPage={setShowResultPage}
              setEnteringEmailStage={setEnteringEmailStage}
              answers={answers}
              setSlug={setSlug}
              score={score}
              title={title}
            />
          )}
        </div>
      </div>
    )
  }
)
export default ResultPage

const AnswerTypeHeader: React.FC<{ answerType: string }> = ({ answerType }) => {
  return (
    <div className="mb-8 flex flex-col items-center justify-center text-center text-black">
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
          <span className="mt-2 h-0.5 w-full bg-rc_green-opacity-05" />
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
