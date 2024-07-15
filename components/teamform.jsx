'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const TeamList = ({teams}) => {
    return (
      <div>
        <div className="grid grid-cols-3 gap-4">
          {teams.map((team, index) => (
            <div
              key={index}
              className="rounded bg-orange-500 p-4 text-white shadow-md"
            >
              <h3>{team.name}</h3>
              <p>Members: {team.members}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

const TeamForm = ({error, teamName,loading, teamMembers, setTeamName, setTeamMembers, Add, teams, route }) => {

const router = useRouter()
 

  return (
    <>
    <div className="mx-auto max-w-md rounded bg-white p-4 shadow-md mb-10"> 
        <form >
          <h2 className="mb-4 flex items-center justify-center text-3xl font-bold text-emerald-600">
            Add Teams
          </h2>
          <label className="mb-4 block">
            <span className="text-gray-700">Team Name</span>
            <input
              type="text"
              className="block w-full border border-gray-300 p-2 pl-10 text-sm text-gray-700"
              value={teamName}
              onChange={(e)=>setTeamName(e.target.value)}
              placeholder="Enter team name"
            />
          </label>
          <label className="mb-4 block">
            <span className="text-gray-700">
              Team Members (comma separated)
            </span>
            <input
              type="text"
              value={teamMembers}
              onChange={(e)=>setTeamMembers(e.target.value)}
              className="block w-full border border-gray-300 p-2 pl-10 text-sm text-gray-700"
              
              
              placeholder="Enter team members"
            />
          </label>
          <p className="text-sm text-red text-center">{error && error}</p>
          <button
          disabled={loading}
            onClick={Add}
            className="mb-4 w-full rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700"
          >
            Add Team
          </button>
          <button
            onClick={route}
            className="mb-4 w-full rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700"
          >
            Start Quiz
          </button>
        </form>
    </div>
    <TeamList teams={teams} />
    </>
  );
};



export default TeamForm;