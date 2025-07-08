"use client";
import React from "react";

interface BulkActionsProps {
  selectedCount: number;
  onPublishAll: () => void;
  onDeleteAll: () => void;
}

export default function BulkActions({
  selectedCount,
  onPublishAll,
  onDeleteAll,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-indigo-800">
          {selectedCount} blog{selectedCount !== 1 ? "s" : ""} selected
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onPublishAll}
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Publish All
          </button>
          <button
            onClick={onDeleteAll}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
} 