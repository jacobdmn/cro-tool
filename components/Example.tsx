import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { createTheme } from '@mui/material/styles'
import { BsArrowsFullscreen } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

const theme = createTheme()

const modelBoxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: '24',
}
const useStyles: any = makeStyles({
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
    fontWeight: 'bold',
    lineHeight: '3em !important',
  },
  exampleImgButton: {
    width: '100%',
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

const CustomExpandIcon: any = () => {
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

interface ExampleProps {
  title?: string
  exampleText?: string
  exampleImage?: any
  isResult?: boolean
  type?: 'yes' | 'no'
  isExpanded?: boolean
  boxShadow?: string
}

const Example: React.FC<ExampleProps> = ({
  title,
  exampleText,
  exampleImage,
  isResult,
  type,
  isExpanded,
  boxShadow,
}) => {
  const [showExample, setShowExample] = useState(false)
  const classes = useStyles()

  const [openExample, setOpenExample] = useState(false)
  const handleOpenExample = () => setOpenExample(true)
  const handleCloseExample = () => setOpenExample(false)

  return (
    <div className={classes.exampleWrapper}>
      <div className={classes.example} style={{ boxShadow }}>
        <div className={classes.accordionWrapper}>
          <Accordion
            className={classes.accordion}
            sx={{
              background: 'none',
              width: '100%',
            }}
            // expanded={isExpanded}
          >
            <AccordionSummary
              className="flex-col pb-2 md:flex-row md:pb-0"
              expandIcon={
                <Tooltip title="Click here to see an example">
                  <IconButton
                    sx={{
                      border: '1px solid currentcolor',
                    }}
                  >
                    <CustomExpandIcon className={classes.addIcon} />
                  </IconButton>
                </Tooltip>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {isResult ? (
                <div
                  style={{
                    marginRight: '1.5rem',
                    fontWeight: '400',
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
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
                    Click here to see an example
                  </Typography>
                </div>
              )}
            </AccordionSummary>
            <AccordionDetails>
              {exampleText && (
                <div
                  style={{
                    textAlign: 'left',
                    marginBottom: '1rem',
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
                    fontWeight: '400',
                    borderTop: '1px solid rgba(131, 11, 11, 0.16)',
                    paddingTop: '1rem ',
                  }}
                >
                  💬 {exampleText}
                </div>
              )}

              {exampleImage && (
                <>
                  <button
                    onClick={handleOpenExample}
                    className="relative flex w-full transition duration-200 ease-in-out hover:scale-[0.99]"
                  >
                    <span className="absolute top-4 left-4 hover:scale-95">
                      <BsArrowsFullscreen />
                    </span>
                    <img
                      src={exampleImage.url}
                      className={classes.exampleImgButton}
                      alt="example"
                    />
                  </button>
                  <div className={`relative min-w-[90vw]`}>
                    <Modal
                      open={openExample}
                      onClose={handleCloseExample}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modelBoxStyle} onClick={handleCloseExample}>
                        <span
                          className="absolute top-6 right-8 hover:scale-95"
                          onClick={handleCloseExample}
                        >
                          <AiOutlineClose className=" text-4xl" />
                        </span>
                        <img
                          src={exampleImage.url}
                          className={classes.exampleImg + ` min-w-[90vw]`}
                          alt="example"
                        />
                      </Box>
                    </Modal>
                  </div>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
export default Example
