import React from 'react'
import {CreateView} from "@/components/refine-ui/views/create-view.tsx";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb.tsx";
import {useBack} from "@refinedev/core";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {classSchema} from "@/lib/schema.ts";
import * as z from "zod";
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";




const Create = () => {
    const back = useBack();

    const form = useForm({
        resolver: zodResolver(classSchema),
        refineCoreProps: {
            resource: 'classes',
            action: 'create',
        },
        defaultValues: {
            status: 'active',
        },
    })

    const { handleSubmit, formState: { isSubmitting, control }} = form;
    const onSubmit = (values: z.infer<typeof classSchema>) => {
        try{
            console.log(values);
        } catch (e){
            console.log('Error creating new classes', e);
        }
    }

    const teachers = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Michael Johnson" },
    ];

    const subjects = [
        { id: 1, name: "Mathematics", code: "MATH" },
        { id: 2, name: "Science", code: "SCI" },
        { id: 3, name: "History", code: "HIST" },
    ];

    return (
        <CreateView className="class-view">
            <Breadcrumb />

            <h1 className="page-title">Create a Class</h1>

            <div className="intro-row">
                <p>Provide the required information below to add a class.</p>
                <Button onClick={back}>Go Back</Button>
            </div>

            <Separator />

            <div className="my-4 flex item-center">
                <Card className="class-form-card">
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-2xl pb-0 font-bold">Fill out the form</CardTitle>
                    </CardHeader>

                    <Separator />

                    <CardContent className="mt-7">
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="space-y-3">
                                    <Label>
                                        Banner Image <span className="text-orange-600">*</span>

                                        <p>Upload image widget</p>
                                    </Label>
                                </div>

                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Class Name<span className="text-orange-600">*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Introduction to Biology - Section A" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={control}
                                        name="subjectId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject<span className="text-orange-600">*</span></FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={(value) => field.onChange(Number(value))}
                                                            value={field?.value?.toString()}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a subject"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {subjects.map((subject) => (<SelectItem value={subject.id.toString()} key={subject.id}>{subject.name} ({subject.code})</SelectItem>))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="teacherId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Teacher<span className="text-orange-600">*</span></FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={(value) => field.onChange(Number(value))}
                                                            value={field?.value?.toString()}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a teacher"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {teachers.map((teacher) => (<SelectItem value={teacher.id.toString()} key={teacher.id}>{teacher.name}</SelectItem>))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <FormField
                                            control={control}
                                            name="capacity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Capacity <span className="text-orange-600">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            placeholder="30"
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                field.onChange(value ? Number(value) : undefined);
                                                            }}
                                                            value={(field.value as number | undefined) ?? ""}
                                                            name={field.name}
                                                            ref={field.ref}
                                                            onBlur={field.onBlur}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Status <span className="text-orange-600">*</span>
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="active">Active</SelectItem>
                                                            <SelectItem value="inactive">Inactive</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Description <span className="text-orange-600">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Brief description about the class"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

        </CreateView>
    )
}
export default Create
