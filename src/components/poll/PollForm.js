'use client';;
import { IonIcon } from '@ionic/react';
import { addCircleOutline, closeOutline, removeCircleOutline } from 'ionicons/icons';
import { useState } from 'react';

const PollInputForm = ({ togglePollModal }) => {
  const [pollOptions, setPollOptions] = useState(['']);
  const [pollQuestion, setPollQuestion] = useState('');

  const handleAddOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const handleRemoveOption = (index) => {
    setPollOptions(pollOptions.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  return (
    <div className="bg-white dark:bg-dark3 p-6 rounded-lg shadow-lg w-[90%] md:w-1/2 lg:w-1/3 z-10">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold">Create Poll</h2>
        <button onClick={togglePollModal} className="text-xl">
          <IonIcon icon={closeOutline} />
        </button>
      </div>
      <input
        type="text"
        placeholder="What is your poll question?"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={pollQuestion}
        onChange={(e) => setPollQuestion(e.target.value)}
      />
      {pollOptions.map((option, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            className="w-full p-2 border border-gray-300 rounded"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          <button onClick={() => handleRemoveOption(index)} className="text-red-500">
            <IonIcon icon={removeCircleOutline} />
          </button>
        </div>
      ))}
      <button
        onClick={handleAddOption}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-blue-600 bg-blue-100 mb-4"
      >
        <IonIcon icon={addCircleOutline} />
        Add Option
      </button>
      <div className="flex items-center justify-between">
        <button className="text-gray-600">Everyone can vote</button>
        <button
          onClick={() => console.log('Create Poll', pollQuestion, pollOptions)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Poll
        </button>
      </div>
    </div>
  );
};

export default PollInputForm;
