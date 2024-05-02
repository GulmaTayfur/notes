import { useEffect, useState } from "react";

/*
!Custom Hook
*react hooklarına benzer şekilde görev yapan projenin ihtiyaçlarına göre kendimizin oluşturduğu, görevini bizim belirlediğimiz hooklardır.
*Genelede veriyi ve veriyi güncelleyerek fonksiyonu dizi içinde dönerler.
*/

export function useLocaleStorage<T>(key: string, initialValue: T) {
  //*.1.adım :state'i tanımla
  const [value, setValue] = useState<T>(() => {
    //*2.adım :localeStorage'dan verileri al.
    const jsonValue = localStorage.getItem(key);
    //*3.adım: localeStorage'da eleman yoksa initialValue tanımla
    if (jsonValue === null) {
      return initialValue;
    } else {
      //*4.adım: localeStorage'da eleman varsa localdeki veriyi state aktar
      return JSON.parse(jsonValue);
    }
  });
  //*%.adım: state her değiştiğinde localeStorage'ı güncelle
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //*6.adım: Hookun kullanılması için state'i return et
  return [value, setValue] as [T, typeof setValue];
}
