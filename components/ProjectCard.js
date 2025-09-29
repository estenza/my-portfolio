// ProjectCard.js
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectCard({ title, description, image, disabled = false, href }) {
  const cardClasses = [
    'group', // нужен для внутренних group-hover эффектов (overlay, scale)
    'flex',
    'flex-col',
    'justify-between',
    'h-full',
    'bg-neutral-900',
    'px-5',
    'py-5',
    'rounded-2xl',
    'border',
    'border-transparent',
    'transition-colors',
    'duration-300',
    'ease-in-out',
    !disabled && 'hover:bg-neutral-800' // <-- было group-hover, исправлено на hover
  ]
    .filter(Boolean)
    .join(' ')

  const CardContent = (
    <div className={cardClasses}>
      {/* Верхняя часть */}
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-neutral-400 font-regular tracking-wide">{description}</p>
      </div>

      {/* Нижняя часть: изображение */}
      <div className="relative mt-6 w-full overflow-hidden rounded-xl bg-neutral-900">
        {/* контейнер для масштабирования: масштабируем внутренний блок, а не сам контейнер */}
        <div className={`transition-transform duration-300 transform-gpu ${!disabled ? 'group-hover:scale-103' : ''}`}>
          <div className="relative pt-[64%]">
            <Image
              src={image}
              alt={title}
              fill
              className="absolute top-0 left-0 w-full h-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Белая тонировка при ховере — только для не-disabled */}
        {!disabled && (
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
        )}

        {/* Лейбл NDA */}
        {disabled && (
          <span className="absolute top-2 right-2 bg-neutral-900 text-white text-s font-medium px-2 py-1 rounded-xl">
            NDA
          </span>
        )}
      </div>
    </div>
  )

  // Если карточка кликабельна — оборачиваем в <Link>
  // Если хочешь, чтобы hover срабатывал на всей зоне ссылки (включая padding у Link),
  // можно добавить сюда `group` (но root уже group — обычно достаточно).
  return !disabled && href ? (
    <Link href={href} className="h-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-lime-400">
      {CardContent}
    </Link>
  ) : (
    CardContent
  )
}