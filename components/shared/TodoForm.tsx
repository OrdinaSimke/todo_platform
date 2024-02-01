'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { todoFormSchema } from '@/lib/validator';
import { todoDefaultValues } from '@/constants';
import Dropdown from './Dropdown';
import { FileUploader } from './FileUploader';
import { useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import { Checkbox } from '@/components/ui/checkbox';

import 'react-datepicker/dist/react-datepicker.css';

type TodoFormProps = {
  userId: String;
  type: 'Create' | 'Update';
};

const TodoForm = ({ userId, type }: TodoFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues = todoDefaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof todoFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-2 py-2">
                    <Input
                      placeholder="Todo title"
                      {...field}
                      className="input-field"
                    />

                    <FormField
                      control={form.control}
                      name="isPrivate"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label className="whitespace-nowrap pr-3 leading-none peer-desabled:cursor-not-allowed peer-disabled:opacity-70">
                                Private
                              </label>
                              <Checkbox
                                id="isPrivate"
                                className="mr-2 h-5 w-5 border-2 border-primary-500"
                                onCheckedChange={field.onChange}
                                checked={field.value}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-2 py-2">
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">
                      Start Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time"
                      dateFormat="dd/MM/yyyy hh:mm"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimatedHours"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-4 py-2">
                    <p className="ml-3 whitespace-nowrap text-grey-600">
                      Estimated hours:
                    </p>
                    <Input
                      type="number"
                      {...field}
                      className="input-field"
                      placeholder="0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/link.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <Input
                      placeholder="URL"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? 'Submitting' : `${type} Todo`}
        </Button>
      </form>
    </Form>
  );
};

export default TodoForm;