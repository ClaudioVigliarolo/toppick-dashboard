import React from "react";

export default function TagItem({ tag, onRemove }: { tag: string; onRemove }) {
  return (
    <div style={{ background: "blue", color: "white", width: 100, height: 20 }}>
      {tag}
    </div>
  );
}
