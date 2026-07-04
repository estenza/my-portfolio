import ErrorPage from '../components/ErrorPage';

export default function ServerErrorPage() {
  return (
    <ErrorPage
      code="500"
      title="Что-то пошло не так"
      description="Сайт столкнулся с внутренней ошибкой. Обычно помогает обновить страницу или вернуться на главную."
    />
  );
}
