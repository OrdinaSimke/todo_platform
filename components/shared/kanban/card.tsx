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
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';

type TodoCardProps = {
  _id: string;
  title: string;
  updatedAt?: string;
  description: string;
  deadline?: string;
  users?: any;
  stageId?: string;
};

const TodoCard = ({
  _id,
  title,
  description,
  deadline,
  users,
  stageId,
}: TodoCardProps) => {
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
          />
        </CardTitle>
        <Separator />
        <CardDescription className="pt-2 whitespace-pre-wrap">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
};

export default TodoCard;
