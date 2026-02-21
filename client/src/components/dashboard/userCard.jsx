import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const SWIPE_THRESHOLD = 120;

export default function UserCard({ user, onLike, onDislike }) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > SWIPE_THRESHOLD) {
          onLike(user._id);
        } else if (info.offset.x < -SWIPE_THRESHOLD) {
          onDislike(user._id);
        }
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="inline-block w-full h-full max-w-sm shadow-lg">
        <CardContent className="flex flex-col p-40 space-y-4 text-center items-center justify-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarFallback>{user.firstName[0]}</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="flex items-center justify-center text-xl font-semibold">
              {user.firstName},{" "}
              {new Date().getFullYear() -
                new Date(user.birthDate).getFullYear()}
            </h2>
            <p className="text-sm text-muted-foreground">{user.gender}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
