import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDateTime } from '@/lib/utils';

type TodoCardProps = {
  _id: string;
  title: string;
  updatedAt?: string;
  description: string;
  deadline?: string;
  users?: any;
};

const TodoCard = ({
  _id,
  title,
  description,
  deadline,
  users,
}: TodoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge>{formatDateTime(deadline).monthDayYear}</Badge>
      </CardContent>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
};

export default TodoCard;
