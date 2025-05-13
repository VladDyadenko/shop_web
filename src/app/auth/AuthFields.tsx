import { UseFormReturn } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'

import { validEmail } from '@/shared/regex'
import { IAuthForm } from '@/shared/types/auth.interface'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, IAuthForm>
	isPending: boolean
	isReg?: boolean
}

export function AuthFields({ form, isPending, isReg = false }: AuthFieldsProps) {
	return (
		<div className='flex flex-col  gap-4'>
			{isReg && (
				<FormField
					control={form.control}
					name='name'
					rules={{ required: "Ім'я обов'язкове" }}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Ваше ім'я" disabled={isPending} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<FormField
				control={form.control}
				name='email'
				rules={{
					required: "Пошта обов'язкове",
					pattern: {
						value: validEmail,
						message: 'Уведіть валідну пошту'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder='name@example.com'
								type='email'
								disabled={isPending}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='password'
				rules={{
					required: "Пароль обов'язковий",
					minLength: {
						value: 6,
						message: 'Мінімум 6 символів'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder='******'
								type='password'
								disabled={isPending}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}
