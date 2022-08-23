import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { COLORS } from "@/constants/colors";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

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

  itemContainer: {},
  editIcon: {
    cursor: "pointer",
    color: COLORS.primaryOrange,
  },
  listItem: {
    backgroundColor: "white",
    marginBottom: 25,

    borderRadius: 5,
  },
}));

interface DragAndDropProps {
  items: { title: string; id: number }[];
  onEdit: (id: number) => void;
  onDragEnd: (items: { title: string; id: number }[]) => void;
  itemStyles?: React.CSSProperties;
}

export default function DragAndDrop({
  items,
  onDragEnd,
  onEdit,
  itemStyles,
}: DragAndDropProps) {
  const classes = useStyles();

  // React state to track order of items
  const [currentItems, setCurrentItems] = useState<
    { title: string; id: number }[]
  >([]);

  React.useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...currentItems];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setCurrentItems(updatedList);
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
              {currentItems.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={classes.itemContainer}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <ListItem className={classes.listItem} style={itemStyles}>
                        <ListItemIcon>
                          <EditIcon
                            className={classes.editIcon}
                            onClick={() => onEdit(item.id)}
                          />
                        </ListItemIcon>
                        <ListItemText
                          secondary={item.title}
                          primary={index + 1}
                        />
                      </ListItem>
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
