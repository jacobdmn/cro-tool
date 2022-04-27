import { CircularProgressbarWithChildren,buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface ProgressCircleProps {
  percent: number
  className: string
  questionIndex?:number
  questionsLength?:number
  score?:number
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percent,
  className,
  questionIndex ,
  questionsLength,
  score
}) => {
  return (
    <div
      style={{ width: 150, height: 150 }}
      className={`rounded-full ${className}`}
    >
      <CircularProgressbarWithChildren
        value={score?100:percent}
        styles={buildStyles({
          pathColor: '#32CCA7',
          trailColor: 'white',
        })}
      >
        {score&& <p className="text-xs mb-0"> YOUR SCORE </p>}
        <span className="text-4xl font-semibold">{percent}%</span>
        {questionsLength&&
        <>
          <span className="h-1 w-[50%] bg-gray-800 mb-1 mt-0.5" />
          <span className="text-gray-600 ">{questionIndex}/{questionsLength}</span>
        </>}
      </CircularProgressbarWithChildren>
    </div>
  )
}
export default ProgressCircle
