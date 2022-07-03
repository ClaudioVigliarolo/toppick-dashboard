import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core";
import { SearchKeyword } from "@toppick/common";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  listContainer: {
    display: "flex",
    fontSize: "18px",
    flexDirection: "column",
  },

  itemContainer: {
    cursor: "pointer",
    background: "orange",
    color: "white",
    borderRadius: 5,
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 15,
    height: 30,
    width: 150,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    margin: 5,
  },
}));

interface KeywordsDragDropProps {
  keywords: SearchKeyword[];
  onSelect: (keyword: SearchKeyword) => void;
  onDragEnd: (keywords: SearchKeyword[]) => void;
}

export default function KeywordsDragDrop({
  keywords,
  onSelect,
  onDragEnd,
}: KeywordsDragDropProps) {
  const classes = useStyles();

  // React state to track order of items
  const [currentKeywords, setCurrentKeywords] =
    useState<SearchKeyword[]>(keywords);

  React.useEffect(() => {
    setCurrentKeywords(keywords);
  }, [keywords]);

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...currentKeywords];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setCurrentKeywords(updatedList);
    //
    onDragEnd(updatedList);
  };

  return (
    <div className={classes.container}>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div
              className={classes.listContainer}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {currentKeywords.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      onClick={() => onSelect(item)}
                      className={classes.itemContainer}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      {item.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
