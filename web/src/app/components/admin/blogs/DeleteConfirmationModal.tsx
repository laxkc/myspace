"use client";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  isBulkDelete: boolean;
  selectedCount?: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({
  isOpen,
  isBulkDelete,
  selectedCount = 0,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FiTrash2 className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {isBulkDelete ? "Delete Blogs" : "Delete Blog"}
              </h3>
              <p className="text-sm text-gray-600">
                This action cannot be undone
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            {isBulkDelete
              ? `Are you sure you want to delete ${selectedCount} blog${
                  selectedCount !== 1 ? "s" : ""
                }? This will permanently remove them from your portfolio.`
              : "Are you sure you want to delete this blog? This will permanently remove it from your portfolio."}
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              {isBulkDelete ? "Delete Blogs" : "Delete Blog"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 