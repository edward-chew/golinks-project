import { useEffect, useState } from "react";
import axios from "axios";

export default function DataTable() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState();
  const [username, setUsername] = useState("");

  async function fetchStats() {
    setStats(null);
    setLoading(true);
    const res = await axios.get(`http://localhost:5001/users/seantomburke`);
    setStats(res.data);
    console.log(res);
    setLoading(false);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  return (
    <>
      <p>seantomburke</p>
      <div className="m-auto flex flex-row justify-center">
        <input
          type="text"
          onChange={handleUsernameChange}
          className="border h-16 w-4/12 mr-4 p-4 rounded-md"
        />
        <button
          onClick={fetchStats}
          className="border h-16 w-2/12 p-2 rounded-md bg-indigo-500 hover:bg-indigo-600 font-bold text-white"
        >
          Get Stats
        </button>
      </div>
      {stats && (
        <>
          <table className="w-full mt-12">
            <tr className="hover:bg-slate-50">
              <th className="text-left p-4">Total Repositories</th>
              <td>{stats.public_repos}</td>
            </tr>
            <tr className="border-t hover:bg-slate-50">
              <th className="text-left p-4">Total Forks</th>
              <td>{stats.fork_count}</td>
            </tr>
          </table>
          <table className="w-full mt-6">
            <tr>
              <th colspan="2" className="text-left p-4 text-center">
                Top Languages
              </th>
            </tr>
            {Object.keys(stats.languages).map((lang) => (
              <tr className="border-t hover:bg-slate-50">
                <th className="p-4 text-left">{lang}</th>
                <td>{stats.languages[lang]}</td>
              </tr>
            ))}
          </table>
        </>
      )}
      {loading && <p clasName="text-center m-auto mt-12">Loading...</p>}
    </>
  );
}
