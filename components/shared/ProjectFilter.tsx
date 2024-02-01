'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllProjects } from '@/lib/actions/project.actions';
import { IProject } from '@/lib/database/models/project.model';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProjectFilter = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projectValue, setProjectValue] = useState<string | null>('');

  useEffect(() => {
    const getProjects = async () => {
      const projectList = await getAllProjects();
      projectList && setProjects(projectList as IProject[]);
    };

    getProjects();
  }, []);

  useEffect(() => {
    const tmpProjectValue = new URLSearchParams(searchParams).get('project');
    setProjectValue(tmpProjectValue);
  }, [searchParams]);

  const onSelectProject = (project: string) => {
    let newUrl = '';

    if (project && project !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'project',
        value: project,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['project'],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectProject(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder={projectValue ? projectValue : 'Project'} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>

        {projects.map((project) => (
          <SelectItem
            value={project.name}
            key={project._id}
            className="select-item p-regular-14"
          >
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProjectFilter;
