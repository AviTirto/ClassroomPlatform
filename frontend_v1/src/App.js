import { useState } from 'react'
import './App.css';
import FlashcardList from './FlashcardList' 
import Navbar from './Navbar';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE)
  return (
    <>
      <Navbar/>
      <div className='container'>
        <FlashcardList flashcards = {flashcards}/>
      </div>
    </>
   
  );
}

const SAMPLE = [
  {
      "id": 1,
      "question": "What is statistical inference?",
      "options": [
          "A) The process of collecting sample data from a known population.",
          "B) The practice of making informed guesses about population parameters from sample data.",
          "C) The analysis of the entire population to find true parameter values.",
          "D) The calculation of sample statistics from a given dataset."
      ],
      "answer": "B",
      "explanation": "Statistical inference involves making informed guesses about population parameters based on the analysis of sample data, not just collecting or analyzing data from a known population."
  },
  {
      "id": 2,
      "question": "What is a point estimate?",
      "options": [
          "A) A range of plausible values for the population parameter.",
          "B) The value of an estimator derived from a sample of data.",
          "C) The true value of a population parameter.",
          "D) The overall success rate of the method for calculating a confidence interval."
      ],
      "answer": "B",
      "explanation": "A point estimate is a single value estimate of a population parameter derived from sample data, representing our best guess."
  },
  {
      "id": 3,
      "question": "What does a confidence interval represent?",
      "options": [
          "A) The exact value of a population parameter.",
          "B) The overall success rate of a statistical method.",
          "C) A range of plausible values for the population parameter based on sample data.",
          "D) The distance between the sample mean and the population mean."
      ],
      "answer": "C",
      "explanation": "A confidence interval provides a range of plausible values within which the true population parameter is expected to fall, based on the observed sample data."
  },
  {
      "id": 4,
      "question": "How is the confidence level of a confidence interval expressed?",
      "options": [
          "A) C% = 100(1 - α)%",
          "B) C% = α%",
          "C) C% = 100%",
          "D) C% = (1 - α)%"
      ],
      "answer": "A",
      "explanation": "The confidence level is expressed as C% = 100(1 - α)%, where α is the significance level, indicating the proportion of intervals that will capture the true parameter in repeated samples."
  },
  {
      "id": 5,
      "question": "What does the margin of error represent in a confidence interval?",
      "options": [
          "A) The point estimate from a sample.",
          "B) The distance between the point estimate and the true population parameter.",
          "C) The distance between the point estimate and the upper and lower bounds of the interval.",
          "D) The width of the sample data range."
      ],
      "answer": "C",
      "explanation": "The margin of error is the distance from the point estimate to the upper and lower bounds of the confidence interval, representing the potential error in estimating the population parameter."
  },
  {
      "id": 6,
      "question": "Which of the following best describes the relationship between the confidence level and the success rate of capturing the true parameter value?",
      "options": [
          "A) A confidence level of 95% means 95% of the time the sample mean is the true population mean.",
          "B) A confidence level of 95% means 95% of the confidence intervals constructed will contain the true population parameter.",
          "C) A confidence level of 95% means the margin of error is 95%.",
          "D) A confidence level of 95% means 95% of the population falls within the interval."
      ],
      "answer": "B",
      "explanation": "A 95% confidence level indicates that 95% of the confidence intervals constructed from repeated samples will contain the true population parameter."
  },
  {
      "id": 7,
      "question": "In the context of statistical inference, what does a hypothesis test evaluate?",
      "options": [
          "A) Whether the sample data supports or contradicts a claim about a population parameter.",
          "B) The exact value of a population parameter.",
          "C) The overall distribution of the population.",
          "D) The difference between two population means."
      ],
      "answer": "A",
      "explanation": "A hypothesis test evaluates whether the sample data supports or contradicts a specific claim or hypothesis about a population parameter."
  },
  {
      "id": 8,
      "question": "Which of the following statements is true about point estimates?",
      "options": [
          "A) They are always equal to the population parameter of interest.",
          "B) They are a single best guess for the unknown population parameter.",
          "C) They provide a range of plausible values for the population parameter.",
          "D) They have no relationship with sample data."
      ],
      "answer": "B",
      "explanation": "Point estimates are single best guesses derived from sample data for unknown population parameters, though they are not always exactly equal to the true parameter values."
  },
  {
      "id": 9,
      "question": "When constructing a 95% confidence interval, what does the 95% represent?",
      "options": [
          "A) 95% of the population falls within this interval.",
          "B) There is a 95% chance the population parameter lies within this interval.",
          "C) The method used will produce intervals that capture the true parameter 95% of the time.",
          "D) The sample mean is within 95% of the population mean."
      ],
      "answer": "C",
      "explanation": "A 95% confidence level means that the method used to construct the interval will capture the true population parameter in 95% of repeated samples."
  },
  {
      "id": 10,
      "question": "Which of the following is NOT a component of the margin of error in a confidence interval?",
      "options": [
          "A) Point estimate",
          "B) Population parameter",
          "C) Distance between point estimate and interval bounds",
          "D) Sample size"
      ],
      "answer": "B",
      "explanation": "The margin of error is calculated using the point estimate, sample size, and variability, but not the actual population parameter, which is unknown."
  }
]


export default App;
