import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  width?: 'browse' | 'content';
  className?: string;
}

export function PageContainer({
  children,
  width = 'browse',
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'page-container',
        width === 'content' ? 'page-container-content' : 'page-container-browse',
        className
      )}
    >
      {children}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  align?: 'left' | 'center';
  icon?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  align = 'left',
  icon,
  className,
}: PageHeaderProps) {
  const center = align === 'center';

  return (
    <header
      className={cn(
        'page-header',
        center && 'mx-auto max-w-3xl text-center',
        className
      )}
    >
      {icon && <div className={cn('mb-6', center && 'flex justify-center')}>{icon}</div>}
      <h1 className="page-title">{title}</h1>
      {description && <p className="page-description">{description}</p>}
    </header>
  );
}

interface PageSectionProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'compact';
  className?: string;
}

export function PageSection({
  children,
  variant = 'primary',
  className,
}: PageSectionProps) {
  return (
    <section
      className={cn(
        variant === 'primary' && 'section-primary',
        variant === 'secondary' && 'section-secondary',
        variant === 'compact' && 'section-compact',
        className
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  id?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  id,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <h2 id={id} className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}