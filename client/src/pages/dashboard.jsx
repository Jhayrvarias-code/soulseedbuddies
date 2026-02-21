import { AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDiscoverUsers, fetchMatches, likeUser, unmatchUser } from "../api/api";
import UserCard from "@/components/dashboard/userCard";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const queryClient = useQueryClient();

  // 🔹 Fetch discover users
  const {
    data: discoverData = [],
    isLoading: discoverLoading,
    isError: discoverError,
  } = useQuery({
    queryKey: ["discover"],
    queryFn: async () => {
      const res = await fetchDiscoverUsers();
      return res.data.users;
    },
  });

  // 🔹 Fetch matches
  const {
    data: matchesData = [],
    isLoading: matchesLoading,
    isError: matchesError,
  } = useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      const res = await fetchMatches();
      return res.data.matches;
    },
  });

  // 🔹 Like mutation with optimistic update
  const likeMutation = useMutation({
    mutationFn: (userId) => likeUser(userId),

    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ["discover"] });
      const previousUsers = queryClient.getQueryData(["discover"]);

      queryClient.setQueryData(["discover"], (old = []) =>
        old.filter((u) => u._id !== userId)
      );

      return { previousUsers };
    },

    onError: (err, userId, context) => {
      alert("Could not like user. Try again.");
      queryClient.setQueryData(["discover"], context.previousUsers);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });

  // 🔹 Unmatch mutation
  const unmatchMutation = useMutation({
    mutationFn: (matchId) => unmatchUser(matchId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      alert("User removed from matches");
    },

    onError: () => {
      alert("Could not unmatch user. Try again.");
    },
  });

  // 🔹 Loading state
  if (discoverLoading || matchesLoading) {
    return <div className="text-center mt-10">Loading dashboard...</div>;
  }

  if (discoverError || matchesError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading dashboard. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Discover Section */}
      <h1 className="text-3xl font-bold">Discover</h1>
      <div className="flex justify-center items-center min-h-[300px] relative">
        <AnimatePresence>
          {discoverData.length === 0 ? (
            <p className="text-muted-foreground">No users left to discover</p>
          ) : (
            discoverData.slice(0, 1).map((user, index) => (
              <UserCard
                key={user._id}
                user={user}
                onLike={(id) => likeMutation.mutate(id)}
                onDislike={(id) =>
                  queryClient.setQueryData(["discover"], (old = []) =>
                    old.filter((u) => u._id !== id)
                  )
                }
                style={{
                  zIndex: 10 - index,
                  scale: 1 - index * 0.05,
                  y: index * 10,
                  position: index === 0 ? "relative" : "absolute",
                }}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Matches Section */}
      <section>
        <h2 className="text-2xl font-semibold mt-10">Matches</h2>

        {matchesData.length === 0 ? (
          <p className="text-muted-foreground">No matches yet</p>
        ) : (
          matchesData.map((match) => (
            <div key={match._id} className="flex justify-between mt-2 items-center">
              <span>{match.users.join(", ")}</span>
              <Button
                variant="destructive"
                onClick={() => unmatchMutation.mutate(match._id)}
              >
                Unmatch
              </Button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}