import React from "react";
import CardNumber from "../custom/CardNumber";
import Button from "../buttons/TabButton";
import StatsCarousel from "../carousels/StatsCarousel";
import { CreatedUser, Lang, UserStats } from "src/interfaces/Interfaces";
import { getUsers, getUserStats } from "src/api/api";
import { useChartStyles } from "./ChartStyles";

interface DBChartBarProps {
  currentLanguage: Lang;
  token: string;
  maxDate: Date;
}
export default function DBChartBar({
  currentLanguage,
  token,
  maxDate,
}: DBChartBarProps) {
  const [users, setUsers] = React.useState<CreatedUser[]>([]);
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
    deletedReports: 0,
  });

  const classes = useChartStyles();

  React.useEffect(() => {
    (async () => {
      const retrievedUsers = await getUsers(token);
      if (retrievedUsers != null) {
        setUsers(retrievedUsers);
        await getUserStats(
          retrievedUsers[index].id,
          maxDate,
          currentLanguage,
          token
        );
        const retrievedStats = await getUserStats(
          retrievedUsers[index].id,
          maxDate,
          currentLanguage,
          token
        );
        if (retrievedStats != null) {
          setUserStats(retrievedStats);
        }
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (users.length === 0) return;
      const retrievedStats = await getUserStats(
        users[index].id,
        maxDate,
        currentLanguage,
        token
      );
      if (retrievedStats != null) {
        setUserStats(retrievedStats);
      }
    })();
  }, [index, currentLanguage, maxDate]);

  return (
    <>
      <div className={classes.userTabsContainer}>
        {users.map((u, i) => (
          <Button
            label={u.username}
            selected={index === i}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
      <div className={classes.container}>
        <StatsCarousel
          items={[
            <div className={classes.cardnumbersContainer}>
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
            <div className={classes.cardnumbersContainer}>
              <CardNumber
                label="Translated Discarded"
                value={userStats.totranslateDeleted}
              />
              <CardNumber
                label="Questions Deleted"
                value={userStats.questionsDeleted}
              />
              <CardNumber
                label="Qu estions Updated"
                value={userStats.questionsUpdated}
              />
            </div>,
            <div className={classes.cardnumbersContainer}>
              <CardNumber
                label="Translated topics"
                value={userStats.translatedTopics}
              />
              <CardNumber
                label="Handled Reports"
                value={userStats.deletedReports}
              />
            </div>,
          ]}
        />
      </div>
    </>
  );
}
