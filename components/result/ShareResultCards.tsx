import { useState } from 'react'
import ProgressCircle from '../progress circle/ProgressCircle'
import { useReactToPrint } from 'react-to-print'
import Button from './../button/Button'
import { Setter } from './../../types/Setter'

interface ShareResultCardsProps {
  score: number
  slug: string
  reff: any
  setIsExpanded: Setter<boolean>
}
const styles = {
  resultCardsContainer: 'grid grid-cols-2 gap-6 w-full mb-6 mt-4',
  cardContainer:
    'cardContainer py-8 px-6 flex justify-between rounded-xl bg-main_color h-56',
  cardTitle: 'text-xl font-semibold text-white mb-1.5',
}

const ShareResultCards: React.FC<ShareResultCardsProps> = ({
  score,
  slug,
  reff,
  setIsExpanded,
}) => {
  const [tooltip, setTooltip] = useState(false)

  const handleCopyLinkButton = () => {
    setTooltip(true)
    navigator.clipboard.writeText(`https://cro-tool.netlify.app/result/${slug}`)
    setTimeout(() => {
      setTooltip(false)
    }, 4000)
  }

  const handlePrint = useReactToPrint({
    content: () => reff.current,
  })

  const handleOnClick =()=>{
    setIsExpanded(true)
    // setTimeout(() => {
    //   setIsExpanded(false)
    // }, 3000);
    handlePrint()
  }

  return (
    <div className={styles.resultCardsContainer}>
      <div className={styles.cardContainer}>
        <div className="flex flex-col justify-between">
          <h2 className={styles.cardTitle}>
            Download Your <br />
            Results as PDF
          </h2>
          <Button text="Download PDF" onClick={handleOnClick} />
        </div>
        <div className="flex items-center justify-center">
          <ProgressCircle
            className="text-white"
            percent={Math.floor(score)}
            score={score}
          />
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className="flex w-full flex-col justify-between">
          <div className="relative">
            <h2 className={styles.cardTitle}>Share Your Results</h2>
            <a
              className="text-gray-100 hover:text-white"
              href={`/result/${slug}`}
            >
              https://cro-tool.netlify.app/result/{slug}
            </a>
            <div
              role="tooltip"
              className={`tooltip absolute top-14 left-32 z-10 inline-block whitespace-nowrap rounded-lg bg-gray-900 py-2 px-3 text-sm font-medium text-white shadow-sm transition duration-700 ease-in-out dark:bg-gray-700 ${
                tooltip ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Link copied to clipboard
              <div className="tooltip-arrow"></div>
            </div>
          </div>
          <Button text="Copy Link" onClick={handleCopyLinkButton} />
        </div>
      </div>
    </div>
  )
}
export default ShareResultCards
