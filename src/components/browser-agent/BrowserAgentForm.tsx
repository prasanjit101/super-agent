"use client";

import {
	browserAgentIdSchema,
	browserAgentInsertSchema,
	browserAgentUpdateSchema,
	browserAgentSelectSchema,
	browserAgent,
	listUserResourceSchema,
	NewBrowserAgent,
	BrowserAgent,
  } from '@/server/db/schema';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { trpc } from "@/trpc/react";

const BrowserAgentForm = ({ browserAgent, closeModal }: { browserAgent?: BrowserAgent; closeModal?: () => void }) => {
	const editing = !!browserAgent?.id;
	const router = useRouter();
	const utils = trpc.useUtils();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof browserAgentInsertSchema>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(browserAgentInsertSchema),
		defaultValues: browserAgent ?? {
			title: '',
			description: '',
		},
	});

	const onSuccess = async (action: 'create' | 'update' | 'delete', data?: { error?: string }) => {
		if (data?.error) {
			toast({ description: data.error, variant: 'destructive' });
			return;
		}

		await utils.browserAgent.list.invalidate();
		router.refresh();
		if (closeModal) closeModal();
		toast({ description: `Browser Agent ${action}d!` });
	};

	const { mutate: createBrowserAgent, isPending: isCreating } = trpc.browserAgent.create.useMutation({
		onSuccess: (res) => onSuccess('create'),
		onError: (err) => onSuccess('create', { error: err.message }),
	});

	const { mutate: updateBrowserAgent, isPending: isUpdating } = trpc.browserAgent.update.useMutation({
		onSuccess: (res) => onSuccess('update'),
		onError: (err) => onSuccess('update', { error: err.message }),
	});

	const { mutate: deleteBrowserAgent, isPending: isDeleting } = trpc.browserAgent.delete.useMutation({
		onSuccess: (res) => onSuccess('delete'),
		onError: (err) => onSuccess('delete', { error: err.message }),
	});

	const handleSubmit = (values: NewBrowserAgent) => {
		console.log(JSON.stringify(values, null, 2));
		if (editing) {
			updateBrowserAgent({
				...values,
				id: browserAgent.id,
			});
		} else {
			createBrowserAgent(values);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={() => handleSubmit(form.getValues())} className={'space-y-8'}>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="mr-1" disabled={isCreating || isUpdating}>
					{editing
						? `Sav${isUpdating ? 'ing...' : 'e'}`
						: `Creat${isCreating ? 'ing...' : 'e'}`}
				</Button>
				{editing ? (
					<Button
						type="button"
						variant={'destructive'}
						onClick={() => deleteBrowserAgent({ id: browserAgent.id })}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	);
};

export default BrowserAgentForm;
