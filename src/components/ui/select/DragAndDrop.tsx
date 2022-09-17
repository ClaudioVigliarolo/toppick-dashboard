import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { COLORS } from "@/styles/colors";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "../icon/EditIcon";

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

  const [currentItems, setCurrentItems] = useState<
    { title: string; id: number }[]
  >([]);

  React.useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const handleDrop = (droppedItem) => {
    if (!droppedItem.destination) return;
    var updatedList = [...currentItems];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    setCurrentItems(updatedList);
  };

  return (
    <div className={classes.container}>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable>
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
                          <EditIcon onClick={() => onEdit(item.id)} />
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
