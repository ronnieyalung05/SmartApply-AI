import { useState } from "react";

export function useJobDescriptionList(descriptions, onEdit, onDelete) {
  const [listOpen, setListOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [pendingDelete, setPendingDelete] = useState(null);

  const openList = () => setListOpen(true);

  const closeList = () => {
    setListOpen(false);
    setEditingIndex(null);
    setEditTitle("");
    setEditDescription("");
    setExpandedItems(new Set());
    setPendingDelete(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeList();
    }
  };

  const startEdit = (index, jobData) => {
    setEditingIndex(index);
    setEditTitle(jobData.title || "");
    setEditDescription(jobData.description || "");
  };

  const saveEdit = () => {
    if (editDescription.trim() === "") return;

    const updatedJobData = {
      title: editTitle.trim() || "Untitled Job",
      description: editDescription.trim(),
    };

    onEdit(editingIndex, updatedJobData);
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleDelete = (index) => {
    if (pendingDelete === index) {
      onDelete(index);
      setPendingDelete(null);
    } else {
      setPendingDelete(index);
      setTimeout(() => setPendingDelete(null), 3000);
    }
  };

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) newExpanded.delete(index);
    else newExpanded.add(index);
    setExpandedItems(newExpanded);
  };

  const getDisplayText = (text, index) => {
    if (!expandedItems.has(index)) {
      return text.length <= 1000 ? text : text.substring(0, 1000) + "...";
    }
    return text;
  };

  const getExpandButtonInfo = (text, index) => {
    if (text.length <= 1000) return { show: false };
    return {
      show: true,
      text: expandedItems.has(index) ? "⬆" : "⬇",
      isExpand: !expandedItems.has(index),
    };
  };

  return {
    listOpen,
    openList,
    closeList,
    handleBackdropClick,
    editingIndex,
    editTitle,
    editDescription,
    setEditTitle,
    setEditDescription,
    startEdit,
    saveEdit,
    cancelEdit,
    handleDelete,
    toggleExpanded,
    getDisplayText,
    getExpandButtonInfo,
    pendingDelete,
  };
}