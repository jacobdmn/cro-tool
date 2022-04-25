import { useState } from 'react'
import ResultForm from './ResultForm'
interface ResultPageProps {}

const ResultPage: React.FC<ResultPageProps> = ({}) => {
  const [showResultPage, setShowResultPage] = useState<boolean>(false)
  return (
    <div>
      {showResultPage ? (
        'result page'
      ) : (
        <ResultForm setShowResultPage={setShowResultPage} />
      )}
    </div>
  )
}
export default ResultPage
