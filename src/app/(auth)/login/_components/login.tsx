"use client";

import FormInput from "@/components/commons/form-input";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { INITIAL_LOGIN_FORM } from "@/constants/auth-constant";
import { LoginForm, loginSchema } from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Login() {
	const form = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
		defaultValues: INITIAL_LOGIN_FORM,
	});

	const onSubmit = form.handleSubmit(async (data) => {
		console.log(data);
	});
	return (
		<Card className="gap-4">
			<CardHeader className="text-center">
				<CardTitle className="text-xl">Welcome!</CardTitle>
				<CardDescription>Login to access all features</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={onSubmit} className="space-y-4">
						{/* Email Field */}
						<FormInput
							form={form}
							label="Email"
							name="email"
							placeholder="test@mail.com"
							type="email"
						/>
						{/* Password Field */}
						<FormInput
							form={form}
							label="Password"
							name="password"
							placeholder="***"
							type="password"
						/>
						<Button
							className="w-full bg-teal-500 hover:bg-teal-600 text-primary"
							type="submit"
						>
							Login
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
