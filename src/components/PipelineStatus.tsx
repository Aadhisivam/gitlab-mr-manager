import React from 'react';
import { Pipeline } from '../types/gitlab';
import { CircleDot, Clock, ExternalLink } from 'lucide-react';

interface PipelineStatusProps {
  pipeline: Pipeline | null;
}

export default function PipelineStatus({ pipeline }: PipelineStatusProps) {
  if (!pipeline) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'running': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="text-lg font-medium mb-3">Latest Master Pipeline</h3>
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 ${getStatusColor(pipeline.status)}`}>
          <CircleDot size={18} />
          <span className="capitalize">{pipeline.status}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Clock size={18} />
          <span>{new Date(pipeline.created_at).toLocaleString()}</span>
        </div>
        <a
          href={pipeline.web_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          View Pipeline <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}