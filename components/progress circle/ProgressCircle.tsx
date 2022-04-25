import { Progress } from 'antd'
import 'antd/dist/antd.css'

interface ProgressCircleProps {
  percent: number
  className: string
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percent,
  className,
}) => {
  return (
    <div className={`rounded-full ${className}`}>
      <Progress
        className="mb-3"
        type="circle"
        strokeWidth={10}
        // trailColor="#151515"
        // width={100}
        //   strokeLinecap="square"
        strokeColor="#32CCA7"
        percent={percent}
      />
    </div>
  )
}
export default ProgressCircle
