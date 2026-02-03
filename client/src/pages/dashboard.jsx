import { useEffect, useState } from "react";
import {
  fetchDiscoverUsers,
  fetchMatches,
  likeUser,
  unmatchUser,
  userProfile,
} from "../api/api";
import UserCard from "@/components/dashboard/userCard";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch discover users and matches
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [discoverRes, matchesRes] = await Promise.all([
          fetchDiscoverUsers(),
          fetchMatches(),
        ]);

        setUsers(discoverRes?.data?.users || []);
        setMatches(matchesRes?.data?.matches || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setUsers([]);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // user
  const profile = async (userId) => {
    try {
      await userProfile(userId);
    } catch (err) {
      console.error("Error user profile:", err);
    }
  };
  // Like a user
  const handleLike = async (userId) => {
    try {
      await likeUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId)); // remove liked user
    } catch (err) {
      console.error("Error liking user:", err);
    }
  };

  // Unmatch a user
  const handleUnmatch = async (matchId) => {
    try {
      await unmatchUser(matchId);
      setMatches((prev) => prev.filter((m) => m._id !== matchId)); // remove unmatched
    } catch (err) {
      console.error("Error unmatching user:", err);
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Discover</h1>

      <div className="flex justify-center items-center min-h-[300px]">
        <AnimatePresence>
          {users.length === 0 ? (
            <p className="text-muted-foreground ">No users left to discover</p>
          ) : (
            <UserCard
              key={users[0]._id}
              user={users[0]}
              onLike={handleLike}
              onDislike={(userId) =>
                setUsers((prev) => prev.filter((u) => u._id !== userId))
              }
            />
          )}
        </AnimatePresence>
      </div>

      {/* <section>
        <h2 className="text-2xl font-semibold mt-10">Matches</h2>

        {matches.length === 0 ? (
          <p className="text-muted-foreground">No matches yet</p>
        ) : (
          matches.map((match) => (
            <div key={match._id} className="flex justify-between mt-2">
              <span>{match.users.join(", ")}</span>
              <Button
                variant="destructive"
                onClick={() => unmatchUser(match._id)}
              >
                Unmatch
              </Button>
            </div>
          ))
        )}
      </section> */}
    </div>
  );
}
