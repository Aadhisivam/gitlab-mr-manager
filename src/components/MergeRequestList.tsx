import React from 'react';
import { MergeRequest } from '../types/gitlab';
import { GitMerge, Tag } from 'lucide-react';

interface MergeRequestListProps {
  mergeRequests: MergeRequest[];
  selectedMRs: number[];
  onToggleMR: (mrId: number) => void;
  onMergeSelected: () => void;
}

export default function MergeRequestList({ 
  mergeRequests, 
  selectedMRs, 
  onToggleMR, 
  onMergeSelected 
}: MergeRequestListProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Merge Requests</h2>
        {selectedMRs.length > 0 && (
          <button
            onClick={onMergeSelected}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <GitMerge size={18} />
            Merge Selected ({selectedMRs.length})
          </button>
        )}
      </div>
      <div className="space-y-4">
        {mergeRequests.map((mr) => (
          <div
            key={mr.id}
            className={`p-4 border rounded-lg ${
              selectedMRs.includes(mr.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={selectedMRs.includes(mr.id)}
                onChange={() => onToggleMR(mr.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{mr.title}</h3>
                  <a
                    href={mr.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {mr.source_branch} → {mr.target_branch}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Tag size={16} className="text-gray-400" />
                  <div className="flex gap-2">
                    {mr.labels.map((label) => (
                      <span
                        key={label}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {mergeRequests.length === 0 && (
          <p className="text-center text-gray-500 py-8">No merge requests found</p>
        )}
      </div>
    </div>
  );
}