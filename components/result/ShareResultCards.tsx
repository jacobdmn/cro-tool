import React from 'react'
import ProgressCircle from '../progress circle/ProgressCircle';
import Button from './../button/Button';

interface ShareResultCardsProps {
  score: number
  slug:string
}
const styles = {
  resultCardsContainer: 'grid grid-cols-2 gap-6 w-full mb-6 mt-4',
  cardContainer:
    'cardContainer py-8 px-6 flex justify-between rounded-xl bg-main_color h-56',
  cardTitle: 'text-xl font-semibold text-white mb-0',
}

const ShareResultCards: React.FC<ShareResultCardsProps> = ({
  score,
  slug,
}) => {
  return (
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
            score={score}
          />
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className="flex w-full flex-col justify-between">
          <div>
            <h2 className={styles.cardTitle}>Share Your Results</h2>
            <a href={`/result/${slug}`}>
              https://cro-tool.netlify.app/result/{slug}
            </a>
          </div>
          <Button text="Copy Link" />
        </div>
      </div>
    </div>
  )
}
export default ShareResultCards