import React, { createContext, useState, useEffect } from 'react';

export const SkinCareContext = createContext();

export const SkinCareProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('morning');
  const [completedSteps, setCompletedSteps] = useState({
    morning: [],
    evening: []
  });
  const [notes, setNotes] = useState('');
  const [skinPhotos, setSkinPhotos] = useState([]);
  const [routineCalendar, setRoutineCalendar] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('skincareData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setCompletedSteps(parsedData.completedSteps || { morning: [], evening: [] });
      setNotes(parsedData.notes || '');
      setSkinPhotos(parsedData.skinPhotos || []);
      setRoutineCalendar(parsedData.routineCalendar || {});
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      completedSteps,
      notes,
      skinPhotos,
      routineCalendar
    };
    localStorage.setItem('skincareData', JSON.stringify(dataToSave));
  }, [completedSteps, notes, skinPhotos, routineCalendar]);

  const value = {
    activeTab,
    setActiveTab,
    completedSteps,
    setCompletedSteps,
    notes,
    setNotes,
    skinPhotos,
    setSkinPhotos,
    routineCalendar,
    setRoutineCalendar,
    currentMonth,
    setCurrentMonth
  };

  return (
    <SkinCareContext.Provider value={value}>
      {children}
    </SkinCareContext.Provider>
  );
};