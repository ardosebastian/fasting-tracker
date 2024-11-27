import React, { useState, useEffect } from 'react';

function App() {
const [startTime, setStartTime] = useState(null);
const [endTime, setEndTime] = useState(null);
const [isRunning, setIsRunning] = useState(false);
const [elapsedTime, setElapsedTime] = useState(0);

useEffect(() => {
  let intervalId;
  if (isRunning) {
    intervalId = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = now - startTime;
      setElapsedTime(elapsed);
    }, 1000);
  }
  return () => clearInterval(intervalId);
}, [isRunning, startTime]);

const startFasting = () => {
  const now = new Date().getTime();
  setStartTime(now);
  setIsRunning(true);
  setEndTime(null);
};

const stopFasting = () => {
  const now = new Date().getTime();
  setEndTime(now);
  setIsRunning(false);
};

const formatTime = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

return (
  <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <h1 className="text-3xl font-bold text-center mb-8">Fasting Tracker</h1>
              <div className="text-center text-4xl font-mono mb-8">
                {isRunning ? formatTime(elapsedTime) : '00:00:00'}
              </div>
              <div className="flex justify-center space-x-4">
                {!isRunning ? (
                  <button
                    onClick={startFasting}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                  >
                    Start Fasting
                  </button>
                ) : (
                  <button
                    onClick={stopFasting}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                  >
                    Stop Fasting
                  </button>
                )}
              </div>
              {endTime && (
                <div className="text-center mt-4">
                  <p>Total Fasting Time:</p>
                  <p className="font-bold">{formatTime(endTime - startTime)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default App;
