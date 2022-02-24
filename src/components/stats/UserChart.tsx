import React from "react";
import CardNumber from "../ui/CardNumber";
import Button from "@/components/ui/buttons/TabButton";
import StatsCarousel from "./StatsCarousel";
import { getUsers, getUserStats } from "@/services/api";
import { useChartStyles } from "../ui/ChartStyles";
import { Lang } from "@/interfaces/app";
import { UserCreated } from "@/interfaces/dash_user";
import { UserStats } from "@/interfaces/stats";

interface DBChartBarProps {
  currentLanguage: Lang;
  token: string;
  from: Date;
  until: Date;
}
export default function DBChartBar({
  currentLanguage,
  token,
  from,
  until,
}: DBChartBarProps) {
  const [users, setUsers] = React.useState<UserCreated[]>([]);
  const [index, setIndex] = React.useState<number>(0);
  const [userStats, setUserStats] = React.useState<UserStats>({
    categoriesAdded: 0,
    categoriesUpdated: 0,
    categoriesDeleted: 0,
    topicsAdded: 0,
    topicsUpdated: 0,
    topicsDeleted: 0,
    questionsAdded: 0,
    questionsUpdated: 0,
    questionsDeleted: 0,
    totranslateDeleted: 0,
    translatedTopics: 0,
    translatedQuestions: 0,
    deletedReports: 0,
  });

  const classes = useChartStyles();

  React.useEffect(() => {
    (async () => {
      const retrievedUsers = await getUsers(token);
      if (retrievedUsers != null) {
        setUsers(retrievedUsers);
        const retrievedStats = await getUserStats(
          retrievedUsers[index].id,
          from,
          until,
          currentLanguage,
          token
        );
        if (retrievedStats != null) {
          setUserStats(retrievedStats);
        }
      }
    })();
  }, [currentLanguage, from, index, token, until]);

  React.useEffect(() => {
    (async () => {
      if (users.length === 0) return;
      const retrievedStats = await getUserStats(
        users[index].id,
        from,
        until,
        currentLanguage,
        token
      );
      if (retrievedStats != null) {
        setUserStats(retrievedStats);
      }
    })();
  }, [index, currentLanguage, from, token, until, users]);

  return (
    <>
      <div className={classes.userTabsContainer}>
        {users.map((u, i) => (
          <Button
            key={u.id}
            label={u.username}
            selected={index === i}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
      <div className={classes.container}>
        <StatsCarousel
          items={[
            <div className={classes.cardnumbersContainer} key={0}>
              <CardNumber label="Topics Added" value={userStats.topicsAdded} />
              <CardNumber
                label="Topics Updated"
                value={userStats.topicsUpdated}
              />
              <CardNumber
                label="Questions Added"
                value={userStats.questionsAdded}
              />
            </div>,
          ]}
        />
      </div>
    </>
  );
}