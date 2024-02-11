import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { updatePartOfTodo } from '@/lib/actions/todo.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import { MarkCompleteConfirmation } from '../MarkCompleteConfirmation';

type TodoCardProps = {
  _id: string;
  title: string;
  updatedAt?: string;
  description: string;
  deadline?: string;
  assigneeId?: string;
  stageId?: string;
  users?: any;
  currentUserId?: string;
  todo: any;
};

const TodoCard = ({
  _id,
  title,
  description,
  deadline,
  assigneeId,
  stageId,
  users,
  currentUserId,
  todo,
}: TodoCardProps) => {
  const handleClickAssign = async () => {
    try {
      const updatedTodo = await updatePartOfTodo({
        todoId: _id,
        params: { assigneeId: currentUserId },
        path: '/kanban',
      });

      if (updatedTodo) {
        // console.log('updated', updatedTodo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = () => {
    const user = users.data.find((d: any) => {
      return d._id === assigneeId;
    });

    return user;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="whitespace-pre-wrap float-left">
          {title}
          <Image
            src="/assets/icons/three-dot.svg"
            alt="edit"
            width={32}
            height={32}
            className="float-right cursor-pointer"
            onPointerDown={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        </CardTitle>
        <Separator />
        <CardDescription className="pt-2 whitespace-pre-wrap">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-3 items-center justify-between">
        <Badge
          style={{
            backgroundColor:
              stageId === 'Done'
                ? '#227766'
                : !deadline || (deadline && new Date(deadline) < new Date())
                ? 'red'
                : 'auto',
          }}
        >
          {formatDateTime(deadline).monthDayYear}
        </Badge>
        {stageId === 'Done' && (
          <Badge
            style={{
              backgroundColor: '#eee',
              color: '#333',
              cursor: 'pointer',
            }}
            onPointerDown={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => {
              e.preventDefault();
              handleClickAssign();
            }}
          >
            <MarkCompleteConfirmation
              todo={todo}
              todoId={_id}
              userId={currentUserId}
            />
          </Badge>
        )}
        {!assigneeId && (
          <Badge
            style={{
              backgroundColor: '#CCC',
              color: '#333',
              cursor: 'pointer',
            }}
            onPointerDown={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => {
              e.preventDefault();
              handleClickAssign();
            }}
          >
            Assign
          </Badge>
        )}
        {assigneeId && (
          <Avatar>
            <AvatarImage src={getUser()?.photo} alt="Assignee pic" />
            <AvatarFallback>
              {getUser()?.firstName?.substring(0, 1)}
              {getUser()?.lastName?.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
        )}
      </CardContent>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
};

export default TodoCard;
