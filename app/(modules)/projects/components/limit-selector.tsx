// components/LimitSelector.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface LimitSelectorProps {
  currentLimit: number;
}

const LimitSelector = ({ currentLimit }: LimitSelectorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLimitChange = (newLimit: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', newLimit);
    params.set('page', '1');
    
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="limit-select" className="text-sm text-gray-600">
        Por página:
      </label>
      <select
        id="limit-select"
        value={currentLimit}
        className="border rounded px-2 py-1 text-sm"
        onChange={(e) => handleLimitChange(e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default LimitSelector;