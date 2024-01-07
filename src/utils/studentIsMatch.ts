import { ParamMap } from '@angular/router';

export default function studentIsMatch(
  student: Student,
  query: string,
  params: ParamMap
) {
  const studentKeys = ['Name', 'Email', 'Mobile', 'NationalID', 'Age'];
  const filterKeys = params.keys.filter(k => k !== 'q' && params.get(k));

  const isSearchFound = studentKeys.some(key => {
    if (key === 'Age') return student['Age'] === +query;
    return student[key as keyof Student]
      ?.toString()
      .toLowerCase()
      .includes(query);
  });

  const isFilterFound = filterKeys.every(key => {
    const filterKeyword = params.get(key) as string;
    if (key === 'Age') return student['Age'] === +filterKeyword.toLowerCase();
    return student[key as keyof Student]
      ?.toString()
      .toLowerCase()
      .includes(filterKeyword.toLowerCase());
  });

  return filterKeys.length ? isSearchFound && isFilterFound : isSearchFound;
}
