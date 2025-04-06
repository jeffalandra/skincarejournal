import React, { useState } from 'react';

const SkinCareApp = () => {
  const [activeTab, setActiveTab] = useState('morning');
  const [completedSteps, setCompletedSteps] = useState({
    morning: [],
    evening: []
  });
  const [showTips, setShowTips] = useState(false);
  const [notes, setNotes] = useState('');
  const [skinPhotos, setSkinPhotos] = useState([]);
  const [photoNote, setPhotoNote] = useState('');
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [routineCalendar, setRoutineCalendar] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const routines = {
    morning: [
      {
        id: 'am-cleanse',
        step: 1,
        title: 'CLEANSE',
        product: 'Skin1004 Centella Cleansing Foam',
        description: 'Gentle and soothing morning refresh',
        icon: '💧'
      },
      {
        id: 'am-tone',
        step: 2,
        title: 'TONE',
        product: 'Skin1004 Centella Toner',
        description: 'Calms, hydrates, and preps the skin',
        icon: '💦'
      },
      {
        id: 'am-soothe',
        step: 3,
        title: 'SOOTHE',
        product: 'Skin1004 Centella Soothing Cream',
        description: 'Lightweight, calming moisturizer for sensitive skin',
        icon: '🧴'
      },
      {
        id: 'am-protect',
        step: 4,
        title: 'PROTECT',
        product: 'Skin Aqua UV Moisture Gel (Green Cap)',
        description: 'Great for normal to oily skin types',
        icon: '☀️',
        note: 'Skintific Mist is only for sunscreen reapplication over makeup, not as your main sunscreen!'
      }
    ],
    evening: [
      {
        id: 'pm-first-cleanse',
        step: 1,
        title: 'FIRST CLEANSE',
        product: 'COSRX Low pH Niacinamide Micellar Cleansing Water',
        description: 'Especially useful after using sunscreen or makeup',
        icon: '🧴',
        note: 'Optional but great for thorough cleansing'
      },
      {
        id: 'pm-second-cleanse',
        step: 2,
        title: 'SECOND CLEANSE',
        product: 'COSRX Salicylic Acid Cleanser (3-4× weekly)',
        description: 'Use only if skin isn\'t feeling dry or irritated',
        icon: '🧼',
        alternativeProduct: 'Skin1004 Centella Foam Cleanser',
        alternativeDescription: 'Gentler alternative for everyday use'
      },
      {
        id: 'pm-tone',
        step: 3,
        title: 'TONE',
        product: 'Skin1004 Centella Toner',
        description: 'Rebalances and soothes after cleansing',
        icon: '💦'
      },
      {
        id: 'pm-treat',
        step: 4,
        title: 'TREAT',
        product: 'COSRX Niacinamide 15% Serum',
        description: 'Use on areas that tolerate it well (thin layer only)',
        icon: '✨',
        note: 'Use only 2-3 times per week'
      },
      {
        id: 'pm-soothe',
        step: 5,
        title: 'SOOTHE',
        product: 'Skin1004 Centella Soothing Cream',
        description: 'Calms and restores skin barrier overnight',
        icon: '🧴'
      }
    ]
  };

  const ingredients = [
    {
      name: 'Centella Asiatica',
      products: 'Skin1004 products',
      benefits: 'Calming, anti-inflammatory, supports healing',
      icon: '🌿'
    },
    {
      name: 'Salicylic Acid',
      products: 'COSRX cleanser',
      benefits: 'Exfoliates inside pores, helps prevent breakouts',
      icon: '🧪'
    },
    {
      name: 'Niacinamide',
      products: 'COSRX products',
      benefits: 'Brightens, strengthens skin barrier, regulates oil',
      icon: '✨'
    }
  ];

  const skincareTips = [
    'Always apply products from thinnest to thickest consistency',
    'Wait 1-2 minutes between layers for better absorption',
    'Sunscreen is non-negotiable, even on cloudy days',
    'Listen to your skin - skip actives if skin feels sensitive',
    'Store your Vitamin C serum in the refrigerator to maintain potency',
    'Replace cleansing products every 6-12 months'
  ];

  const toggleStepCompletion = (stepId) => {
    setCompletedSteps(prevState => {
      const currentRoutine = activeTab;
      const updatedSteps = {...prevState};
      
      if (updatedSteps[currentRoutine].includes(stepId)) {
        updatedSteps[currentRoutine] = updatedSteps[currentRoutine].filter(id => id !== stepId);
      } else {
        updatedSteps[currentRoutine] = [...updatedSteps[currentRoutine], stepId];
      }
      
      return updatedSteps;
    });
  };

  const resetRoutine = () => {
    setCompletedSteps({
      ...completedSteps,
      [activeTab]: []
    });
  };
  
  const getCompletionPercentage = () => {
    const totalSteps = routines[activeTab].length;
    const completedCount = completedSteps[activeTab].length;
    return Math.round((completedCount / totalSteps) * 100);
  };
  
  const recordRoutineCompletion = () => {
    const today = new Date();
    const dateKey = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    setRoutineCalendar(prev => {
      const updatedCalendar = {...prev};
      
      if (!updatedCalendar[dateKey]) {
        updatedCalendar[dateKey] = { morning: false, evening: false };
      }
      
      updatedCalendar[dateKey][activeTab] = true;
      return updatedCalendar;
    });
    
    // Reset the routine steps after recording completion
    resetRoutine();
  };
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const getPreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };
  
  const getNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  
  const handlePhotoNoteChange = (e) => {
    setPhotoNote(e.target.value);
  };
  
  const addNewPhoto = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    const newPhoto = {
      id: `photo-${Date.now()}`,
      date: formattedDate,
      note: photoNote,
      timestamp: today.getTime()
    };
    
    setSkinPhotos([newPhoto, ...skinPhotos]);
    setPhotoNote('');
    setShowAddPhoto(false);
  };
  
  const deletePhoto = (photoId) => {
    setSkinPhotos(skinPhotos.filter(photo => photo.id !== photoId));
  };

  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      {/* Header */}
      <header className="bg-white py-8 px-6 shadow-sm">
        <h1 className="text-3xl font-light text-center mb-2 text-rose-400">My Skincare Ritual</h1>
        <p className="text-center text-gray-400 italic text-sm">Simple, effective care for radiant skin</p>
      </header>
      
      {/* Navigation Tabs */}
      <div className="flex justify-center mt-6 px-4">
        <div className="inline-flex rounded-full bg-white shadow-sm p-1">
          <button 
            className={`py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
              activeTab === 'morning' 
                ? 'bg-rose-100 text-rose-600' 
                : 'text-gray-500 hover:text-rose-400'
            }`}
            onClick={() => setActiveTab('morning')}
          >
            <span role="img" aria-label="Morning">☀️</span> Morning
          </button>
          <button 
            className={`py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
              activeTab === 'evening' 
                ? 'bg-rose-100 text-rose-600' 
                : 'text-gray-500 hover:text-rose-400'
            }`}
            onClick={() => setActiveTab('evening')}
          >
            <span role="img" aria-label="Evening">🌙</span> Evening
          </button>
          <button 
            className={`py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
              activeTab === 'calendar' 
                ? 'bg-rose-100 text-rose-600' 
                : 'text-gray-500 hover:text-rose-400'
            }`}
            onClick={() => setActiveTab('calendar')}
          >
            <span role="img" aria-label="Calendar">📅</span> Calendar
          </button>
          <button 
            className={`py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
              activeTab === 'progress' 
                ? 'bg-rose-100 text-rose-600' 
                : 'text-gray-500 hover:text-rose-400'
            }`}
            onClick={() => setActiveTab('progress')}
          >
            <span role="img" aria-label="Progress">📷</span> Progress
          </button>
          <button 
            className={`py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
              activeTab === 'ingredients' 
                ? 'bg-rose-100 text-rose-600' 
                : 'text-gray-500 hover:text-rose-400'
            }`}
            onClick={() => setActiveTab('ingredients')}
          >
            <span role="img" aria-label="Info">ℹ️</span> Info
          </button>
          <button 
            className={`py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
              activeTab === 'notes' 
                ? 'bg-rose-100 text-rose-600' 
                : 'text-gray-500 hover:text-rose-400'
            }`}
            onClick={() => setActiveTab('notes')}
          >
            <span role="img" aria-label="Notes">📝</span> Notes
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow p-4 md:p-6 max-w-2xl mx-auto w-full">
        {/* Morning and Evening Routines */}
        {(activeTab === 'morning' || activeTab === 'evening') && (
          <div className="mt-6">
            {/* Progress Bar */}
            <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <div className="flex items-center">
                  <span className="text-sm text-rose-400 font-medium">{getCompletionPercentage()}%</span>
                  <button 
                    onClick={resetRoutine}
                    className="ml-4 text-xs text-gray-400 hover:text-gray-600"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div 
                  className="bg-rose-300 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
              
              {getCompletionPercentage() === 100 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={recordRoutineCompletion}
                    className="px-4 py-2 bg-rose-400 text-white rounded-full text-sm transition-all hover:bg-rose-500"
                  >
                    Mark Today Complete
                  </button>
                </div>
              )}
            </div>
            
            {/* Routine Steps */}
            <div className="space-y-4">
              {routines[activeTab].map((step) => (
                <div 
                  key={step.id} 
                  className={`rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                    completedSteps[activeTab].includes(step.id) 
                      ? 'bg-white border border-rose-200' 
                      : 'bg-white'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                          completedSteps[activeTab].includes(step.id)
                            ? 'bg-rose-100 text-rose-600'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {step.step}
                        </div>
                        <h3 className="ml-3 text-lg font-light text-gray-800">
                          {step.title}
                        </h3>
                      </div>
                      <div>
                        <input 
                          type="checkbox" 
                          id={step.id}
                          checked={completedSteps[activeTab].includes(step.id)}
                          onChange={() => toggleStepCompletion(step.id)}
                          className="h-5 w-5 rounded-full text-rose-400 focus:ring-rose-300 border-gray-300"
                        />
                      </div>
                    </div>
                    
                    <div className="ml-11">
                      <div className="text-gray-800 font-medium">{step.product}</div>
                      <div className="text-gray-500 text-sm mt-1">{step.description}</div>
                      
                      {step.alternativeProduct && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="text-xs text-gray-500 mb-1">ALTERNATIVE</div>
                          <div className="text-gray-800 font-medium">{step.alternativeProduct}</div>
                          <div className="text-gray-500 text-sm mt-1">{step.alternativeDescription}</div>
                        </div>
                      )}
                      
                      {step.note && (
                        <div className="mt-3 bg-rose-50 border-l-2 border-rose-300 p-3 text-sm text-gray-600">
                          {step.note}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Toggle */}
            <div className="mt-8 text-center">
              <button 
                onClick={() => setShowTips(!showTips)}
                className="inline-flex items-center text-sm text-rose-400 hover:text-rose-500"
              >
                {showTips ? 'Hide Tips' : 'Skincare Tips'} 
                <span className="ml-1">{showTips ? '▲' : '▼'}</span>
              </button>
              
              {showTips && (
                <div className="mt-4 p-6 bg-white rounded-2xl shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-4 text-center">Daily Reminders</h3>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    {skincareTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-rose-300 mr-2">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Ingredients Tab */}
        {activeTab === 'ingredients' && (
          <div className="mt-6">
            <h2 className="text-xl font-light text-gray-800 text-center mb-6">Key Ingredients</h2>
            
            <div className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3" role="img" aria-label={ingredient.name}>{ingredient.icon}</div>
                    <h3 className="font-medium text-gray-800">{ingredient.name}</h3>
                  </div>
                  <div className="text-sm text-rose-400 mb-2">Found in: {ingredient.products}</div>
                  <div className="text-gray-600">{ingredient.benefits}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm mt-6">
              <h3 className="font-medium text-gray-800 mb-3 text-center">Routine Philosophy</h3>
              <p className="text-gray-600 text-center">
                Simple, consistent care with gentle yet effective products focused on calming and protecting sensitive, acne-prone skin.
              </p>
            </div>
          </div>
        )}
        
        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="mt-6">
            <h2 className="text-xl font-light text-gray-800 text-center mb-6">Skincare Calendar</h2>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={getPreviousMonth}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &lt;
                </button>
                <h3 className="text-lg font-medium text-gray-800">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button 
                  onClick={getNextMonth}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &gt;
                </button>
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {(() => {
                  const year = currentMonth.getFullYear();
                  const month = currentMonth.getMonth();
                  const daysInMonth = getDaysInMonth(year, month);
                  const firstDay = getFirstDayOfMonth(year, month);
                  
                  // Create blank cells for days before the first day of the month
                  const blanks = Array(firstDay).fill(null).map((_, index) => (
                    <div key={`blank-${index}`} className="h-12"></div>
                  ));
                  
                  // Create cells for each day of the month
                  const days = Array(daysInMonth).fill(null).map((_, index) => {
                    const day = index + 1;
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const dayData = routineCalendar[dateStr] || { morning: false, evening: false };
                    
                    // Determine if this is today
                    const today = new Date();
                    const isToday = today.getDate() === day && 
                                    today.getMonth() === month && 
                                    today.getFullYear() === year;
                    
                    return (
                      <div 
                        key={`day-${day}`} 
                        className={`h-12 rounded relative ${isToday ? 'bg-rose-50' : ''}`}
                      >
                        <div className="absolute top-1 left-1 text-xs text-gray-500">{day}</div>
                        <div className="flex items-center justify-center h-full">
                          <div className="flex flex-col items-center">
                            {dayData.morning && (
                              <div className="h-2 w-2 rounded-full bg-yellow-400 mb-1" title="Morning routine completed"></div>
                            )}
                            {dayData.evening && (
                              <div className="h-2 w-2 rounded-full bg-indigo-400" title="Evening routine completed"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  });
                  
                  return [...blanks, ...days];
                })()}
              </div>
              
              {/* Legend */}
              <div className="mt-6 border-t border-gray-100 pt-4 flex justify-center space-x-6">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                  <span className="text-xs text-gray-600">Morning</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-indigo-400 mr-2"></div>
                  <span className="text-xs text-gray-600">Evening</span>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                <div className="text-3xl font-light text-rose-400 mb-1">
                  {Object.values(routineCalendar).filter(day => day.morning).length}
                </div>
                <div className="text-sm text-gray-500">Morning Routines</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                <div className="text-3xl font-light text-rose-400 mb-1">
                  {Object.values(routineCalendar).filter(day => day.evening).length}
                </div>
                <div className="text-sm text-gray-500">Evening Routines</div>
              </div>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm text-center">
              <div className="text-sm text-gray-600 mb-1">Current Streak</div>
              <div className="text-2xl font-light text-rose-400">
                {(() => {
                  let streak = 0;
                  const today = new Date();
                  
                  for (let i = 0; i < 100; i++) { // Check up to 100 days back
                    const checkDate = new Date(today);
                    checkDate.setDate(today.getDate() - i);
                    
                    const dateStr = checkDate.toISOString().split('T')[0];
                    const dayData = routineCalendar[dateStr];
                    
                    if (dayData && (dayData.morning || dayData.evening)) {
                      streak++;
                    } else if (i > 0) { // Skip today if not completed
                      break;
                    }
                  }
                  
                  return `${streak} days`;
                })()}
              </div>
            </div>
          </div>
        )}
        
        {/* Progress Photo Tab */}
        {activeTab === 'progress' && (
          <div className="mt-6">
            <h2 className="text-xl font-light text-gray-800 text-center mb-6">Skin Progress Journal</h2>
            
            {/* Add Photo Button */}
            <div className="text-center mb-6">
              <button
                onClick={() => setShowAddPhoto(true)}
                className="inline-flex items-center justify-center px-4 py-2 bg-rose-400 text-white rounded-full text-sm transition-all hover:bg-rose-500"
              >
                <span className="mr-1">+</span> Add Today's Photo
              </button>
            </div>
            
            {/* Add Photo Form */}
            {showAddPhoto && (
              <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
                <h3 className="text-lg font-light text-gray-800 mb-4">Add New Progress Photo</h3>
                
                <div className="mb-4">
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-64 flex items-center justify-center mb-4">
                    <div className="text-center p-4">
                      <div className="text-3xl text-gray-400 mb-2" role="img" aria-label="Camera">📷</div>
                      <div className="text-gray-500 text-sm mb-4">Tap to add a photo of your skin</div>
                      <button className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm">
                        Choose Photo
                      </button>
                    </div>
                  </div>
                  
                  <textarea
                    value={photoNote}
                    onChange={handlePhotoNoteChange}
                    placeholder="Note any observations about your skin today..."
                    className="w-full h-24 p-4 border border-gray-200 rounded-xl focus:ring-rose-300 focus:border-rose-300 text-gray-700"
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAddPhoto(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addNewPhoto}
                    className="px-4 py-2 bg-rose-400 text-white rounded-full text-sm"
                  >
                    Save Photo
                  </button>
                </div>
              </div>
            )}
            
            {/* Photo Timeline */}
            <div className="space-y-6">
              {skinPhotos.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                  <div className="text-4xl mb-4" role="img" aria-label="Camera">📱</div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No Photos Yet</h3>
                  <p className="text-gray-500 text-sm">
                    Take daily photos to track your skin's transformation over time.
                  </p>
                </div>
              ) : (
                skinPhotos.map((photo) => (
                  <div key={photo.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <div className="font-medium text-gray-800">{photo.date}</div>
                      <button
                        onClick={() => deletePhoto(photo.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                      <img src="/api/placeholder/400/320" alt="Skin progress" className="object-cover w-full h-full" />
                    </div>
                    
                    {photo.note && (
                      <div className="p-4 bg-gray-50 text-gray-600 text-sm">
                        {photo.note}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
            {skinPhotos.length > 0 && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center text-sm text-gray-500">
                  <span className="mr-2" role="img" aria-label="Sparkles">💫</span> Keep tracking your progress for best results
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="mt-6">
            <h2 className="text-xl font-light text-gray-800 text-center mb-6">My Skincare Journal</h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <textarea 
                value={notes}
                onChange={handleNotesChange}
                placeholder="Track your skin's progress, product reactions, or reminders here..."
                className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:ring-rose-300 focus:border-rose-300 text-gray-700"
              ></textarea>
              <div className="mt-3 text-xs text-gray-400 text-center">
                Your notes are saved locally
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 text-xs">
        Updated: April 2025 • Consistency is key
      </footer>
    </div>
  );
};

export default SkinCareApp; 