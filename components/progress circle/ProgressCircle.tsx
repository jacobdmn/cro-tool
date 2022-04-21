import { Progress } from 'antd'
import 'antd/dist/antd.css'

interface ProgressCircleProps {
  percent: number
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percent }) => {
  return (
    <div className="absolute -top-24 rounded-full bg-quizpage_bg p-2">
      <Progress
        className="mb-3"
        type="circle"
        strokeWidth={10}
        // trailColor="#151515"
        width={100}
        //   strokeLinecap="square"
        strokeColor="#32CCA7"
        percent={percent}
      />
    </div>
  )
}
export default ProgressCircle
