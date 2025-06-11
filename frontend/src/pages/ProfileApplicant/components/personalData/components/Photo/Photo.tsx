import { getInitials } from 'utils/getInitials'
import styles from './Photo.module.css'

type PhotoProps = {
	photo: string;
	name: string;
	surname: string;
}

export const Photo = (props: PhotoProps) => {

	const { photo, name, surname } = props

	return (
		<>
			{!photo ? (
				<div className={styles.profileIcon}>
					{getInitials(`${name[0]} ${surname[0]}`)}
				</div>
			) : (
				<img className={styles.profilePhoto} src={photo} alt='Фотография пользователя' />
			)}
		</>
	)
}