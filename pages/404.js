import ErrorPage from '../components/ErrorPage';

export default function NotFoundPage() {
  return (
    <ErrorPage
      code="404"
      title="Страница не найдена"
      description="Похоже, такой страницы нет или ссылка устарела. Можно вернуться на главную и выбрать нужный раздел оттуда."
    />
  );
}
