import React, { useMemo, useState } from "react";
import { teams } from "../team/teamsData";
import "./Match.css";

const GROUPS = "ABCDEFGHIJKL".split("");

function generateGroupMatches(groupTeams, groupIndex) {
  const matches = [];
  let dayOffset = groupIndex * 2 + 1;

  for (let i = 0; i < groupTeams.length; i++) {
    for (let j = i + 1; j < groupTeams.length; j++) {
      matches.push({
        home: groupTeams[i],
        away: groupTeams[j],
        date: `Day ${dayOffset}`,
        time: ["13:00", "16:00", "19:00"][matches.length % 3],
        status: "UPCOMING",
      });
    }
  }

  return matches;
}

export default function Match() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("ALL");

  const grouped = useMemo(() => {
    const map = {};
    teams.forEach((t) => {
      if (!map[t.group]) map[t.group] = [];
      map[t.group].push(t);
    });
    return map;
  }, []);

  const allMatches = useMemo(() => {
    let matches = [];

    Object.keys(grouped).forEach((groupKey, idx) => {
      matches = [
        ...matches,
        ...generateGroupMatches(grouped[groupKey], idx),
      ];
    });

    return matches;
  }, [grouped]);

  const filtered = allMatches.filter((m) => {
    const text =
      m.home.name.toLowerCase() + " " + m.away.name.toLowerCase();

    const searchMatch = text.includes(search.toLowerCase());

    const groupMatch =
      activeGroup === "ALL" ||
      m.home.group === activeGroup ||
      m.away.group === activeGroup;

    return searchMatch && groupMatch;
  });

  return (
    <div className="app">
      <div className="hero">
        <h1>⚽ MATCH CENTER</h1>
        <p>Groups • Fixtures • Football Tournament</p>
      </div>

      <div className="controls">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search team..."
        />

        <div className="groups">
          <button onClick={() => setActiveGroup("ALL")}>ALL</button>
          {GROUPS.map((g) => (
            <button key={g} onClick={() => setActiveGroup(g)}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="matches-grid">
        {filtered.map((m, idx) => (
          <div className="match-card" key={idx}>
            <div className="match-header">
              <span>{m.date}</span>
              <span className="status">{m.status}</span>
            </div>

            <div className="teams">
              <div className="team">
                <img src={m.home.flag_url} alt={m.home.name} />
                <span>{m.home.name}</span>
              </div>

              <div className="vs">VS</div>

              <div className="team">
                <img src={m.away.flag_url} alt={m.away.name} />
                <span>{m.away.name}</span>
              </div>
            </div>

            <div className="time">{m.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

