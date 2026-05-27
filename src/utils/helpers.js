import { CATEGORIES, DAYS_FR, DAYS_AR, DAYS_FULL_FR, DAYS_FULL_AR } from "../constants";

export function getTodayLabel(isAr) {
  const now = new Date();
  const moisFR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const moisAR = ["يناير","فبراير","مارس","أبريل","ماي","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  if (isAr) return `${DAYS_FULL_AR[now.getDay()]} ${now.getDate()} ${moisAR[now.getMonth()]} ${now.getFullYear()}`;
  return `${DAYS_FULL_FR[now.getDay()]} ${now.getDate()} ${moisFR[now.getMonth()]} ${now.getFullYear()}`;
}

export function getDates(isAr) {
  return Array.from({ length:7 }, (_,i) => {
    const d = new Date(); d.setDate(d.getDate()+i);
    return { label:(isAr?DAYS_AR:DAYS_FR)[d.getDay()], num:d.getDate(), full:d.toLocaleDateString("fr-DZ"), dayOfWeek:d.getDay() };
  });
}

export function getCat(id) { return CATEGORIES.find(c => c.id === id) || {}; }
