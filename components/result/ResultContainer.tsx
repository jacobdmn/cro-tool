import React from 'react'

interface ResultContainerProps {
  answer: string
  type:"yes"|"no"
}

const styles = {
  resultFormContainer:
    'rounded-lg min-w-full flex items-center bg-white py-5 px-12 text-black justify-between',
}

const ResultContainer: React.FC<ResultContainerProps> = ({answer}) => {
        return (
          <div className={styles.resultFormContainer}>
            <p className="font-semibold whitespace-wrap w-[90%] flex-none mb-0">{answer}</p>
            <svg
            className="cursor-pointer"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.15047 0.349529L9.23382 18.651M0.0416795 9.54168L18.3431 9.45833"
                stroke="#CD1C6C"
                stroke-width="2"
                stroke-miterlimit="10"
              />
            </svg>
          </div>
        )
}
export default ResultContainer