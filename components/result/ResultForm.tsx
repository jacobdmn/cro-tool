import Button from '../button/Button'
interface ResultFormProps {}

const styles = {
  formContainer:
    'bg-white rounded-lg shadow-lg shadow-black/10 w-full flex flex-col items-center py-10 px-16 text-black justify-between',
  form_input: 'bg-quizpage_bg px-2 py-2 rounded w-80',
}

const ResultForm: React.FC<ResultFormProps> = ({}) => {
  return (
    <div className={styles.formContainer}>
      <h1 className="text-2xl font-semibold">Enter Your Email Below To Get</h1>
      <div className="flex items-center justify-center gap-12">
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
                  stroke-width="4"
                  stroke-miterlimit="10"
                />
              </svg>
              {item}
            </div>
          )
        )}
      </div>
      <form className="mt-8 flex items-center gap-4">
        <input type="text" className={styles.form_input} />
        <Button text="Get my free audit" className="py-2 text-white py-2" />
      </form>
    </div>
  )
}
export default ResultForm
