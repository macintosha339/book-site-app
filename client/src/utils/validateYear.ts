const currentYear = new Date().getFullYear();

/**
 * Функция проверяет, что значение является числом и не больше текущего года
 *
 * @param _ (не используется) - здесь принято использовать символ для обозначения аргумента, который не используется в теле функции
 * @param value - значение года, которое нужно проверить
 *
 * @returns Promise, который может быть разрешен (Promise.resolve()) в случае успешной валидации или отклонен (Promise.reject()) с ошибкой в случае невалидного значения.
 */
export default function validateYear({ _, value }: any) {
  if (value && isNaN(value)) {
    return Promise.reject(new Error("Год должен быть числом!"));
  }
  if (value && +value > currentYear) {
    return Promise.reject(
      new Error("Введенный год должен быть не больше чем текущий!")
    );
  }
  return Promise.resolve();
}
