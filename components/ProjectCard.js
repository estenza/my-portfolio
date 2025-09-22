import Image from 'next/image'
import Link from 'next/link'

export default function ProjectCard({ title, description, image, disabled = false, href }) {
  const cardClasses = [
    'group',
    'flex',
    'flex-col',
    'justify-between',
    'h-full',
    'bg-neutral-900',
    'px-5',
    'py-5',
    'rounded-2xl',
    'transition',
    'duration-300',
    'ease-in-out',
    !disabled && 'hover:bg-neutral-800', // только если НЕ disabled
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
      <div className="relative mt-6 overflow-hidden w-full rounded-xl">
        <div className="overflow-hidden rounded-xl">
          <div
            className={`w-full h-full transition-transform duration-300 ease-in-out ${
              !disabled ? 'group-hover:scale-103' : ''
            }`}
          >
            <img src={image} alt={title} className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* Белая тонировка при ховере — только если НЕ disabled */}
        {!disabled && (
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        )}

        {/* Лейбл NDA */}
        {disabled && (
          <span className="absolute top-2 right-2 bg-neutral-900 text-white text-s font-medium px-2 py-2 rounded-xl">
            NDA
          </span>
        )}
      </div>
    </div>
  )

  return !disabled && href ? (
    <Link href={href} className="h-full">
      {CardContent}
    </Link>
  ) : (
    CardContent
  )
}