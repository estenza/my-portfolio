// ProjectCard.js
import Image from 'next/image'
import Link from 'next/link'

function CaseButton({ label = 'Подробнее' }) {
  return (
    <span className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-xl bg-neutral-950 py-0 pl-6 pr-4 text-base font-medium leading-none text-white transition-colors hover:bg-neutral-800">
      <span>{label}</span>
      <span aria-hidden="true" className="text-xl leading-none">→</span>
    </span>
  )
}

export default function ProjectCard({
  title,
  description,
  image,
  disabled = false,
  href,
  period,
  productType,
  domain,
  status,
  isUpdating = false,
  details = [],
  imageClassName = '',
  actionLabel = 'Подробнее',
  actionHref,
  actionExternal = false,
  disableCardHover = false,
}) {
  const metaItems = [period, productType, domain].filter(Boolean)
  const hasDetails = details.length > 0
  const isLinkedCard = !disabled && href
  const hasAction = !disabled && (href || actionHref)
  const enableHover = !disabled && !disableCardHover && (href || actionHref)
  const actionTargetHref = actionHref || href
  const actionTargetProps =
    actionExternal || actionHref
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {}
  const renderAction = () =>
    isLinkedCard && !actionHref ? (
      <CaseButton label={actionLabel} />
    ) : (
      <a href={actionTargetHref} {...actionTargetProps}>
        <CaseButton label={actionLabel} />
      </a>
    )

  const cardClasses = [
    'flex',
    'flex-col',
    'h-full',
    'relative',
    'gap-0',
    'rounded-[24px]',
    'bg-white',
    'border',
    'border-black/12',
    'transition-shadow',
    'duration-300',
    enableHover && 'group-hover/card:shadow-[0_16px_48px_rgba(0,0,0,0.12)]',
    'overflow-hidden',
    'lg:min-h-[420px]',
    'lg:flex-row',
  ]
    .filter(Boolean)
    .join(' ')

  const CardContent = (
    <div className={cardClasses}>
      {/* Текстовая часть */}
      <div className="relative z-20 flex w-full flex-grow flex-col p-8 lg:w-1/2 lg:max-w-none">
        <div className="mb-3 flex items-start justify-between gap-4 px-0.5">
          <h1 className="min-w-0 text-[40px] font-semibold leading-[48px] text-neutral-950">{title}</h1>
        </div>
        {(metaItems.length > 0 || status || isUpdating) && (
          <div className="mb-6 flex flex-wrap gap-2 text-sm leading-normal text-label-primary sm:text-base">
            {metaItems.map((item) => (
              <span
                key={item}
                className="inline-flex rounded-full bg-[#F5F5F5] px-3 py-1.5 text-label-primary transition-colors duration-300"
              >
                {item}
              </span>
            ))}
            {status && (
              <span className="inline-flex rounded-full bg-emerald-100/70 px-3 py-1.5 text-emerald-950">
                {status}
              </span>
            )}
            {isUpdating && (
              <span className="inline-flex items-center gap-2 rounded-[24px] bg-[rgba(255,183,0,0.24)] px-3 py-1.5 text-base font-normal leading-6 text-label-primary">
                <Image
                  src="/icons/rotate-cw-case-updating.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0"
                />
                <span>Кейс обновляется</span>
              </span>
            )}
          </div>
        )}

        {hasDetails ? (
          <div className="flex flex-col gap-2.5 px-0.5 text-base leading-relaxed text-label-primary sm:text-base">
            {details.map((item) => (
              <p key={item.label}>
                <span className="font-semibold text-neutral-950">{item.label}: </span>
                {item.value}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-base text-label-tertiary font-regular leading-normal sm:text-base">{description}</p>
        )}

        {hasAction && actionTargetHref && (
          <div className="mt-auto hidden pt-8 lg:block">
            {renderAction()}
          </div>
        )}
      </div>

      {hasAction && actionTargetHref && (
        <div className="relative z-20 flex justify-start px-8 pb-8 lg:hidden">
          {renderAction()}
        </div>
      )}

      {/* Изображение */}
      <div className="group/image relative z-20 flex w-full flex-col overflow-hidden bg-[#F9F9F9] lg:w-1/2 lg:max-w-none lg:self-stretch">
        {/* контейнер для масштабирования: масштабируем внутренний блок, а не сам контейнер */}
        <div className="h-full w-full flex-1">
          <div className="relative aspect-[680/432] w-full max-h-[432px] lg:h-full lg:max-h-none lg:aspect-auto">
            <Image
              src={image}
              alt={title}
              fill
              quality={95}
              className={`absolute inset-0 h-full w-full object-contain ${imageClassName}`}
              sizes="(min-width: 1024px) 400px, (min-width: 768px) calc((100vw - 6rem) / 2), calc(100vw - 2.5rem)"
            />
          </div>
        </div>

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
  return isLinkedCard ? (
    <Link href={href} className="group/card h-full rounded-2xl">
      {CardContent}
    </Link>
  ) : (
    CardContent
  )
}
