'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<any>(null);

  const statusses = [
    {
      _id: 0,
      name: 'All',
      value: null,
    },
    {
      _id: 1,
      name: 'Open',
      value: false,
    },
    {
      _id: 2,
      name: 'Closed',
      value: true,
    },
  ];

  useEffect(() => {
    const tmpStatus = new URLSearchParams(searchParams).get('status');
    setStatus(tmpStatus);
  }, [searchParams]);

  const onSelectStatus = (selection: string) => {
    let newUrl = '';

    newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ['page'],
    });

    if (selection && selection !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'status',
        value: selection,
        keysToRemove: ['page'],
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['status'],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectStatus(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder={status ? status : 'Status'} />
      </SelectTrigger>
      <SelectContent>
        {statusses.map((item) => (
          <SelectItem
            value={item.name}
            key={item._id}
            className="select-item p-regular-14"
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
