"use client";

import React, { useState } from 'react';

const NotesFetcher = () => {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [noteUrl, setNoteUrl] = useState('');

  const FOLDER_ID = 'Folder_ID';

  const handleBranchChange = (e) => setBranch(e.target.value);
  const handleSemesterChange = (e) => setSemester(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);

  const fetchNotesUrl = async () => {
    try {
      const response = await fetch(`/api/googleDrive?folderId=${FOLDER_ID}&branch=${branch}&semester=${semester}&subject=${subject}`);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Failed to fetch notes: ${errorData.error}`);
        return;
      }
      const data = await response.json();
      if (data.length > 0) {
        setNoteUrl(data[0].webViewLink);
      } else {
        alert('No notes found.');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      alert('Failed to fetch notes.');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <div className="w-1/4 p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg m-6">
        <h2 className="text-xl font-bold mb-4 text-white">Select Notes</h2>
        <div className="mb-4">
          <label className="block mb-2 text-white">Branch:</label>
          <select className="w-full p-2 border rounded-md text-black bg-white bg-opacity-70" value={branch} onChange={handleBranchChange}>
            <option value="">Select Branch</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Semester:</label>
          <select className="w-full p-2 border rounded-md text-black bg-white bg-opacity-70" value={semester} onChange={handleSemesterChange}>
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Subject:</label>
          <select className="w-full p-2 border rounded-md text-black bg-white bg-opacity-70" value={subject} onChange={handleSubjectChange}>
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
          </select>
        </div>
        <button className="w-full p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300" onClick={fetchNotesUrl}>
          Fetch Notes
        </button>
      </div>
      <div className="w-3/4 p-4 flex items-center justify-center">
        {noteUrl ? (
          <iframe src={noteUrl} className="w-full h-full rounded-lg shadow-lg transition-opacity duration-500 ease-in-out opacity-100" title="Notes" frameBorder="0"></iframe>
        ) : (
          <p className="text-center text-white text-2xl">Select options to view notes</p>
        )}
      </div>
    </div>
  );
};

export default NotesFetcher;
