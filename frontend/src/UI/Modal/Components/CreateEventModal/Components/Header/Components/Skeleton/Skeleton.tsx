import style from './Skeleton.module.css'

const Skeleton = () => {
  return (
    <>
      <div className={style.avatar}/>
      <div className={style.userInfo}>
        <span className={style.name}/>
        <span className={style.email}/>
      </div>
    </>
  )
}

export default Skeleton
