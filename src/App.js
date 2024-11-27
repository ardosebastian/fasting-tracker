import React, { useState, useEffect } from 'react';

function App() {

const DAYS_IN_WEEK = 7;
const MAX_WEEKS = 3;

// Reusable Components
const StatBox = ({ label, value, emoji }) => (
  <div className="bg-gray-50 p-2 rounded text-center">
    <div className="text-sm text-gray-600">{emoji} {label}</div>
    <div className="font-bold text-lg">{value}</div>
  </div>
);

const DayButton = ({ day, status, onClick }) => {
  const statusClasses = {
    completed: 'bg-green-500 text-white border-green-600',
    frosty: 'bg-blue-500 text-white border-blue-600',
    noshow: 'bg-red-500 text-white border-red-600',
    incomplete: 'bg-gray-100 border-gray-300 hover:bg-gray-200'
  };

  return (
    <button
      onClick={onClick}
      className={`aspect-square rounded-lg flex items-center justify-center border-2 ${statusClasses[status]}`}
    >
      {day}
    </button>
  );
};

const WeekSelector = ({ currentWeek, onChange }) => (
  <div className="flex items-center space-x-2 bg-white rounded-lg shadow p-1">
    <button 
      onClick={() => onChange(Math.max(1, currentWeek - 1))}
      className="p-2 hover:bg-gray-100 rounded-lg"
      disabled={currentWeek === 1}
    >
      ←
    </button>
    <div className="px-4 py-2 font-medium">Week {currentWeek}</div>
    <button 
      onClick={() => onChange(Math.min(MAX_WEEKS, currentWeek + 1))}
      className="p-2 hover:bg-gray-100 rounded-lg"
      disabled={currentWeek === MAX_WEEKS}
    >
      →
    </button>
  </div>
);

function App() {
  const [currentWeek, setCurrentWeek] = React.useState(1);
  const [participants, setParticipants] = React.useState([
    {
      id: 1,
      name: "Ahmad",
      stats: { target: 0, flame: 0, sweat: 0, soul: 0, frosty: 2 },
      streaks: {},
      frostyDays: {},
      noShowDays: {}
    },
    {
      id: 2,
      name: "Budi",
      stats: { target: 0, flame: 0, sweat: 0, soul: 0, frosty: 3 },
      streaks: {},
      frostyDays: {},
      noShowDays: {}
    }
  ]);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [selectedParticipant, setSelectedParticipant] = React.useState(null);
  const [showExportModal, setShowExportModal] = React.useState(false);

  // Rest of your component logic here...

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">IF Challenge Tracker</h1>
        <WeekSelector currentWeek={currentWeek} onChange={setCurrentWeek} />
      </div>

      <div className="space-y-6">
        {participants.map((participant) => (
          <div key={participant.id} className="bg-white p-4 rounded-lg shadow">
            <div className="md:flex md:justify-between md:items-center mb-4">
              <h2 className="text-lg font-semibold">{participant.name}</h2>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(participant.stats).map(([key, value]) => (
                  <StatBox
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    emoji={
                      key === 'target' ? '🎯' :
                      key === 'flame' ? '🔥' :
                      key === 'sweat' ? '💦' :
                      key === 'soul' ? '🌱' : '❄️'
                    }
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: DAYS_IN_WEEK }, (_, i) => i + 1).map((day) => (
                <DayButton
                  key={day}
                  day={day}
                  status={getDayStatus(participant, day)}
                  onClick={() => handleDayClick(participant.id, day)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default App;
