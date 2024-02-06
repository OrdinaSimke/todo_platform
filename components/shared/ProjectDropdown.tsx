import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { IProject } from '@/lib/database/models/project.model';
import { startTransition, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { createProject, getAllProjects } from '@/lib/actions/project.actions';

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const ProjectDropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [newProject, setNewProject] = useState('');

  const handleAddProject = () => {
    createProject({
      projectName: newProject.trim(),
    }).then((project) => {
      setProjects((prevState) => [...prevState, project]);
    });
  };

  useEffect(() => {
    const getProjects = async () => {
      const projectList = await getAllProjects();

      projectList && setProjects(projectList as IProject[]);
    };

    getProjects();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Project" />
      </SelectTrigger>
      <SelectContent
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
      >
        {projects.length > 0 &&
          projects.map((project) => (
            <SelectItem
              key={project._id}
              value={project._id}
              className="select-item p-regular-14"
            >
              {project.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new project
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New project</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Project name"
                  className="input-field mt-3"
                  onChange={(e) => setNewProject(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddProject)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default ProjectDropdown;
