import style from './ApplicantForm.module.css';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from "react-dom";

const Field = ({label, name, type, maxlength, min, max, pattern,
  allowedSymbols, onChange=() => {}, ...attr}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState("");
  const timeoutRef = useRef(null);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  if (!allowedSymbols) {
    allowedSymbols = pattern || '';
  }

  const handleChange = (e) => {
    let inputValue = e.target.value;

    if (inputValue === " ") {
      return;
    }
    if (inputValue === "") {
      setValue(inputValue);
      onChange(e);
      setError("");
      return;
    }

    if (type !== 'date') {
      if (inputValue.length > maxlength) {
        return;
      }

      if (!new RegExp(`^${allowedSymbols}$`).test(inputValue)) {
        return;
      }
    }

    setValue(inputValue);
    onChange(e);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (type === "date") {
        const minDate = new Date("1900-01-01");
        const maxDate = new Date(getTodayDate());
        const inputDate = new Date(inputValue);

        if (inputDate < minDate || inputDate > maxDate) {
          setError("Дата вне допустимого диапазона");
          return;
        }
      }
      else if (type === 'number') {
        if (
          (min !== undefined && inputValue < min) ||
          (max !== undefined && inputValue > max)
        ) {
          setError('Дата вне допустимого диапазона');
          return
        }
      }

      if (pattern && !new RegExp(`^${pattern}$`).test(inputValue)) {
        setError('Неверный формат ввода');
      } else {
        setError('');
      }
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, []);
  
  return (
    <>
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        min={type === 'date' ? '1900-01-01' : min}
        max={type === "date" ? getTodayDate() : max}
        maxLength={maxlength}
        pattern={pattern}
        value={value}
        {...attr}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (
            (type === "number" && ["e", "E", "+", "-", ".", ","].includes(e.key))
          ) {
            e.preventDefault();
          }
        }}
      />
    </div>
    {error && value.trim() !== "" && <span className={style.validationError}>{error}</span>}
    </>
  )
}

const Radio = ({label, name, value, required=false, onChange=() => {}}) => {
  return (
    <div>
      <fieldset>
        <legend>{label}</legend>
        <input type="radio" name={name} id={name + '_yes'} value="yes" checked={value === true}
        required={required} onChange={onChange} />
        <label htmlFor={name + '_yes'}>Да</label>
        <input type="radio" name={name} id={name + '_no'} value="no" checked={value === false}
        onChange={onChange} />
        <label htmlFor={name + '_no'}>Нет</label>
      </fieldset>
    </div>
  )
}

const ModalForm = ({fields, initialValues, closeForm, handleValues, formId}) => {
  const [values, setValues] = useState(initialValues);

  const handleFormValues = (path, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [path]: value
    }))
  }

  const handleSave = (e) => {
    e.preventDefault();
    handleValues(values);
    closeForm();
  }

  return createPortal(
    <form id={formId} className={`${style.portalForm} ${style.formGroup}`} onSubmit={handleSave}>
      {React.cloneElement(fields, {handleFormValues, values})}
      <div>
        <button type='submit'>Сохранить</button> 
        <button type='button' onClick={closeForm}>Закрыть</button>
      </div>
    </form>, document.body
  )
}

const JobForm = ({ closeForm, handleValues, values={} }) => {
  const initialValues = {
    dateStart: values.dateStart || '',
    dateEnd: values.dateEnd || '',
    name: values.name || '',
    country: values.country || 'Россия',
    address: values.address || '',
    position: values.position || '',
    submissionReason: values.submissionReason || '',
  };

  return (
    <ModalForm
      fields={<JobFields />}
      initialValues={initialValues}
      closeForm={closeForm}
      handleValues={handleValues}
      formId="job-form"
    />
  );
};

const JobFields = ({ handleFormValues, values }) => (
  <>
    <Field label="Дата начала работы" name="job_start_date" type="date" required
      value={values.dateStart} onChange={e => handleFormValues('dateStart', e.target.value)} />
    <Field label="Дата увольнения" name="job_termination_date" type="date" required
      value={values.dateEnd} onChange={e => handleFormValues('dateEnd', e.target.value)} />
    <Field label="Название учреждения" name="job_institution_name" type="text" pattern='[А-Яа-яA-Za-z0-9\s"-]+' required
      value={values.name} onChange={e => handleFormValues('name', e.target.value)} />
    <div>
      <label htmlFor="job_country">Страна</label>
      <select name="job_country" id="job_country" value={values.country} 
        onChange={e => handleFormValues('country', e.target.value)} >
        <option>Россия</option>
        <option>Беларусь</option>
        <option>Казахстан</option>
        <option>Узбекистан</option>
        <option>Туркменистан</option>
        <option>Грузия</option>
        <option>Азербайджан</option>
        <option>Армения</option>
      </select>
    </div>
    <Field label="Адрес" name="job_address" type="text" pattern="[А-Яа-яA-Za-z0-9\s.,\-\/]+" required
      value={values.address} onChange={e => handleFormValues('address', e.target.value)} />
    <Field label="Должность" name="job_position_past_5_years" type="text" pattern="[А-Яа-яA-Za-z0-9\s\-]+" required
      value={values.position} onChange={e => handleFormValues('position', e.target.value)} />
    <Field label="Причина увольнения" name="job_termination_reason" type="text" pattern="[А-Яа-яA-Za-z0-9\s\-]+" required
      value={values.submissionReason} onChange={e => handleFormValues('submissionReason', e.target.value)} />
  </>
);

const FamilyForm = ({ closeForm, handleValues, values={} }) => {
  const initialValues = {
    relationshipDegreeId: values.relationshipDegreeId || 'Жена',
    workPlace: values.workPlace || '',
    phone: values.phone || '+7',
  };

  return (
    <ModalForm
      fields={<FamilyFields />}
      initialValues={initialValues}
      closeForm={closeForm}
      handleValues={handleValues}
      formId="family-form"
    />
  );
};

const FamilyFields = ({ handleFormValues, values }) => (
  <>
    <div>
      <label htmlFor="degree_of_kinship">Степень родства</label>
      <select name="degree_of_kinship" id="degree_of_kinship" required value={values.relationshipDegreeId} 
        onChange={(e) => handleFormValues('relationshipDegreeId', e.target.value)}>
        <option>Жена</option>
        <option>Муж</option>
        <option>Отец</option>
        <option>Сын</option>
        <option>Мать</option>
        <option>Дочь</option>
        <option>Сестра</option>
        <option>Брат</option>
        <option>Бабушка</option>
        <option>Дед</option>
        <option>Внук</option>
        <option>Внучка</option>
        <option>Свекровь</option>
        <option>Свекор</option>
        <option>Теща</option>
        <option>Тесть</option>
        <option>Невестка</option>
        <option>Зять</option>
      </select>
    </div>
    <Field label="Место работы" name="family_job" type="text" pattern='[А-Яа-яA-Za-z0-9\s"-]+'
      value={values.workPlace} onChange={(e) => handleFormValues('workPlace', e.target.value)} />
    <Field label="Мобильный телефон" name="family_phone" type="tel" pattern="\+\d{11}" allowedSymbols='[+\d]+' maxlength='12'
      value={values.phone} required onChange={(e) => handleFormValues('phone', e.target.value)} />
  </>
);

const EduForm = ({ closeForm, handleValues, values={} }) => {
  const initialValues = {
    dateReceipt: values.dateReceipt || '',
    dateEnd: values.dateEnd || '',
    institutionName: values.institutionName || '',
    speciality: values.speciality || '',
    qualification: values.qualification || 'Бакалавр',
    diplomaNumber: values.diplomaNumber || '',
  };

  return (
    <ModalForm
      fields={<EduFields />}
      initialValues={initialValues}
      closeForm={closeForm}
      handleValues={handleValues}
      formId="edu-form"
    />
  );
};

const EduFields = ({ handleFormValues, values }) => (
  <>
    <Field label="Дата поступления" name="edu_start_date" type="date" required
      value={values.dateReceipt} onChange={(e) => handleFormValues('dateReceipt', e.target.value)} />
    <Field label="Дата окончания" name="edu_end_date" type="date" required
      value={values.dateEnd} onChange={(e) => handleFormValues('dateEnd', e.target.value)} />
    <Field label="Название учреждения" name="edu_institution_name" type="text" pattern='[А-Яа-яA-Za-z0-9\s"-]+' required
      value={values.institutionName} onChange={(e) => handleFormValues('institutionName', e.target.value)} />
    <Field label="Специальность" name="edu_specialty" type="text" pattern="[А-Яа-я\s]+" required
      value={values.speciality} onChange={(e) => handleFormValues('speciality', e.target.value)} />
    <div>
      <label htmlFor="qualification">Квалификация</label>
      <select name="qualification" id="qualification" required value={values.qualification} 
        onChange={(e) => handleFormValues('qualification', e.target.value)}>
        <option>Бакалавр</option>
        <option>Специалист</option>
        <option>Магистр</option>
        <option>Нет</option>
      </select>
    </div>
    <Field label="№ диплома" name="diploma_number" type="text" pattern="[0-9А-Я]+" required
      value={values.diplomaNumber} onChange={(e) => handleFormValues('diplomaNumber', e.target.value)} />
  </>
);

const RecommenderForm = ({ closeForm, handleValues, values={} }) => {
  const initialValues = {
    namePatronym: values.namePatronym || '',
    status: values.status || '',
    organization: values.organization || '',
    organizationPhone: values.organizationPhone || '+7',
  };

  return (
    <ModalForm
      fields={<RecommenderFields />}
      initialValues={initialValues}
      closeForm={closeForm}
      handleValues={handleValues}
      formId="recommender-form"
    />
  );
};

const RecommenderFields = ({ handleFormValues, values }) => (
  <>
    <Field label="Имя Отчество" name="recommender_name" type="text" pattern="[А-Яа-яA-Za-z\s\-]+" required
      value={values.namePatronym} onChange={(e) => handleFormValues('namePatronym', e.target.value)} />
    <Field label="Статус" name="recommender_position" type="text" pattern="[А-Яа-яA-Za-z\s\-/]+" required
      value={values.status} onChange={(e) => handleFormValues('status', e.target.value)} />
    <Field label="Организация" name="recommender_organization" type="text" pattern="[А-Яа-яA-Za-z0-9\s\x22]+" required
      value={values.organization} onChange={(e) => handleFormValues('organization', e.target.value)} />
    <Field label="Контактный телефон организации" name="recommender_phone" type="tel" pattern="\+\d{11}" allowedSymbols='[+\d]+' required
      value={values.organizationPhone} maxlength='12' onChange={(e) => handleFormValues('organizationPhone', e.target.value)} />
  </>
);

const DegreeForm = ({ closeForm, handleValues, values={} }) => {
  const initialValues = {
    name: values.name || 'Кандидат наук',
    academicReceiptDate: values.academicReceiptDate || '',
  };

  return (
    <ModalForm
      fields={<DegreeFields />}
      initialValues={initialValues}
      closeForm={closeForm}
      handleValues={handleValues}
      formId='degree-form'
    />
  )
}

const DegreeFields = ({ handleFormValues, values }) => (
  <>
    <div>
    <label htmlFor="degree_name">Ученая степень (наименование)</label>
    <select name="degree_name" id="degree_name" required
    onChange={(e) => handleFormValues('name', e.target.value)} value={values.academicReceiptDate}>
      <option>Кандидат наук</option>
      <option>Доктор наук</option>
      <option>Нет</option>
    </select>
  </div>
  {values.name != 'Нет' && <Field label='Ученая степень (дата получения)' name='degree_date' type='date'
  onChange={(e) => handleFormValues('academicReceiptDate', e.target.value)} value={values.academicReceiptDate} />}
  </>
)

const Table = ({id, headers, data, handleEdit, handleDelete, Form}) => {
  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState({});

  const openEditForm = (index) => {
    setShowForm(true);
    setCurrentIndex(index);
  };

  const handleFormEdit = (values) => {
    handleEdit(currentIndex, values);
    setShowForm(false);
  };

  return (
    <>
    <table id={id}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {Object.values(row).map((value, colIndex) => (
            <td key={colIndex}>{value}</td>
          ))}
          <td>
            <div><button type='button' onClick={() => openEditForm(rowIndex)}>Редактировать</button></div>
            <div><button type='button' onClick={() => handleDelete(rowIndex)}>Удалить</button></div>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
    {showForm && (
      <div>
      <Form closeForm={() => setShowForm(false)} handleValues={handleFormEdit} values={data[currentIndex]} />
      <div className={style.overlay}></div>
      </div>
    )}
    </>
  )
}

export const ApplicantForm = () => {
  const [values, setValues] = useState({
    "vacancy": "",
    "surname": "",
    "name": "",
    "patronym": "",
    "dateOfBirth": "",
    "placeOfBirth": "",
    "citizenship": "Россия",
    "dateReceived": "",
    "isCitizenshipChange": null,
    "dateOfArrival": "",
    "pastCountry": "",
    "clothingSize": 0,
    "shoeSize": 0,
    "maritalStatus": "",
    "howYouKnow": "",
    "documents": {
      "pensionCertificate": 0,
      "enn": 0,
      "isInternationalPassport": null,
      "isAvialabilityVehicles": null,
      "driverCategory": [],
      "driverSeriasNumber": "",
      "driverIssuedDate": ""
    },
    "millitaryRegistration": {
      "isConscript": null,
      "isMilitaryService": null,
      "isCombatParticipation": false,
      "combatParticipationDescription": "",
      "reasonNotConscription": "",
      "suitablity": "",
      "accountingGroupe": "",
      "composition": "",
      "accountingCategory": "",
      "vus": "",
      "militaryNumber": "",
      "issuedDate": "",
      "issuedBy": "",
      "militaryRank": ""
    },
    "passport": {
      "series": 0,
      "number": 0,
      "issuedBy": "",
      "issuedDate": ""
    },
    "recommendations": [
      // {
      //   "namePatronym": "",
      //   "status": "",
      //   "organization": "",
      //   "organizationPhone": ""
      // }
    ],
    "workActivity": [
      // {
      //   "dateStart": "",
      //   "dateEnd": "",
      //   "name": "",
      //   "country": "",
      //   "address": "",
      //   "position": "",
      //   "submissionReason": "",
      // }
    ],
    "professionalCompetencies": {
      "specialProfSkills": "",
      "taskSolved": "",
      "additionalSpecSkill": "",
      "isMedicalRetrictions": null,
      "medicalRetrictions": "",
      "whatSoftware": ""
    },
    "commercialWork": {
      "name": "",
      "actualAddress": ""
    },
    "gosWork": {
      "name": "",
      "position": ""
    },
    "education": [
      // {
      //   "receiptDate": "",
      //   "endDate": "",
      //   "institutionName": "",
      //   "speciality": "",
      //   "qualification": "",
      //   "diplomaNumber": 0
      // }
    ],
    "academicDegree": [
      // {  
      //   "name": "Кандидат наук",
      //   "academicReceiptDate": ""
      // }
    ],
    "address": {
      "registrationAddress": "",
      "residenceAddress": ""
    },
    "contactInfo": {
      "phoneMobile": '+7',
      "phoneLandline": '+7',
      "email": ""
    },
    "relatives": [
      // {
      //   "relationshipDegree": "",
      //   "workPlace": "",
      //   "phone": 0
      // }
    ],
    "additionalInfo": {
      "isCriminalRecord": null,
      "criminalArticle": "",
      "year": 0,
      "isOffenses": null,
      "offenses": "",
      "hobbies": "",
      "aboutYourself": ""
    },
  });

  const handleValues = (path, value) => {
    setValues((prev) => {
      const keys = path.split(".");
      const newData = { ...prev };

      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      const lastKey = keys[keys.length - 1];
      current[lastKey] = value;
  
      return newData;
    });
  }

  const handleAdd = (path) => (data) => {
    setValues(prevValues => {
      const newValues = { ...prevValues };
      newValues[path] = [...newValues[path], data];
      return newValues;
    });
  };

  const handleEdit = (path) => (index, data) => {
    setValues(prevValues => {
      const newValues = { ...prevValues };
      const updatedArray = [...newValues[path]];
      updatedArray[index] = data;
      newValues[path] = updatedArray;
      return newValues;
    });
  };
  
  const handleDelete = (path) => (index) => {
    setValues(prevValues => {
      const newValues = { ...prevValues };
      newValues[path] = newValues[path].filter((_, i) => i !== index);
      return newValues;
    });
  };

  const sendData = () => {
    fetch('/api/signing/survey-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
  }
  
  const [showCitizenshipForm, setShowCitizenshipForm] = useState(false);
  const [showTransportForm, setShowTransportForm] = useState(false);
  const [showFamilyForm, setShowFamilyForm] = useState(false);
  const [showArmyForm, setShowArmyForm] = useState(null);
  const [showMilParticipationForm, setShowMilParticipationForm] = useState(false);
  const [showEduForm, setShowEduForm] = useState(false);
  const [showDegreeForm, setShowDegreeForm] = useState(false)
  const [showStateServiceForm, setShowStateServiceForm] = useState(null);
  const [showAnotherJobForm, setShowAnotherJobForm] = useState(null);
  const [showPrevJobForm, setShowPrevJobForm] = useState(false);
  const [showMedPrescriptionsForm, setShowMedPrescriptionsForm] = useState(false);
  const [showCriminalRecordForm, setShowCriminalRecordForm] = useState(false);
  const [showRecentOffencesForm, setShowRecentOffencesForm] = useState(false);
  const [showRecommenderForm, setShowRecommenderForm] = useState(false);

  const handleCitizenshipChange = (event) => {
    const value = event.target.value === 'yes'

    if (value) {
      handleValues('pastCountry', 'Россия');
    }
    else {
      handleValues('pastCountry', '');
      handleValues('dateOfArrival', '')
    }

    handleValues('isCitizenshipChange', value)
    setShowCitizenshipForm(value);
  }

  const handleTransport = (event) => {
    const value = event.target.value === 'yes'

    if (!value) {
      handleValues('documents.driverCattgory', []);
      handleValues('documents.driverSeriasNumber', '');
      handleValues('documents.driverIssuedDate', '');
    }
    
    setShowTransportForm(value);
    handleValues('documents.isAvialabilityVehicles', value);
  }

  const handleArmy = (event) => {
    const value = event.target.value === 'yes'

    if (value) {
      handleValues('millitaryRegistration.accountingGroupe', 'А (годен к военной службе)');
      handleValues('millitaryRegistration.suitablity', 'РА');
      handleValues('millitaryRegistration.composition', 'Солдаты');
      handleValues('millitaryRegistration.accountingCategory', '1');
      handleValues('millitaryRegistration.militaryRank', 'Младший лейтенант');
      handleValues('millitaryRegistration.isCombatParticipation', null);
      handleValues('millitaryRegistration.reasonNotConscription', '');
    } else {
      handleValues('millitaryRegistration.accountingGroupe', '');
      handleValues('millitaryRegistration.suitablity', '');
      handleValues('millitaryRegistration.composition', '');
      handleValues('millitaryRegistration.accountingCategory', '');
      handleValues('millitaryRegistration.militaryRank', '');
      handleValues('millitaryRegistration.vus', '');
      handleValues('millitaryRegistration.militaryNumber', '');
      handleValues('millitaryRegistration.issuedBy', '');
      handleValues('millitaryRegistration.isCombatParticipation', false);
      handleValues('millitaryRegistration.combatParticipationDescription', '');
      setShowMilParticipationForm(false);
    }

    setShowArmyForm(value);
    handleValues('millitaryRegistration.isMilitaryService', value);
  }

  const handleMilParticipation = (event) => {
    const value = event.target.value === 'yes'

    if (!showMilParticipationForm) {
      handleValues('millitaryRegistration.combatParticipationDescription', '');
    }

    setShowMilParticipationForm(value);
    handleValues('millitaryRegistration.isCombatParticipation', value);
  }

  const handleStateService = (event) => {
    const value = event.target.value === 'yes'

    if (!value) {
      handleValues('gosWork.name', '');
      handleValues('gosWork.position', '');
    }
    
    setShowStateServiceForm(value);
  }

  const handleAnotherJob = (event) => {
    const value = event.target.value === 'yes'

    if (!value) {
      handleValues('commercialWork.name', '');
      handleValues('commercialWork.actualAddress', '');
    }

    setShowAnotherJobForm(value);
  }

  const handleMedPrescriptions = (event) => {
    const value = event.target.value === 'yes'

    if (!value) {
      handleValues('professionalCompetencies.medicalRetrictions', '');
    }

    setShowMedPrescriptionsForm(value);
    handleValues('professionalCompetencies.isMedicalRetrictions', value);
  }

  const handleCriminalRecord = (event) => {
    const value = event.target.value === 'yes'

    if (!value) {
      handleValues('additionalInfo.criminalArticle', '');
      handleValues('additionalInfo.year', '');
    }

    setShowCriminalRecordForm(value);
    handleValues('additionalInfo.isCriminalRecord', value);
  }

  const handleRecentOffences = (event) => {
    const value = event.target.value === 'yes'

    if (!value) {
      handleValues('additionalInfo.offenses', '');
    }

    setShowRecentOffencesForm(value);
    handleValues('additionalInfo.isOffenses', value);
  }

  const handleTransportCategory = (event) => {
    const { value, checked } = event.target;
    let selectedCategories = [...values.documents.driverCategory];
    if (checked) {
      selectedCategories.push(value);
    } else {
      selectedCategories = selectedCategories.filter((item) => item !== value);
    }
    handleValues('documents.driverCategory', selectedCategories);
  }

  const [dataProcessingChecked, setDataProcessingChecked] = useState(false);
  const handleDataProcessingChecked = () => {
    setDataProcessingChecked(!dataProcessingChecked)
  }

  const [address, setAddress] = useState('');
  const [sameAddress, setSameAddress] = useState(false);
  const handleAddress = (event) => {
    setAddress(event.target.value);
    handleValues('address.registrationAddress', event.target.value)
  }

  useEffect(() => {
    if ([showPrevJobForm, showFamilyForm, showEduForm, showRecommenderForm].some(Boolean)) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    }
  }, [showPrevJobForm, showFamilyForm, showEduForm, showRecommenderForm, showDegreeForm])

  return (
    <div className={style.main}>
    <h1>Анкета</h1>
    <form action="">
      <div className={style.formGroup}>
        <h2>Общая информация</h2>
        <Field label="Кандидат на вакансию" name="vacancy" type="text" pattern='[А-Яа-яA-Za-z0-9\s\-\/()]+' required
        onChange={(e) => handleValues('vacancy', e.target.value)} />
        <Field label="Фамилия" name="surname" type="text" pattern='[А-Яа-яA-Za-z\-]+' required
        onChange={(e) => handleValues('surname', e.target.value)} />
        <Field label="Имя" name="name" type="text" pattern='[А-Яа-яA-Za-z\-]+' required
        onChange={(e) => handleValues('name', e.target.value)} />
        <Field label="Отчество" name="patronymic" type="text" pattern='[А-Яа-яA-Za-z\-]+'
        onChange={(e) => handleValues('patronym', e.target.value)} />
        <Field label='Дата рождения' name='date_of_birth' type='date' required
        onChange={(e) => handleValues('dateOfBirth', e.target.value)} />
        <Field label='Место рождения' name='place_of_birth' type='text' pattern='[А-Яа-яA-Za-z.,\s]+' required 
        onChange={(e) => handleValues('placeOfBirth', e.target.value)} />
        <div>
          <label htmlFor="citizenship">Гражданство</label>
          <select name="citizenship" id="citizenship" onChange={e => handleValues('citizenship', e.target.value)}>
            <option>Россия</option>
            <option>Беларусь</option>
            <option>Казахстан</option>
            <option>Узбекистан</option>
            <option>Туркменистан</option>
            <option>Грузия</option>
            <option>Азербайджан</option>
            <option>Армения</option>
          </select>
        </div>
        <Field label='Дата получения' name='citizenship_date_received' type='date' required
        onChange={(e) => handleValues('dateReceived', e.target.value)} />
        <Radio label='Меняли ли гражданство' name='is_citizenship_change' value={values.isCitizenshipChange} required onChange={handleCitizenshipChange} />
        {showCitizenshipForm && <div className={style.formGroup}>
          <div>
            <label htmlFor="past_country">Страна</label>
            <select name="past_country" id="past_country" onChange={e => handleValues('pastCountry', e.target.value)}>
              <option>Россия</option>
              <option>Беларусь</option>
              <option>Казахстан</option>
              <option>Узбекистан</option>
              <option>Туркменистан</option>
              <option>Грузия</option>
              <option>Азербайджан</option>
              <option>Армения</option>
            </select>
          </div>
          <Field label='Дата прибытия' name='date_of_arrival' type='date' onChange={(e) => handleValues('dateOfArrival', e.target.value)} />
        </div>}
        <Field label='Серия паспорта' name='passport_series' type='text' pattern='\d{4}' allowedSymbols='\d+' required maxlength='4'
        onChange={(e) => handleValues('passport.series', e.target.value)} />
        <Field label='Номер паспорта' name='passport_number' type='text' pattern='\d{6}' allowedSymbols='\d+' required maxlength='6'
        onChange={(e) => handleValues('passport.number', e.target.value)} />
        <Field label='Кем выдан' name='passport_issued_by' type='text' pattern='[А-Яа-я\s]+' required
        onChange={(e) => handleValues('passport.issuedBy', e.target.value)} />
        <Field label='Дата выдачи' name='passport_issued_date' type='date' required
        onChange={(e) => handleValues('passport.issuedDate', e.target.value)} />
        <Field label='Адрес регистрации' name='registration_address' type='text' pattern='[А-Яа-яA-Za-z0-9\s.,\-\/]+' required
          onChange={handleAddress} />
        <Field label='Адрес по месту проживания' name='residential_address' type='text' pattern='[А-Яа-яA-Za-z0-9\s.,\-\/]+' required
          readOnly={sameAddress} {...(sameAddress ? {value: address} : {})}
          onChange={(e) => handleValues('address.residenceAddress', e.target.value)} />
        <div>
          <label htmlFor="same_address">Совпадает с адресом регистрации</label>
          <input type="checkbox" name="same_address" id="same_address" onClick={() => setSameAddress(!sameAddress)} />
        </div>
        <Field label='Мобильный телефон' name='mobile_phone' type='tel' pattern='\+\d{11}' allowedSymbols='[+\d]+' required maxlength='12'
          value={values.contactInfo.phoneMobile} onChange={(e) => handleValues('contactInfo.phoneMobile', e.target.value)} />
        <Field label='Стационарный телефон' name='landline_phone' type='tel' pattern='\+\d{11}' allowedSymbols='[+\d]+' maxlength='12'
          value={values.contactInfo.phoneLandline} onChange={(e) => handleValues('contactInfo.phoneLandline', e.target.value)} />
        <Field label='Адрес электронной почты' name='email' type='text' pattern='[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' allowedSymbols='[a-zA-Z0-9@._-]+'
        required onChange={(e) => handleValues('contactInfo.email', e.target.value)} />
        <Field label='№ Пенсионного свидетельства' name='pensionCertificate' type='text' pattern='\d{3}-\d{3}-\d{3} \d{2}' allowedSymbols='[\d-\s]+' maxlength='14'
        required onChange={(e) => handleValues('documents.pensionCertificate', e.target.value)} />
        <Field label='Налоговый номер(ИНН)' name='tax_number' type='text' pattern='\d{12}' allowedSymbols='\d+' required maxlength='12'
        onChange={(e) => handleValues('documents.enn', e.target.value)} />
        <Radio label='Наличие загранпаспорта' name='is_international_passport' required value={values.documents.isInternationalPassport}
        onChange={(e) => handleValues('documents.isInternationalPassport', e.target.value === 'yes')} />
        <Radio label='Наличие автотранспорта' name='is_avialability_vehicles' required value={values.documents.isAvialabilityVehicles}
        onChange={handleTransport} />
        {showTransportForm && <div className={style.formGroup}>
          <Field label='Серия и номер водительского удостоверения' name='drivers_license' type='text' pattern='\d{10}' allowedSymbols='\d+'
          maxlength='10' onChange={(e) => handleValues('documents.driverSeriasNumber', e.target.value)} />
          <div>
            <fieldset>
              <legend>Категория</legend>
              <input type="checkbox" name="transport_category" id="category_m" value="m" onClick={handleTransportCategory} />
              <label htmlFor="category_m">M</label>
              <input type="checkbox" name="transport_category" id="category_a" value="a" onClick={handleTransportCategory} />
              <label htmlFor="category_a">A</label>
              <input type="checkbox" name="transport_category" id="category_b" value="b" onClick={handleTransportCategory} />
              <label htmlFor="category_b">B</label>
              <input type="checkbox" name="transport_category" id="category_be" value="be" onClick={handleTransportCategory} />
              <label htmlFor="category_be">BE</label>
              <input type="checkbox" name="transport_category" id="category_c" value="c" onClick={handleTransportCategory} />
              <label htmlFor="category_c">C</label>
              <input type="checkbox" name="transport_category" id="category_ce" value="ce" onClick={handleTransportCategory} />
              <label htmlFor="category_ce">CE</label>
              <input type="checkbox" name="transport_category" id="category_d" value="d" onClick={handleTransportCategory} />
              <label htmlFor="category_d">D</label>
              <input type="checkbox" name="transport_category" id="category_de" value="de" onClick={handleTransportCategory} />
              <label htmlFor="category_de">DE</label>
              <input type="checkbox" name="transport_category" id="category_tm" value="tm" onClick={handleTransportCategory} />
              <label htmlFor="category_tm">TM</label>
              <input type="checkbox" name="transport_category" id="category_tb" value="tb" onClick={handleTransportCategory} />
              <label htmlFor="category_tb">TB</label>
              <input type="checkbox" name="transport_category" id="category_a1" value="a1" onClick={handleTransportCategory} />
              <label htmlFor="category_a1">A1</label>
              <input type="checkbox" name="transport_category" id="category_b1" value="b1" onClick={handleTransportCategory} />
              <label htmlFor="category_b1">B1</label>
              <input type="checkbox" name="transport_category" id="category_c1" value="c1" onClick={handleTransportCategory} />
              <label htmlFor="category_c1">C1</label>
              <input type="checkbox" name="transport_category" id="category_c1e" value="c1e" onClick={handleTransportCategory} />
              <label htmlFor="category_c1e">C1E</label>
              <input type="checkbox" name="transport_category" id="category_d1" value="d1" onClick={handleTransportCategory} />
              <label htmlFor="category_d1">D1</label>
              <input type="checkbox" name="transport_category" id="category_d1e" value="d1e" onClick={handleTransportCategory} />
              <label htmlFor="category_d1e">D1E</label>
            </fieldset>
          </div>
          <Field label='Дата выдачи' name='transport_issued_date' type='date'
          onChange={(e) => handleValues('documents.driverIssuedDate', e.target.value)} />
        </div>}
        <Field label='Семейное положение' name='marital_status' type='text' pattern='[А-Яа-я\s]+' required
        onChange={(e) => handleValues('maritalStatus', e.target.value)} />
        <Field label='Размер одежды' name='clothing_size' type='number' pattern='\d+' onChange={(e) => handleValues('clothingSize', e.target.value)} />
        <Field label='Размер обуви' name='shoe_size' type='number' pattern='\d+' onChange={(e) => handleValues('shoeSize', e.target.value)} />
        <h3>Ближайшие родственники</h3>
        <Table
          id='family-table' data={values.relatives} 
          headers={['Степень родства', 'Место работы', 'Мобильный телефон']}
          handleEdit={handleEdit('relatives')}
          handleDelete={handleDelete('relatives')}
          Form={FamilyForm}
        />
        <div>
          <button type='button' onClick={() => setShowFamilyForm(true)}>Добавить</button>
          {showFamilyForm && (
            <div>
            <FamilyForm closeForm={() => setShowFamilyForm(false)} handleValues={handleAdd('relatives')}  />
            <div className={style.overlay}></div>
            </div>
          )}
        </div>
      </div>
      <div className={style.formGroup}>
        <h2>Воинский учет</h2>
        <Radio label='Военнообязанный' name='is_conscript' required value={values.millitaryRegistration.isConscript}
        onChange={(e) => handleValues('millitaryRegistration.isConscript', e.target.value === 'yes')} />
        <Radio label='Служба в армии' name='is_military_service' value={values.millitaryRegistration.isMilitaryService}
        onChange={handleArmy} />
        {!showArmyForm && showArmyForm !== null && <Field label='Причина не призыва' name='reason_not_conscription' type='text' pattern='[А-Яа-я0-9\s]+'
        onChange={(e) => handleValues('millitaryRegistration.reasonNotConscription', e.target.value)} />}
        {showArmyForm && showArmyForm !== null && <div className={style.formGroup}>
          <div>
            <label htmlFor="mil_suitablity">Годность к воинской службе</label>
            <select name="mil_suitablity" id="mil_suitablity"
            onChange={(e) => handleValues('millitaryRegistration.suitablity', e.target.value)} >
              <option>А (годен к военной службе)</option>
              <option>Б (годен с незначительными ограничениями)</option>
              <option>В (ограниченно годен)</option>
              <option>Г (временно не годен)</option>
              <option>Д (не годен к военной службе)</option>
            </select>
          </div>
          <div>
            <label htmlFor="mil_group">Группа учета</label> 
            <select name="mil_group" id="mil_group"
            onChange={(e) => handleValues('millitaryRegistration.accountingGroupe', e.target.value)}>
              <option>РА</option>
              <option>ВКС</option>
              <option>ВМФ</option>
              <option>ВДВ</option>
              <option>Специальные войска</option>
            </select>
          </div>
          <div>
            <label htmlFor="military_category">Состав</label>
            <select name="military_category" id="military_category"
            onChange={(e) => handleValues('millitaryRegistration.composition', e.target.value)}>
              <option>Солдаты</option>
              <option>Матросы</option>
              <option>Офицеры</option>
              <option>Командный</option>
              <option>Медицинский</option>
            </select>
          </div>
          <div>
            <label htmlFor="mil_reg_category">Категория запаса</label>
            <select name="mil_reg_category" id="mil_reg_category"
            onChange={(e) => handleValues('millitaryRegistration.accountingCategory', e.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <Field label='ВУС' name='military_speciality' type='text' pattern='[А-Яа-я0-9\s]+'
          onChange={(e) => handleValues('millitaryRegistration.vus', e.target.value)} />
          <Field label='Военный билет\прописное свидетельство №' name='military_id' type='text' pattern='[0-9А-Яа-я]+'
          onChange={(e) => handleValues('millitaryRegistration.militaryNumber', e.target.value)} />
          <Field label='Дата выдачи' name='mil_id_date' type='date' 
          onChange={(e) => handleValues('millitaryRegistration.issuedDate', e.target.value)}/>
          <Field label='Кем выдан' name='mil_id_isued_by' type='text' pattern='[А-Яа-яA-Za-z0-9\s]+'
          onChange={(e) => handleValues('millitaryRegistration.issuedBy', e.target.value)} />
          <div>
            <label htmlFor="military_rank">Воинское звание</label>
            <select name='military_rank' id='military_rank'
            onChange={(e) => handleValues('millitaryRegistration.militaryRank', e.target.value)}>
              <option>Младший лейтенант</option>
              <option>Лейтенант</option>
              <option>Старший лейтенант</option>
              <option>Капитан</option>
              <option>Майор</option>
              <option>Подполковник</option>
              <option>Полковник</option>
              <option>Генерал-лейтенант</option>
              <option>Генерал-майор</option>
              <option>Генерал-полковник</option>
              <option>Генерал армии</option>
            </select>
          </div>
          <Radio label='Участие в боевых действиях' name='military_participation' required value={values.millitaryRegistration.isCombatParticipation}
          onChange={handleMilParticipation} />
          {showMilParticipationForm &&
            <Field label='Участие в боевых действиях (описание региона)' name='participation_description'
            type='text' pattern='[А-Яа-яA-Za-z0-9\s-]+'
            onChange={(e) => handleValues('millitaryRegistration.combatParticipationDescription', e.target.value)} />}
        </div>}
      </div>
      <div className={style.formGroup}>
        <h2>Профессиональное образование</h2>
        <Table
          id='edu-table' data={values.education}
          headers={['Дата поступления', 'Дата окончания', 'Название учреждения', 'Специальность',
            'Квалификация', '№ диплома']}
          handleEdit={handleEdit('education')}
          handleDelete={handleDelete('education')}
          Form={EduForm}
        />
        <div>
          <button type='button' onClick={() => setShowEduForm(true)}>Добавить</button>
          {showEduForm && (
            <div>
            <EduForm closeForm={() => setShowEduForm(false)} handleValues={handleAdd('education')} />
            <div className={style.overlay}></div>
            </div>
          )}
        </div>
      </div>
      <div className={style.formGroup}>
        <h2>Ученая степень</h2>
        <Table
          id='degree-table' data={values.academicDegree}
          headers={['Наименование', 'Дата получения']}
          handleEdit={handleEdit('academicDegree')}
          handleDelete={handleDelete('academicDegree')}
          Form={DegreeForm}
        />
        <div>
          <button type='button' onClick={() => setShowDegreeForm(true)}>Добавить</button>
          {showDegreeForm && (
            <div>
            <DegreeForm closeForm={() => setShowDegreeForm(false)} handleValues={handleAdd('academicDegree')} />
            <div className={style.overlay}></div>
            </div>
          )}
        </div>
      </div>
      <div className={style.formGroup}>
        <h2>Профессиональные компетенции и опыт работы</h2>
        <Radio label='Работа в государственной или муниципальной службе' name='state_service' required
        value={showStateServiceForm} onChange={handleStateService} />
        {showStateServiceForm && <div className={style.formGroup}>
          <Field label='Организация' name='organization' type='text' pattern='[А-Яа-яA-Za-z0-9\s"-]+'
          onChange={(e) => handleValues('gosWork.name', e.target.value)} />
          <Field label='Должность' name='job_position' type='text' pattern='[А-Яа-яA-Za-z0-9\s\-]+'
          onChange={(e) => handleValues('gosWork.position', e.target.value)} />
        </div>}
        <Radio label='Являетесь ли вы совладельцем коммерческих структур, есть ли у вас другая работа?'
        name='another_job' required
        value={showAnotherJobForm}
        onChange={handleAnotherJob} />
        {showAnotherJobForm && <div className={style.formGroup}>
          <Field label='Название компании' name='company_name' type='text' pattern='[А-Яа-яA-Za-z0-9\s"-]+'
          onChange={(e) => handleValues('commercialWork.name', e.target.value)} />
          <Field label='Фактический адрес' name='actual_address' type='text' pattern='[А-Яа-яA-Za-z0-9\s.,\-\/]+'
          onChange={(e) => handleValues('commercialWork.actualAddress', e.target.value)} />
        </div>}

        <h3>Трудовая деятельность (за последние пять лет)</h3>
        <Table
          id='job-table' data={values.workActivity}
          headers={['Дата начала работы', 'Дата увольнения', 'Название учреждения', 'Страна',
            'Адрес', 'Должность', 'Причина увольнения']}
          handleEdit={handleEdit('workActivity')}
          handleDelete={handleDelete('workActivity')}
          Form={JobForm}
        />
        <div>
          <button type='button' onClick={() => setShowPrevJobForm(true)}>Добавить</button>
          {showPrevJobForm && (
            <div>
            <JobForm closeForm={() => setShowPrevJobForm(false)} handleValues={handleAdd('workActivity')} />
            <div className={style.overlay}></div>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="professional_skills">Специальные и профессиональные навыки</label>
          <textarea name="professional_skills" id="professional_skills" 
          onChange={e => handleValues('professionalCompetencies.specialProfSkills', e.target.value)}></textarea>
        </div>
        <div>
          <label htmlFor="prev_job_tasks">Какие задачи решали на предыдущем месте работы?</label>
          <textarea name="prev_job_tasks" id="prev_job_tasks"
          onChange={e => handleValues('professionalCompetencies.taskSolved', e.target.value)}></textarea>
        </div>
        <div>
          <label htmlFor="additional_skills">Дополнительная специальность, навыки</label>
          <textarea name="additional_skills" id="additional_skills"
          onChange={e => handleValues('professionalCompetencies.additionalSpecSkill', e.target.value)}></textarea>
        </div>
        <Radio label='Наличие медицинских предписаний\ограничений на работу (включая инвалидность)' name='medical_prescriptions_check'
        required value={values.professionalCompetencies.isMedicalRetrictions}
        onChange={handleMedPrescriptions} />
        {showMedPrescriptionsForm && 
          <Field label='Мед. предписания, ограничения' name='medical_prescriptions' type='text' pattern='[а-яА-Яa-zA-Z0-9\s\-\,\/\\]+'
          required onChange={e => handleValues('professionalCompetencies.medicalRetrictions', e.target.value)} />
        }
        <Field label='С каким ПО работаете' name='software_used' type='text'
        onChange={e => handleValues('professionalCompetencies.whatSoftware', e.target.value)} pattern='[А-Яа-яA-Za-z-\s,]+' />
      </div>
      <div className={style.formGroup}>
        <h2>Дополнительные сведения</h2>
        <Radio label='Наличие судимости' name='criminal_record' required value={values.additionalInfo.isCriminalRecord}
        onChange={handleCriminalRecord} />
        {showCriminalRecordForm && <div className={style.formGroup}>
          <Field label='Статья' name='criminal_article' type='text' pattern='[А-Яа-я0-9\s,.\-]+'
          onChange={(e) => handleValues('additionalInfo.criminalArticle', e.target.value)} />
          <Field label='Год судимости' name='conviction_year' type='number' min={1900} max={new Date().getFullYear()}
          maxlength='4' allowedSymbols='\d+' onChange={e => handleValues('additionalInfo.year', e.target.value)} />
        </div>}
        <Radio label='Наличие правонарушений за последние 1,5 года' name='recent_offences' required value={values.additionalInfo.isOffenses}
        onChange={handleRecentOffences} />
        {showRecentOffencesForm && 
          <Field label='Описание правонарушений' name='offenses_description' type='text' pattern='[А-Яа-яA-Za-z0-9\s,\-.:;()\/]+'
          onChange={(e) => handleValues('additionalInfo.offenses', e.target.value)} />
        }
        <Field label='Хобби, увлечения' name='hobbies' type='text' pattern='[а-яА-ЯёЁa-zA-Z0-9\-\/:\(\)\"\s,]+'
        onChange={(e) => handleValues('additionalInfo.hobbies', e.target.value)} />
        <Field label='Дополнительно о себе' name='about_myself' type='text' pattern='[а-яА-ЯёЁa-zA-Z0-9\-\/:\(\)\"\s,]+'
        onChange={(e) => handleValues('additionalInfo.aboutYourself', e.target.value)} />
      </div>
      <div className={style.formGroup}>
        <h2>Рекомендатели и источник информации о вакансии</h2>
        <Table
          id='recommender-table' data={values.recommendations}
          headers={['Имя Отчество', 'Статус', 'Организация', 'Контактный телефон организации']}
          handleEdit={handleEdit('recommendations')}
          handleDelete={handleDelete('recommendations')}
          Form={RecommenderForm}
        />
        <div>
          <button type='button' onClick={() => setShowRecommenderForm(true)}>Добавить</button>
          {showRecommenderForm && (
            <div>
            <RecommenderForm closeForm={() => setShowRecommenderForm(false)} handleValues={handleAdd('recommendations')} />
            <div className={style.overlay}></div>
            </div>
          )}
        </div>
        <Field label='Откуда вы узнали о вакансии?' name='how_you_know' type='text' pattern='[А-Яа-яA-Za-z0-9\s-,.:/?=]+' 
          onChange={(e) => handleValues('howYouKnow', e.target.value)} />
      </div>
      <div>
        <label htmlFor="data_processing_check">Вы согласны на обработку персональных данных?</label>
        <input type="checkbox" name="data_processing_check" id="data_processing_check"
        onClick={handleDataProcessingChecked} />
      </div>
      <input type="submit" name="submit" id="sumbit" disabled={!dataProcessingChecked}
      onClick={sendData} />
    </form>
    </div>
  );
}
