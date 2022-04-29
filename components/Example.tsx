import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'

interface ExampleProps {
  title: string
  content?: string
  isResult: boolean
  type?: 'yes' | 'no'
}
const useStyles = makeStyles({
  index: {
    width: '15px !important',
    height: '15px !important',
    padding: '15px',
    border: '1px solid #CD1C6C',
    borderRadius: '50%',
    textAlign: 'center',
    marginInlineEnd: '30px',
    lineHeight: '1em !important',
    display: 'grid',
    placeContent: 'center',
  },
  exampleWrapper: {
    marginTop: '20px',
    width: '100%',
    '&, & *': {
      cursor: 'pointer',
    },
  },
  addIcon: {
    transform: 'none !important',
  },
  example: {
    width: '100%',
    position: 'relative',
    margin: 'auto',
    display: 'flex !important',
    justifyContent: 'space-around',
    textAlign: 'center',
    boxShadow: '0px 0px 8px 8px rgba(0,0,0,0.04)',
    borderRadius: '10px',
  },
  accordionWrapper: {
    width: '100%',
    display: 'flex',
    margin: 'auto',
  },
  accordion: {
    boxShadow: 'none !important',
  },
  questionIcon: {
    color: '#32CCA7',
    fontSize: '16px !important',
  },
  accordionText: {
    textAlign: 'left',
    color: '#CD1C6C',
    fontSize: '16px',
    fontWeight: 'bold !important',
    lineHeight: '3em !important',
  },
  exampleImg: {
    width: '100%',
  },
  nextBtn: {
    backgroundColor: '#CD1C6C !important',
    boxShadow: 'none !important',
    height: '2.8em',
  },
})

const CustomExpandIcon = () => {
  return (
    <Box
      sx={{
        '.Mui-expanded & > .collapseIconWrapper': {
          display: 'none',
          color: '#CD1C6C !important',
        },
        '.expandIconWrapper': {
          display: 'none',
          color: '#CD1C6C !important',
        },
        '.Mui-expanded & > .expandIconWrapper': {
          display: 'block',
          color: '#CD1C6C !important',
        },
      }}
    >
      <CloseIcon className="expandIconWrapper" />
      <AddIcon className="collapseIconWrapper" />
    </Box>
  )
}

const Example: React.FC<ExampleProps> = ({
  title,
  content,
  isResult,
  type,
}) => {
  const [showExample, setShowExample] = useState(false)
  const classes = useStyles()

  return (
    <div className={classes.exampleWrapper}>
      <div className={classes.example}>
        <div className={classes.accordionWrapper}>
          <Accordion
            className={classes.accordion}
            sx={{
              background: 'none',
              width: '100%',
            }}
          >
            <AccordionSummary
              expandIcon={<CustomExpandIcon className={classes.addIcon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {isResult ? (
                <div
                  style={{
                    marginRight: '1.5rem',
                    fontWeight: '400',
                    fontSize: '1.2rem',
                    lineHeight: '1.6',
                    textAlign: 'left',
                  }}
                >
                  {title}
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'left',
                  }}
                >
                  <span className={classes.index}>
                    <QuestionMarkIcon className={classes.questionIcon} />
                  </span>
                  <Typography className={classes.accordionText}>
                    Click Here To See An Example
                  </Typography>
                </div>
              )}
            </AccordionSummary>
            <AccordionDetails>
              {content}
              <img
                src="/example-img.png"
                className={classes.exampleImg}
                alt="example"
              />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
export default Example
