import { FC } from 'react'

import { Skill } from 'services/models'

import styles from './Skills.module.css'

type Props = {
  skills: Skill[]
}

const Skills: FC<Props> = ({ skills }) => {
  return (
    <>
      {
        <section className={styles.fieldInfo}>
          <h3 className={styles.titleInfo}>Ключевые навыки</h3>
          <div className={styles.keySkillsItems}>
            {skills.map((skill) => (
              <div className={styles.skillItem} key={skill.id}>
                {skill.skillName}
              </div>
            ))}
          </div>
        </section>
      }
    </>
  )
}

export default Skills
