import { ImagePlus } from 'lucide-react'
import Image from 'next/image'

import { Button } from '../Button'

import { useUpload } from './useUpload'

interface ImageUploadProps {
	isDisabled: boolean
	onChange: (value: string[]) => void
	value: string[]
}

export function ImageUpload({ isDisabled, onChange, value }: ImageUploadProps) {
	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } = useUpload(onChange)
	return (
		<div>
			<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5'>
				{value.map(url => (
					<div
						key={url}
						className='relative rounded-md overflow-hidden w-[200px] h-[200px] '
					>
						<Image
							src={url}
							alt='Фото товару'
							className='w-full h-full object-cover'
							width={200}
							height={200}
						/>
					</div>
				))}
			</div>
			<Button
				type='button'
				disabled={isDisabled || isUploading}
				variant='secondary'
				onClick={handleButtonClick}
				className={value.length ? 'mt-4' : 'upload'}
			>
				<ImagePlus className='size-4 mr-2 ' />
				Завантажити картинку
			</Button>
			<input
				type='file'
				multiple
				className='hidden'
				ref={fileInputRef}
				onChange={handleFileChange}
				disabled={isDisabled}
			/>
		</div>
	)
}
