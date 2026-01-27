type SectionCardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function SectionCard({
  children,
  className,
  style,
}: SectionCardProps) {
  return (
    <section
      className={`bg-transparent p-6 ${
        className ?? ""
      }`}
      style={style}
    >
      {children}
    </section>
  );
}
