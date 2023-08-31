import React, { useState,useRef } from 'react';
import { useDispatch } from 'react-redux';
import '../css/categoriesBar.css';
import { Videossearch, getvideo } from '../Redux/VideoSlice';
import { useNavigate } from 'react-router-dom'; 
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const keywords = [
  'All',
  'mongo',
  'Angular js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art',
  'Guitar',
  'Bengali Songs',
  'Coding',
  'Cricket',
  'Football',
  'Real Madrid',
  'Gatsby',
  'Poor Coder',
  'Shwetabh',
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState('All');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const keywordsRef = useRef(null); // Create a ref for the keywords container

  const handleClick = (value) => {
    setActiveElement(value);
    if (value !== 'All') {
      dispatch(Videossearch(value));
    } else {
      dispatch(getvideo());
    }
  };

  const scrollKeywords = (scrollAmount) => {
    if (keywordsRef.current) {
      keywordsRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className='categoriesBar'>
      <IconButton className="scroll-button" onClick={() => scrollKeywords(-100)} >
        <ArrowBackIcon />
      </IconButton>
      <div className="keywords-container" ref={keywordsRef}>
        {keywords.map((value, i) => (
          <code
            onClick={() => handleClick(value)}
            key={i}
            className={activeElement === value ? 'active' : ''}
          >
            {value}
          </code>
        ))}
      </div>
      <IconButton className="scroll-button" onClick={() => scrollKeywords(100)}>
        <ArrowForwardIcon />
      </IconButton>
    </div>
  );
};

export default CategoriesBar;