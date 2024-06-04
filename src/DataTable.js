import { useMemo, useState, useEffect } from "react";
import axios from "axios";

export default function DataTable() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const [username, setUsername] = useState("");
  const [minRepos, setMinRepos] = useState(0);

  const filteredLanguages = useMemo(
    () => filterLanguages(stats.languages, minRepos),
    [stats, minRepos]
  );

  async function fetchStats() {
    setLoading(true);
    setStats({});
    const res = await axios.get(`http://localhost:5001/users/${username}`);
    setStats(res.data);
    setLoading(false);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleMinReposChange(e) {
    setMinRepos(e.target.value);
  }

  function filterLanguages(langs, minRepos) {
    console.log("filtering");
    if (!langs || Object.keys(langs).length === 0) {
      return {};
    }

    let newLangs = {};
    for (const key of Object.keys(langs)) {
      if (langs[key] >= minRepos) {
        newLangs[key] = langs[key];
      }
    }
    console.log(newLangs);
    return newLangs;
  }

  return (
    <>
      <div className="m-auto flex flex-row justify-center">
        <input
          type="text"
          onChange={handleUsernameChange}
          value={username}
          className="border h-16 w-4/12 mr-4 p-4 rounded-md"
        />
        <button
          onClick={fetchStats}
          className="border h-16 w-2/12 p-2 rounded-md bg-indigo-500 hover:bg-indigo-600 font-bold text-white"
        >
          Get Stats
        </button>
      </div>
      {Object.keys(stats).length !== 0 && (
        <>
          <table className="w-full mt-12">
            <tbody>
              <tr className="hover:bg-slate-50">
                <th className="text-left p-4">Total Repositories</th>
                <td>{stats.public_repos}</td>
              </tr>
              <tr className="border-t hover:bg-slate-50">
                <th className="text-left p-4">Total Forks</th>
                <td className="w-2/12">{stats.fork_count}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="text-center font-bold text-xl mt-12">Top Languages</h2>
          <div className="flex flex-col">
            <label htmlFor="minRepos" className="text-sm text-slate-500">
              Min Repos
            </label>
            <input
              id="minRepos"
              type="text"
              onChange={handleMinReposChange}
              value={minRepos}
              className="border w-2/12 mt-1 p-2 rounded-md"
            />
          </div>
          <table className="w-full mt-6">
            <tbody>
              {Object.keys(filteredLanguages).map((lang) => (
                <tr className="border-t hover:bg-slate-50" key={lang}>
                  <th className="p-4 text-left">{lang}</th>
                  <td className="w-2/12">{filteredLanguages[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {loading && <p className="text-center m-auto mt-12">Loading...</p>}
    </>
  );
}
